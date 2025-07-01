import { Injectable } from '@nestjs/common';
import axios from 'axios';
import qs from 'querystring';
import { OAuthStrategy } from './oauth.interface';

@Injectable()
export class GitHubOAuthStrategy implements OAuthStrategy {
  clientId = process.env.GITHUB_CLIENT_ID;
  clientSecret = process.env.GITHUB_CLIENT_SECRET;
  redirectUri = process.env.GITHUB_REDIRECT_URI;

  getAuthUrl(): string {
    return `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=repo,user`;
  }

  async getTokenData(code: string) {
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        redirect_uri: this.redirectUri,
      },
      {
        headers: { Accept: 'application/json' },
      },
    );

    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return {
      userId: userRes.data.id.toString(),
      data: {
        token: tokenRes.data,
        profile: userRes.data,
      },
    };
  }
}
