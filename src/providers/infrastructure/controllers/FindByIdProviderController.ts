import { Request, Response } from 'express';
import { FindByIdProviderUseCase } from '../../application/FindByIdProviderUseCase';
import saveLogFile from '../LogsErrorControl';

export class FindByIdProviderController {
  constructor(
    private readonly findByIProviderdUseCase: FindByIdProviderUseCase
  ) { }

  async run(req: Request, res: Response): Promise<Response> {
    const providerId = isNaN(Number(req.params.id)) ? null : Number(req.params.id);
    if (!providerId) {
      return res.status(400).json({ error: 'Invalid provider ID' });
    }
    try {
      const provider = await this.findByIProviderdUseCase.run(providerId);
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
