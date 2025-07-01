import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CredentialsService } from './credentials.service';
import { GoogleOAuthStrategy } from './strategies/google.strategy';
import { SlackOAuthStrategy } from './strategies/slack.strategy';
import { GitHubOAuthStrategy } from './strategies/github.strategy';

@Controller('oauth')
export class OAuthController {
  constructor(
    private readonly credentialsService: CredentialsService,
    private readonly googleStrategy: GoogleOAuthStrategy,
    private readonly slackStrategy: SlackOAuthStrategy,
    private readonly githubStrategy: GitHubOAuthStrategy,
  ) {}

  @Get('google')
  redirectGoogle(@Res() res: Response) {
    return res.redirect(this.googleStrategy.getAuthUrl());
  }

  @Get('google/callback')
  async handleGoogle(@Query('code') code: string, @Res() res: Response) {
    const { userId, data } = await this.googleStrategy.getTokenData(code);
    await this.credentialsService.saveCredential('google', userId, data);
    res.send('✅ Google Connected');
  }

  @Get('slack')
  redirectSlack(@Res() res: Response) {
    return res.redirect(this.slackStrategy.getAuthUrl());
  }

  @Get('slack/callback')
  async handleSlack(@Query('code') code: string, @Res() res: Response) {
    const { userId, data } = await this.slackStrategy.getTokenData(code);
    await this.credentialsService.saveCredential('slack', userId, data);
    res.send('✅ Slack Connected');
  }

  @Get('github')
  redirectGitHub(@Res() res: Response) {
    return res.redirect(this.githubStrategy.getAuthUrl());
  }

  @Get('github/callback')
  async handleGitHub(@Query('code') code: string, @Res() res: Response) {
    const { userId, data } = await this.githubStrategy.getTokenData(code);
    await this.credentialsService.saveCredential('github', userId, data);
    res.send('✅ GitHub Connected');
  }
}
