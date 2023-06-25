import { Provider } from '../domain/Provider';
import { IProviderRepository } from '../domain/IProviderRepository';

export class FindByCategoryProvidersUseCase {
  constructor(private readonly providerRepository: IProviderRepository) { }

  async run(category: string): Promise<Provider[]> {
    return this.providerRepository.findByCategory(category);
  }
}