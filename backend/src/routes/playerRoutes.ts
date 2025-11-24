import { Router, Request, Response } from 'express';
import { FaceitService } from '../services/faceitService';

const router = Router();
const faceitService = new FaceitService(process.env.FACEIT_API_KEY || '');

router.get('/:nickname', async (req: Request, res: Response) => {
    try {
        const data = await faceitService.getPlayerByNickname(req.params.nickname);
        res.json(data);
    } catch (error) {
        const err = error as Error;
        res.status(404).json({ error: err.message });
    }
});

export default router;