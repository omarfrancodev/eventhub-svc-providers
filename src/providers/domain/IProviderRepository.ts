import { Provider } from './Provider';

export interface IProviderRepository {
  create(provider: Provider): Promise<Provider>;
  update(provider: Provider): Promise<Provider>;
  delete(provider: Provider): Promise<void>;
  findById(providerId: number): Promise<Provider | null>;
  findAll(): Promise<Provider[]>;
  findByCategory(category: string): Promise<Provider[]>;
  findByUserId(userId: number): Promise<Provider | null>;
}
