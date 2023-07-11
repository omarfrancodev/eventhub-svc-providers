import { Provider } from '../domain/Provider';
import { IProviderRepository } from '../domain/IProviderRepository';

export class FindByUserIdUseCase {
  constructor(private readonly providerRepository: IProviderRepository) { }

  async run(userId: number): Promise<Provider | null> {
    return this.providerRepository.findByUserId(userId);
  }
}