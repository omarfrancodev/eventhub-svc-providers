import { IProviderRepository } from '../domain/IProviderRepository';

export class DeleteProviderUseCase {
  constructor(private readonly providerRepository: IProviderRepository) {}

  async run(providerId: number): Promise<void> {
    const provider = await this.providerRepository.findById(providerId);

    if (!provider) {
      throw new Error('Provider not found');
    }

    await this.providerRepository.delete(provider);
  }
}