import { Provider } from '../domain/Provider';
import { IProviderRepository } from '../domain/IProviderRepository';

export class FindAllProvidersUseCase {
  constructor(private readonly providerRepository: IProviderRepository) {}

  async run(): Promise<Provider[]> {
    const providers = await this.providerRepository.findAll();
    return providers;
  }
}
