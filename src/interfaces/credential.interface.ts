export type CredentialType = 'oauth2' | 'apiKey' | 'basicAuth';

export interface OAuth2Token {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    expiry_date?: number; // optional (if stored)
}

export interface CredentialDefinition {
    id?: string;
    provider: string; // e.g., 'slack', 'github', 'google-sheets'
    type: CredentialType;
    userId: string;
    data: Record<string, any>; // token, API keys, etc.
    createdAt?: Date;
    updatedAt?: Date;
}
