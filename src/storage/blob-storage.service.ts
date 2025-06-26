import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    S3Client,
    S3ClientConfig,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class BlobStorageService {
    private readonly logger = new Logger(BlobStorageService.name);
    private readonly client: S3Client;
    private readonly bucket: string;

    constructor(private readonly config: ConfigService) {
        const bucket = this.config.get<string>('S3_BUCKET_NAME')!;
        const region = this.config.get<string>('S3_REGION')!;
        const accessKeyId = this.config.get<string>('S3_ACCESS_KEY')!;
        const secretAccessKey = this.config.get<string>('S3_SECRET_KEY')!;

        this.bucket = bucket;

        const s3Config: S3ClientConfig = {
            region,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        };

        this.client = new S3Client(s3Config);
    }

    /** Upload a buffer or stream to S3 */
    async upload(key: string, data: Buffer | Readable, contentType?: string): Promise<string> {
        const cmd = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: data,
            ContentType: contentType,
        });
        await this.client.send(cmd);
        const url = `https://${this.bucket}.s3.${this.client.config.region}.amazonaws.com/${key}`;
        this.logger.log(`Uploaded to ${url}`);
        return url;
    }

    /** Download object from S3 */
    async download(key: string): Promise<Buffer> {
        const cmd = new GetObjectCommand({ Bucket: this.bucket, Key: key });
        const res = await this.client.send(cmd);
        const stream = res.Body as Readable;
        const chunks: Buffer[] = [];
        for await (const chunk of stream) {
            chunks.push(Buffer.from(chunk));
        }
        return Buffer.concat(chunks);
    }

    /** Delete object from S3 */
    async delete(key: string): Promise<void> {
        const cmd = new DeleteObjectCommand({ Bucket: this.bucket, Key: key });
        await this.client.send(cmd);
        this.logger.log(`Deleted S3 object ${key}`);
    }
}
