import { Router, Request, Response } from 'express';
import axios, { AxiosError } from 'axios';

const router = Router();

router.get('/:nickname', async (req: Request, res: Response) => {
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
        const axiosError = error as AxiosError<{ message?: string }>;

        if (axiosError.response) {
            const status = axiosError.response.status;
            const message = axiosError.response.data?.message || 'Faceit API error';

            if (status === 404) {
                return res.status(404).json({ error: 'Player not found' });
            }

            console.error('Faceit API error:', axiosError.response.data);
            return res.status(status).json({ error: message });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;