import { Injectable, Logger } from '@nestjs/common';
import { MarketplaceService } from './marketplace/marketplace.service';
import { MarketplaceEntity } from './marketplace/marketplace.entity';

@Injectable()
export class PluginService {
  private readonly logger = new Logger(PluginService.name);

  constructor(private readonly marketplace: MarketplaceService) {}

  /**
   * Installs a plugin by its marketplace record.
   */
  async install(pluginId: string): Promise<MarketplaceEntity> {
    const plugin = await this.marketplace.findOne(pluginId);
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} not found`);
    }
    // Here you would implement actual install logic, e.g. download npm package,
    // copy files to /nodes/, etc. For now we just mark as installed.
    plugin.installed = true;
    this.logger.log(`Plugin ${plugin.name} installed`);
    return this.marketplace.save(plugin);
  }

  /**
   * Uninstalls a plugin.
   */
  async uninstall(pluginId: string): Promise<MarketplaceEntity> {
    const plugin = await this.marketplace.findOne(pluginId);
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} not found`);
    }
    plugin.installed = false;
    this.logger.log(`Plugin ${plugin.name} uninstalled`);
    return this.marketplace.save(plugin);
  }

  /**
   * Lists all installed plugins.
   */
  async listInstalled(): Promise<MarketplaceEntity[]> {
    return this.marketplace.findAll({ where: { installed: true } });
  }
}
