import { Request, Response } from 'express';
import { FindByCategoryProvidersUseCase } from '../../application/FindByCategoryProvidersUseCase';

export class FindByCategoryProviderController {
  constructor(
    private readonly findByCategoryProvidersUseCase: FindByCategoryProvidersUseCase
  ) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const category = req.params.category as string;
      console.log(req.query)
      console.log(req.params)

      const providers = await this.findByCategoryProvidersUseCase.run(category);

      return res.status(200).json(providers);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
