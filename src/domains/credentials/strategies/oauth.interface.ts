export interface OAuthStrategy {
  getAuthUrl(): string;
  getTokenData(code: string): Promise<{ userId: string; data: any }>;
}
