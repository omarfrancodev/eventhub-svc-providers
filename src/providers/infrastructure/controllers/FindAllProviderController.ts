import { Request, Response } from 'express';
import { FindAllProvidersUseCase } from '../../application/FindAllProviderUseCase';

export class FindAllProviderController {
  constructor(
    private readonly findAllProvidersUseCase: FindAllProvidersUseCase
  ) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const providers = await this.findAllProvidersUseCase.run();
      return res.status(200).json(providers);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
