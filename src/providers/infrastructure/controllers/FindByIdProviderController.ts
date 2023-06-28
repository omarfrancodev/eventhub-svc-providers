import { Request, Response } from 'express';
import { FindByIdProviderUseCase } from '../../application/FindByIdProviderUseCase';

export class FindByIdProviderController {
  constructor(
    private readonly findByIProviderdUseCase: FindByIdProviderUseCase
  ) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const providerId = Number(req.params.id);

      const provider = await this.findByIProviderdUseCase.run(providerId);

      if (!provider) {
        return res.status(404).json({ error: 'Provider not found' });
      }

      return res.status(200).json(provider);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
