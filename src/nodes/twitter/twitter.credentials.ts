export interface TwitterCredentials {
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessTokenSecret: string;
  bearerToken: string;
}

export const TwitterCredentialsSchema = {
  name: 'Twitter',
  displayName: 'Twitter (X)',
  properties: {
    apiKey: {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string' as const,
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'Twitter API Key',
    },
    apiSecret: {
      displayName: 'API Secret',
      name: 'apiSecret',
      type: 'string' as const,
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'Twitter API Secret',
    },
    accessToken: {
      displayName: 'Access Token',
      name: 'accessToken',
      type: 'string' as const,
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'Twitter Access Token',
    },
    accessTokenSecret: {
      displayName: 'Access Token Secret',
      name: 'accessTokenSecret',
      type: 'string' as const,
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'Twitter Access Token Secret',
    },
    bearerToken: {
      displayName: 'Bearer Token',
      name: 'bearerToken',
      type: 'string' as const,
      typeOptions: {
        password: true,
      },
      default: '',
      required: false,
      description: 'Twitter Bearer Token (for API v2)',
    },
  },
};
