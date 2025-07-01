export interface EmailCredentials {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
}

export const EmailCredentialsSchema = {
  name: 'Email',
  displayName: 'Email (SMTP)',
  properties: {
    host: {
      displayName: 'Host',
      name: 'host',
      type: 'string' as const,
      default: '',
      required: true,
      description: 'SMTP server host',
    },
    port: {
      displayName: 'Port',
      name: 'port',
      type: 'number' as const,
      default: 587,
      required: true,
      description: 'SMTP server port',
    },
    secure: {
      displayName: 'Secure',
      name: 'secure',
      type: 'boolean' as const,
      default: false,
      required: false,
      description: 'Use SSL/TLS',
    },
    user: {
      displayName: 'Username',
      name: 'user',
      type: 'string' as const,
      default: '',
      required: true,
      description: 'SMTP username/email',
    },
    password: {
      displayName: 'Password',
      name: 'password',
      type: 'string' as const,
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'SMTP password',
    },
  },
};
