const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express(); // <-- This is required
app.use(cors());
app.use(express.json());

// Your route
app.get('/api/player/:nickname', async (req, res) => {
    try {
        const response = await axios.get(
            `https://open.faceit.com/data/v4/players?nickname=${req.params.nickname}`,
            { headers: { Authorization: `Bearer YOUR_KEY` } }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch player' });
    }
});

// Start server
app.listen(3001, () => console.log('Server running on http://localhost:3001'));
