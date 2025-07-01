import { Injectable } from '@nestjs/common';
import axios from 'axios';
import qs from 'querystring';

@Injectable()
export class RefreshService {
  async refreshGoogleToken(refreshToken: string) {
    const res = await axios.post(
      'https://oauth2.googleapis.com/token',
      qs.stringify({
        refresh_token: refreshToken,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return res.data; // new access_token, expires_in, etc.
  }
}
