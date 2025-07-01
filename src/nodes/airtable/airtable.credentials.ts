export interface AirtableCredentials {
  apiKey: string;
}

export const AirtableCredentialsSchema = {
  name: 'Airtable',
  displayName: 'Airtable',
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
      description: 'The API key for Airtable access',
    },
  },
};
