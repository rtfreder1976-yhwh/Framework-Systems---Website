const { kv } = require('@vercel/kv');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Allow cross-origin for local testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { proposalId, amount, currency = 'usd' } = req.body || {};
    
    let verifiedAmount = amount || 50000;

    // Secure Pricing: If checkout is tied to a proposal, pull price from DB so client can't tamper it
    if (proposalId) {
      const proposalData = await kv.get(`proposal:${proposalId}`);
      if (proposalData && proposalData.price) {
        verifiedAmount = Math.round(proposalData.price * 100);
      }
    }

    // Create a PaymentIntent with the specific amount and currency.
    // 'automatic_payment_methods' enables Klarna, Afterpay, Affirm, etc., based on Dashboard settings and eligibility.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: verifiedAmount,
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    res.status(500).json({ error: error.message });
  }
};
