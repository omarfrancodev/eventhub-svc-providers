import { IProviderRepository } from '../domain/IProviderRepository';
import { Provider } from '../domain/Provider';

export class DeleteProviderUseCase {
  constructor(private readonly providerRepository: IProviderRepository) {}

  async run(provider: Provider): Promise<void> {
    await this.providerRepository.delete(provider);
  }
}