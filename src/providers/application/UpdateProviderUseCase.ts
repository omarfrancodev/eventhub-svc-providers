import { Provider } from '../domain/Provider';
import { IProviderRepository } from '../domain/IProviderRepository';

export class UpdateProviderUseCase {
  constructor(private readonly providerRepository: IProviderRepository) {}

  async run(providerId: number, updatedProviderData: Partial<Provider>): Promise<Provider | null> {
    const provider = await this.providerRepository.findById(providerId);

    if (!provider) {
      throw new Error('Provider not found');
    }

    const updatedProvider = Object.assign(provider, updatedProviderData);

    return this.providerRepository.update(updatedProvider);
  }
}
