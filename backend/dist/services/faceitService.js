"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceitService = void 0;
const axios_1 = __importDefault(require("axios"));
class FaceitService {
    apiKey;
    baseUrl = 'https://open.faceit.com/data/v4';
    constructor(apiKey) {
        this.apiKey = (apiKey || '').trim();
    }
    async getPlayerByNickname(nickname) {
        try {
            const url = `${this.baseUrl}/players?nickname=${encodeURIComponent(nickname)}`;
            const response = await axios_1.default.get(url, {
                headers: { Authorization: `Bearer ${this.apiKey}` }
            });
            return response.data;
        }
        catch (error) {
            const axiosError = error;
            // Log full error for debugging
            console.error('FACEIT API Error:', {
                status: axiosError.response?.status,
                statusText: axiosError.response?.statusText,
                data: axiosError.response?.data
            });
            if (axiosError.response?.status === 404) {
                throw new Error('Player not found');
            }
            if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
                const errorData = axiosError.response?.data;
                const message = errorData?.errors?.[0]?.message || errorData?.message || 'Invalid or expired API key. Please check your FACEIT API key.';
                throw new Error(message);
            }
            if (axiosError.response?.status === 429) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }
            // Try to extract error message from FACEIT response
            const errorData = axiosError.response?.data;
            const errorMessage = errorData?.errors?.[0]?.message ||
                errorData?.message ||
                axiosError.message ||
                'Failed to fetch player data';
            throw new Error(errorMessage);
        }
    }
}
exports.FaceitService = FaceitService;
