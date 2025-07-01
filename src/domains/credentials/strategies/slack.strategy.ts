import { Injectable } from '@nestjs/common';
import axios from 'axios';
import qs from 'querystring';
import { OAuthStrategy } from './oauth.interface';

@Injectable()
export class SlackOAuthStrategy implements OAuthStrategy {
  clientId = process.env.SLACK_CLIENT_ID;
  clientSecret = process.env.SLACK_CLIENT_SECRET;
  redirectUri = process.env.SLACK_REDIRECT_URI;

  getAuthUrl(): string {
    const scope = ['channels:read', 'chat:write', 'users:read'].join(',');
    return `https://slack.com/oauth/v2/authorize?client_id=${this.clientId}&scope=${scope}&redirect_uri=${this.redirectUri}`;
  }

  async getTokenData(code: string) {
    const response = await axios.post(
      'https://slack.com/api/oauth.v2.access',
      qs.stringify({
        code,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    if (!response.data.ok) throw new Error('Slack OAuth failed');

    return {
      userId: response.data.authed_user.id,
      data: response.data,
    };
  }
}
