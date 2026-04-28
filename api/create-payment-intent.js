const { createClient } = require('redis');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const client = createClient({
    url: process.env.REDIS_URL
  });

  try {
    await client.connect();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { proposalId, amount, currency = 'usd' } = req.body || {};
    
    let verifiedAmount = amount || 50000;

    if (proposalId) {
      const data = await client.get(`proposal:${proposalId}`);
      const proposalData = data ? JSON.parse(data) : null;
      if (proposalData && proposalData.price) {
        verifiedAmount = Math.round(proposalData.price * 100);
      }
    }

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
  } finally {
    try {
        await client.disconnect();
    } catch (e) {}
  }
};
