// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

// Common
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

// Core
import { EngineModule } from './core/engine/engine.module';
import { RegistryModule } from './core/registry/registry.module';
import { PluginsModule } from './core/plugins/plugins.module';
import { SchedulerModule } from './core/scheduler/scheduler.module';
import { WebhooksModule } from './core/webhooks/webhooks.module';

// Domains
import { AuthModule } from './domains/auth/auth.module';
import { TeamModule } from './domains/teams/team.module';
import { CredentialsModule } from './domains/credentials/credentials.module';
import { WorkflowsModule } from './domains/workflows/workflows.module';
import { ExecutionsModule } from './domains/executions/executions.module';
import { TemplatesModule } from './domains/templates/templates.module';
import { NotificationsModule } from './domains/notifications/notifications.module';
import { LogsModule } from './domains/logs/logs.module';

// Storage
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    // Configuration & Database
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),

    // Core
    EngineModule,
    RegistryModule,
    PluginsModule,
    SchedulerModule,
    WebhooksModule,

    // Domain-level features
    AuthModule,
    TeamModule,
    CredentialsModule,
    WorkflowsModule,
    ExecutionsModule,
    TemplatesModule,
    NotificationsModule,
    LogsModule,

    // Storage providers
    StorageModule,
  ],
  providers: [
    // Global exception filter
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    // Global interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule { }
