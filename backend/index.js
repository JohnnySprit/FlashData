require('dotenv').config();
console.log('FACEIT_API_KEY:', process.env.FACEIT_API_KEY ? 'Loaded' : 'Missing');

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Route to get Faceit player info by nickname
app.get('/api/player/:nickname', async (req, res) => {
    const { nickname } = req.params;

    if (!nickname) {
        return res.status(400).json({ error: 'Nickname is required' });
    }

    try {
        const response = await axios.get(
            `https://open.faceit.com/data/v4/players?nickname=${encodeURIComponent(nickname)}`,
            {
                headers: { Authorization: `Bearer ${process.env.FACEIT_API_KEY}` }
            }
        );

        res.json(response.data);
    } catch (error) {
        if (error.response) {
            // Faceit API responded with an error status
            const status = error.response.status;
            const message = error.response.data?.message || 'Faceit API error';

            if (status === 404) {
                return res.status(404).json({ error: 'Player not found' });
            }

            console.error('Faceit API error:', error.response.data);
            return res.status(status).json({ error: message });
        }
    }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
