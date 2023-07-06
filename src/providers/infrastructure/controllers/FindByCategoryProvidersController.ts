import { Request, Response } from 'express';
import { FindByCategoryProvidersUseCase } from '../../application/FindByCategoryProvidersUseCase';
import { Provider } from '../../domain/Provider';
import saveLogFile from '../LogsErrorControl';

export class FindByCategoryProviderController {
  constructor(
    private readonly findByCategoryProvidersUseCase: FindByCategoryProvidersUseCase
  ) { }

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const categories: string[] = (req.params.categories?.toString() ?? "").split(",");
      const sanitizedCategories = categories.map((category) => category.trim());
      
      const uniqueProviders: Provider[] = [];
      const providerIds: Set<number> = new Set();

      for (const category of sanitizedCategories) {
        const providersByCategory = await this.findByCategoryProvidersUseCase.run(category);
        for (const provider of providersByCategory) {
          if (!providerIds.has(provider.providerId)) {
            uniqueProviders.push(provider);
            providerIds.add(provider.providerId);
          }
        }
      }

      return res.status(200).json(uniqueProviders);
    } catch (error) {
      console.error(error);
      saveLogFile(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
