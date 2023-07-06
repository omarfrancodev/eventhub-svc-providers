import { Request, Response } from 'express';
import { DeleteProviderUseCase } from '../../application/DeleteProviderUseCase';
import { FindByIdProviderUseCase } from '../../application/FindByIdProviderUseCase';
import * as fs from 'fs';
import saveLogFile from '../LogsErrorControl';

export class DeleteProviderController {
    constructor(
        private readonly deleteProviderUseCase: DeleteProviderUseCase,
        private readonly findByIdProviderUseCase: FindByIdProviderUseCase
    ) { }

    async run(req: Request, res: Response): Promise<Response> {
        const providerId = isNaN(Number(req.params.id)) ? null : Number(req.params.id);
        if (!providerId) {
            return res.status(400).json({ error: 'Invalid provider ID' });
        }
        try {
            const provider = await this.findByIdProviderUseCase.run(providerId);

            if (!provider) {
                return res.status(404).json({ error: 'Provider not found' });
            }
            const imagePaths = provider.urlImages;

            if (imagePaths.length > 0) {
                await Promise.all(imagePaths.map(path => fs.promises.unlink(`src/${path}`)));
            }
            await this.deleteProviderUseCase.run(provider);

            return res.status(200).json({ message: 'Provider deleted successfully' });
        } catch (error: any) {
            console.error(error);
            saveLogFile(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
