import { Provider } from '../domain/Provider';
import { IProviderRepository } from '../domain/IProviderRepository';

export class CreateProviderUseCase {
  constructor(private readonly providerRepository: IProviderRepository) {}

  async run(provider: Provider): Promise<Provider> {
    return this.providerRepository.create(provider);
  }
}
