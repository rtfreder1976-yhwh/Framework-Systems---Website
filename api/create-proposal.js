const { kv } = require('@vercel/kv');
const crypto = require('crypto');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Expect body payload from GoHighLevel Webhook
    // Shape: { name, company, package, price, desc }
    const { name, company, package, price, desc } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ error: 'Missing required fields (name, price)' });
    }

    // Generate a secure, unique 8-character ID
    const proposalId = crypto.randomBytes(4).toString('hex');
    
    // Create the proposal object
    const proposalData = {
      id: proposalId,
      name,
      company: company || '',
      package: package || 'Revenue Recovery Service',
      price: parseFloat(price),
      desc: desc || '',
      createdAt: new Date().toISOString(),
      status: 'pending' // pending -> paid
    };

    // Store in Vercel KV - Key will expire after 30 days automatically (2592000 seconds)
    await kv.set(`proposal:${proposalId}`, proposalData, { ex: 2592000 });

    // Return the generated URL link
    const secureUrl = `https://www.frameworksystems.co/proposal?id=${proposalId}`;
    
    // GHL can map this response back to a custom field to email the client
    return res.status(200).json({ 
      success: true, 
      proposalId: proposalId,
      secureUrl: secureUrl,
      proposalData
    });

  } catch (error) {
    console.error('Error creating proposal in KV:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
