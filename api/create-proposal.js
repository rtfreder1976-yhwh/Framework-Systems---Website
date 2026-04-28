const { createClient } = require('redis');
const crypto = require('crypto');

module.exports = async (req, res) => {
  const client = createClient({
    url: process.env.REDIS_URL
  });
  
  try {
    await client.connect();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, company, package, price, desc } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: 'Missing required fields (name, price)' });
    }

    const proposalId = crypto.randomBytes(4).toString('hex');
    
    const proposalData = {
      id: proposalId,
      name,
      company: company || '',
      package: package || 'Revenue Recovery Service',
      price: parseFloat(price),
      desc: desc || '',
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    await client.set(`proposal:${proposalId}`, JSON.stringify(proposalData), {
      EX: 2592000
    });

    const secureUrl = `https://www.frameworksystems.co/proposal?id=${proposalId}`;
    
    return res.status(200).json({ 
      success: true, 
      proposalId: proposalId,
      secureUrl: secureUrl,
      proposalData
    });

  } catch (error) {
    console.error('Error creating proposal in Redis:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  } finally {
    try {
        await client.disconnect();
    } catch (e) {}
  }
};
