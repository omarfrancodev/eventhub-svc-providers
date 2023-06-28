import { Request, Response } from 'express';
import { FindByCategoryProvidersUseCase } from '../../application/FindByCategoryProvidersUseCase';
import { Provider } from '../../domain/Provider';

export class FindByCategoryProviderController {
  constructor(
    private readonly findByCategoryProvidersUseCase: FindByCategoryProvidersUseCase
  ) { }

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const categories: string[] = (req.params.categories?.toString() ?? "").split(",");

      const promises = categories.map(async (category) => {
        const providersByCategory = await this.findByCategoryProvidersUseCase.run(category);
        return providersByCategory;
      });

      const providers = await Promise.all(promises);
      const flattenedProviders = providers.flat();

      const uniqueProviders: Provider[] = [];
      const providerIds: Set<number> = new Set();

      flattenedProviders.forEach((provider) => {
        if (!providerIds.has(provider.providerId)) {
          uniqueProviders.push(provider);
          providerIds.add(provider.providerId);
        }
      });
            
      return res.status(200).json(uniqueProviders);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
