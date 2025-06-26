import { Module, DynamicModule } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { BlobStorageService } from './blob-storage.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    providers: [FileStorageService, BlobStorageService],
    exports: [FileStorageService, BlobStorageService],
})
export class StorageModule { }
