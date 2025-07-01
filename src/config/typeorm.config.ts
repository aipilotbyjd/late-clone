import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

/**
 * Generates the TypeORM configuration object for PostgreSQL.
 * It uses the ConfigService to fetch database credentials from environment variables,
 * which is a security best practice.
 *
 * Make sure you have the following variables in your .env file:
 * DB_HOST=localhost
 * DB_PORT=5432
 * DB_USERNAME=your_postgres_user
 * DB_PASSWORD=your_postgres_password
 * DB_DATABASE=your_database_name
 */
export const typeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get<string>('DB_HOST'),
  port: config.get<number>('DB_PORT'),
  username: config.get<string>('DB_USERNAME'),
  password: config.get<string>('DB_PASSWORD'),
  database: config.get<string>('DB_DATABASE'),
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
});
