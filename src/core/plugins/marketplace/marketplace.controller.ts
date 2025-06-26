import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { PluginService } from '../plugin.service';
import { MarketplaceEntity } from './marketplace.entity';

@Controller('marketplace')
export class MarketplaceController {
    constructor(
        private readonly marketplace: MarketplaceService,
        private readonly pluginService: PluginService,
    ) { }

    // List all available plugins (both installed and not)
    @Get()
    listAll() {
        return this.marketplace.findAll();
    }

    // List only installed plugins
    @Get('installed')
    listInstalled() {
        return this.pluginService.listInstalled();
    }

    // Install a plugin by its marketplace ID
    @Post('install/:id')
    install(@Param('id') id: string) {
        return this.pluginService.install(id);
    }

    // Uninstall a plugin by its marketplace ID
    @Post('uninstall/:id')
    uninstall(@Param('id') id: string) {
        return this.pluginService.uninstall(id);
    }

    // Add or update a plugin in the marketplace
    @Post()
    addOrUpdate(@Body() plugin: Partial<MarketplaceEntity>) {
        return this.marketplace.save(plugin as MarketplaceEntity);
    }
}
