import { Repository, Like } from 'typeorm';
import { Provider } from '../../domain/Provider';
import { IProviderRepository } from '../../domain/IProviderRepository';
import { AppDataSource } from '../data-source';

export class ProviderRepository implements IProviderRepository {
    private repository: Repository<Provider>;

    constructor() {
        this.repository = AppDataSource.getRepository(Provider)
    }

    async create(provider: Provider): Promise<Provider> {
        return this.repository.save(provider);
    }

    async update(provider: Provider): Promise<Provider> {
        return this.repository.save(provider);
    }

    async delete(provider: Provider): Promise<void> {
        await this.repository.remove(provider);
    }

    async findById(providerId: number): Promise<Provider | null> {
        return this.repository.findOneBy({ providerId: providerId });
    }
    
    async findAll(): Promise<Provider[]> {
        return this.repository.find();
    }

    async findByCategory(category: string): Promise<Provider[]> {
        const providers = await this.repository.find({
            where: { categories: Like(`%${category}%`) },
        });
        return providers;
    }
    
    async findByUserId(userId: number): Promise<Provider | null> {
        return await this.repository.findOneBy({ userId: userId });
    }
}