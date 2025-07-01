import { Injectable } from '@nestjs/common';
import axios from 'axios';
import qs from 'querystring';

@Injectable()
export class GoogleOAuthStrategy {
  clientId = process.env.GOOGLE_CLIENT_ID;
  clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  redirectUri = process.env.GOOGLE_REDIRECT_URI;

  getAuthUrl() {
    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' ');

    return (
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${scope}&access_type=offline&prompt=consent`
    );
  }

  async getTokenData(code: string) {
    const tokenRes = await axios.post(
      'https://oauth2.googleapis.com/token',
      qs.stringify({
        code,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
        grant_type: 'authorization_code',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    const profileRes = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: { Authorization: `Bearer ${tokenRes.data.access_token}` },
      },
    );

    return {
      userId: profileRes.data.id,
      data: {
        token: tokenRes.data,
        profile: profileRes.data,
      },
    };
  }
}
