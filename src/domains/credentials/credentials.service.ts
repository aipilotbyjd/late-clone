import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CredentialEntity } from './credential.entity';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(CredentialEntity)
    private readonly credentialRepo: Repository<CredentialEntity>,
  ) {}

  async saveCredential(provider: string, userId: string, data: any) {
    const existing = await this.credentialRepo.findOne({
      where: { provider, userId },
    });
    if (existing) {
      existing.data = data;
      return this.credentialRepo.save(existing);
    }
    return this.credentialRepo.save({ provider, userId, data });
  }

  async getCredential(provider: string, userId: string) {
    return this.credentialRepo.findOne({ where: { provider, userId } });
  }
}
