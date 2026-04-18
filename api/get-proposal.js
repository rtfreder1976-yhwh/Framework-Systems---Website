const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Proposal ID is required' });
    }

    const proposalData = await kv.get(`proposal:${id}`);

    if (!proposalData) {
      return res.status(404).json({ error: 'Proposal not found or expired' });
    }

    return res.status(200).json(proposalData);

  } catch (error) {
    console.error('Error fetching proposal from KV:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
