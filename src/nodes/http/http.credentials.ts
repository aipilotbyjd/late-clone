export interface HttpCredentials {
  type: 'none' | 'apiKey' | 'basicAuth' | 'bearer';
  apiKey?: string; // For 'apiKey' type
  apiKeyHeader?: string; // Header name for API key
  username?: string; // For 'basicAuth' type
  password?: string; // For 'basicAuth' type
  bearerToken?: string; // For 'bearer' type
}
