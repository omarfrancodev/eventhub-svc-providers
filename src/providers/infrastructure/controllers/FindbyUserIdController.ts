import { Request, Response } from 'express';
import { FindByUserIdUseCase } from '../../application/FindByUserIdUseCase';
import saveLogFile from '../LogsErrorControl';

export class FindByUserIdController {
    constructor(private readonly findByUserIdUsCase: FindByUserIdUseCase) { }

    async run(req: Request, res: Response): Promise<Response> {
        const userId = isNaN(Number(req.params.id)) ? null : Number(req.params.id);
        if (!userId) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        try {
            const provider = await this.findByUserIdUsCase.run(userId);
            if (!provider) {
                return res.status(404).json({ error: 'Provider not found' });
            }
            return res.status(200).json(provider);
        } catch (error) {
            console.error(error);
            saveLogFile(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}