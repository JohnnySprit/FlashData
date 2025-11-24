import axios, { AxiosError } from 'axios';

export class FaceitService {
    private apiKey: string;
    private baseUrl: string = 'https://open.faceit.com/data/v4';

    constructor(apiKey: string) {
        this.apiKey = (apiKey || '').trim();
    }

    async getPlayerByNickname(nickname: string) {
        try {
            const response = await axios.get(
                `${this.baseUrl}/players?nickname=${encodeURIComponent(nickname)}`,
                { headers: { Authorization: `Bearer ${this.apiKey}` } }
            );
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            
            if (axiosError.response?.status === 404) {
                throw new Error('Player not found');
            }
            if (axiosError.response?.status === 401 || axiosError.response?.status === 403) {
                const errorData = axiosError.response?.data as any;
                const message = errorData?.errors?.[0]?.message || errorData?.message || 'Invalid API key';
                throw new Error(message);
            }
            if (axiosError.response?.status === 429) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }
            
            const errorData = axiosError.response?.data as any;
            const errorMessage = errorData?.errors?.[0]?.message || errorData?.message || axiosError.message || 'Failed to fetch player data';
            throw new Error(errorMessage);
        }
    }
}