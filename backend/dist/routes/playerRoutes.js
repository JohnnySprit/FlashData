"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faceitService_1 = require("../services/faceitService");
const router = (0, express_1.Router)();
const faceitService = new faceitService_1.FaceitService((process.env.FACEIT_API_KEY || '').trim());
router.get('/:nickname', async (req, res) => {
    try {
        const data = await faceitService.getPlayerByNickname(req.params.nickname);
        res.json(data);
    }
    catch (error) {
        console.error('Route error:', error);
        const err = error;
        let statusCode = 500;
        if (err.message?.includes('not found')) {
            statusCode = 404;
        }
        else if (err.message?.includes('API key') || err.message?.includes('not authorized') || err.message?.includes('authorized')) {
            statusCode = 403;
        }
        else if (err.message?.includes('Rate limit')) {
            statusCode = 429;
        }
        const errorMessage = err.message || 'Internal server error';
        console.error('Error fetching player:', errorMessage);
        res.status(statusCode).json({ error: errorMessage });
    }
});
exports.default = router;
