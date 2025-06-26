import { Global, Module, OnModuleInit } from '@nestjs/common';
import { NodeRegistryService } from './node.registry.service';
import { SlackNode } from '../../nodes/slack/slack.node';
import { SlackTrigger } from '../../nodes/slack/slack.trigger';
import { GitHubNode } from '../../nodes/github/github.node';
import { GitHubTrigger } from '../../nodes/github/github.trigger';
import { HttpNode } from '../../nodes/http/http.node';
import { GoogleSheetsNode } from '../../nodes/google-sheets/sheet.node';
import { GoogleSheetsTrigger } from '../../nodes/google-sheets/sheet.trigger';

@Global()
@Module({
    providers: [NodeRegistryService],
    exports: [NodeRegistryService],
})
export class RegistryModule implements OnModuleInit {
    constructor(private readonly registry: NodeRegistryService) { }

    onModuleInit(): void {
        // Register built-in nodes
        this.registry.register('slack', new SlackNode());
        this.registry.register('slack.trigger', new SlackTrigger());

        this.registry.register('github', new GitHubNode());
        this.registry.register('github.trigger', new GitHubTrigger());

        this.registry.register('http', new HttpNode());

        this.registry.register('google-sheets', new GoogleSheetsNode());
        this.registry.register('google-sheets.trigger', new GoogleSheetsTrigger());
    }
}
