import { Request, Response } from 'express';
import { DeleteProviderUseCase } from '../../application/DeleteProviderUseCase';
import { FindByIdProviderUseCase } from '../../application/FindByIdProviderUseCase';

export class DeleteProviderController {
  constructor(
    private readonly deleteProviderUseCase: DeleteProviderUseCase,
    private readonly findByIdProviderUseCase: FindByIdProviderUseCase
  ) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const providerId = Number(req.params.id);

      const provider = await this.findByIdProviderUseCase.run(providerId);

      if (!provider) {
        return res.status(404).json({error: 'Provider not found'});
      }
      await this.deleteProviderUseCase.run(provider);

      return res.status(200).json({ message: 'Provider deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
