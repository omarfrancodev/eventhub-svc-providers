import { Provider } from '../domain/Provider';
import { IProviderRepository } from '../domain/IProviderRepository';

export class UpdateProviderUseCase {
  constructor(private readonly providerRepository: IProviderRepository) {}

  async run(provider: Provider, updatedProviderData: Partial<Provider>): Promise<Provider | null> {

    const updatedProvider = Object.assign(provider, updatedProviderData);

    return this.providerRepository.update(updatedProvider);
  }
}
