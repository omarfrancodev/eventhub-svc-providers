import { Provider } from '../domain/Provider';
import { IProviderRepository } from '../domain/IProviderRepository';

export class FindByIdProviderUseCase {
  constructor(private readonly providerRepository: IProviderRepository) {}

  async run(providerId: number): Promise<Provider | null> {
    const provider = await this.providerRepository.findById(providerId);
    return provider;
  }
}