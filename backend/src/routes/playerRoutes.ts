import { Router, Request, Response } from 'express';
import { FaceitService } from '../services/faceitService';

const router = Router();

function getFaceitService(): FaceitService {
    const apiKey = (process.env.FACEIT_API_KEY || '').trim();
    if (!apiKey) {
        console.warn('WARNING: FACEIT_API_KEY is not set in environment variables');
    }
    return new FaceitService(apiKey);
}

router.get('/:nickname', async (req: Request, res: Response) => {
    try {
        const faceitService = getFaceitService();
        const data = await faceitService.getPlayerByNickname(req.params.nickname);
        res.json(data);
    } catch (error) {
        console.error('Route error:', error);
        const err = error as Error;
        let statusCode = 500;
        
        if (err.message?.includes('not found')) {
            statusCode = 404;
        } else if (err.message?.includes('API key') || err.message?.includes('not authorized') || err.message?.includes('authorized')) {
            statusCode = 403;
        } else if (err.message?.includes('Rate limit')) {
            statusCode = 429;
        }
        
        const errorMessage = err.message || 'Internal server error';
        console.error('Error fetching player:', errorMessage);
        res.status(statusCode).json({ error: errorMessage });
    }
});

export default router;