import { Request, Response } from 'express';
import { FindByIdProviderUseCase } from '../../application/FindByIdProviderUseCase';
import saveLogFile from '../LogsErrorControl';
import { validationResult } from 'express-validator';

export class FindByIdsController {
    constructor(private readonly findByIdProviderUseCase: FindByIdProviderUseCase) { }

    async run(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Invalid input data' });
        }
        try {
            const ids = req.body.ids;
            const promises = ids.map((id: number) => this.findByIdProviderUseCase.run(id));
            const providers = await Promise.all(promises);

            return res.status(200).json(providers);
        } catch (error) {
            console.error(error);
            saveLogFile(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}