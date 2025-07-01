// src/core/registry/registry.module.ts

import { Global, Module, OnModuleInit } from '@nestjs/common';
import { NODE_REGISTRY } from './constants';
import { NodeRegistryService } from './node.registry.service';
import { SlackNode } from '../../nodes/slack/slack.node';
import { SlackTrigger } from '../../nodes/slack/slack.trigger';
import { GitHubNode } from '../../nodes/github/github.node';
import { GitHubTrigger } from '../../nodes/github/github.trigger';
import { HttpNode } from '../../nodes/http/http.node';
import { GoogleSheetsNode } from '../../nodes/google-sheets/sheet.node';
import { GoogleSheetsTrigger } from '../../nodes/google-sheets/sheet.trigger';
import { RegisteredNode } from '../../interfaces/node.interface';

@Global()
@Module({
  providers: [
    {
      provide: NODE_REGISTRY,
      useValue: new Map<string, RegisteredNode>(),
    },
    NodeRegistryService,
  ],
  exports: [NodeRegistryService, NODE_REGISTRY],
})
export class RegistryModule implements OnModuleInit {
  constructor(private readonly registryService: NodeRegistryService) {}

  onModuleInit(): void {
    // Register built-in nodes
    this.registryService.register('slack', new SlackNode());
    this.registryService.register('slack.trigger', new SlackTrigger());

    this.registryService.register('github', new GitHubNode());
    this.registryService.register('github.trigger', new GitHubTrigger());

    this.registryService.register('http', new HttpNode());

    this.registryService.register('google-sheets', new GoogleSheetsNode());
    this.registryService.register(
      'google-sheets.trigger',
      new GoogleSheetsTrigger(),
    );
  }
}
