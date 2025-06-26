import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialEntity } from './credential.entity';
import { CredentialsService } from './credentials.service';
import { OAuthController } from './oauth.controller';
import { GoogleOAuthStrategy } from './strategies/google.strategy';
import { SlackOAuthStrategy } from './strategies/slack.strategy';
import { GitHubOAuthStrategy } from './strategies/github.strategy';
import { RefreshService } from './refresh.service';

@Module({
    imports: [TypeOrmModule.forFeature([CredentialEntity])],
    providers: [
        CredentialsService,
        GoogleOAuthStrategy,
        SlackOAuthStrategy,
        GitHubOAuthStrategy,
        RefreshService,
    ],
    controllers: [OAuthController],
    exports: [CredentialsService],
})
export class CredentialsModule { }
