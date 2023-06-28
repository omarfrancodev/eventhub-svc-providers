import { Request, Response } from 'express';
import { DeleteProviderUseCase } from '../../application/DeleteProviderUseCase';

export class DeleteProviderController {
  constructor(
    private readonly deleteProviderUseCase: DeleteProviderUseCase
  ) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const providerId = Number(req.params.id);

      await this.deleteProviderUseCase.run(providerId);

      return res.status(200).json({ message: 'Provider deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
