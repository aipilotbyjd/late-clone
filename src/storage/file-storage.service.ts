import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileStorageService {
    private readonly logger = new Logger(FileStorageService.name);
    private readonly basePath: string;

    constructor(private readonly config: ConfigService) {
        this.basePath = this.config.get<string>('FILE_STORAGE_PATH') || 'storage';
    }

    /** Ensure base directory exists */
    private async ensureDir() {
        await fs.mkdir(this.basePath, { recursive: true });
    }

    /** Save a buffer or string to a file under basePath */
    async saveFile(relativePath: string, data: Buffer | string): Promise<string> {
        await this.ensureDir();
        const fullPath = join(this.basePath, relativePath);
        await fs.mkdir(join(fullPath, '..'), { recursive: true });
        await fs.writeFile(fullPath, data);
        this.logger.log(`Saved file to ${fullPath}`);
        return fullPath;
    }

    /** Read file as buffer */
    async readFile(relativePath: string): Promise<Buffer> {
        const fullPath = join(this.basePath, relativePath);
        return fs.readFile(fullPath);
    }

    /** Delete a file */
    async deleteFile(relativePath: string): Promise<void> {
        const fullPath = join(this.basePath, relativePath);
        await fs.unlink(fullPath);
        this.logger.log(`Deleted file ${fullPath}`);
    }
}
