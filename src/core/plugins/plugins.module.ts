import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PluginService } from './plugin.service';
import { MarketplaceEntity } from './marketplace/marketplace.entity';
import { MarketplaceService } from './marketplace/marketplace.service';
import { MarketplaceController } from './marketplace/marketplace.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MarketplaceEntity])],
    providers: [PluginService, MarketplaceService],
    controllers: [MarketplaceController],
    exports: [PluginService],
})
export class PluginsModule { }
