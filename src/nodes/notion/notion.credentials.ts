export interface NotionCredentials {
  apiKey: string;
}

export const NotionCredentialsSchema = {
  name: 'Notion',
  displayName: 'Notion',
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
      description: 'The API key for Notion integration',
    },
  },
};
