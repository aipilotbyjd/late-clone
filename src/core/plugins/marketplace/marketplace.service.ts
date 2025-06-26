import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { MarketplaceEntity } from './marketplace.entity';

@Injectable()
export class MarketplaceService {
    constructor(
        @InjectRepository(MarketplaceEntity)
        private readonly repo: Repository<MarketplaceEntity>,
    ) { }

    findAll(options?: FindManyOptions<MarketplaceEntity>) {
        return this.repo.find(options);
    }

    findOne(id: string) {
        return this.repo.findOne({ where: { id } });
    }

    save(plugin: MarketplaceEntity) {
        return this.repo.save(plugin);
    }
}
