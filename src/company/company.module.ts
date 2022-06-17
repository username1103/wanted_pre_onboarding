import { Module } from '@nestjs/common';
import { CompanyRepository } from './company.respository';

@Module({
  imports: [],
  controllers: [],
  providers: [CompanyRepository],
  exports: [CompanyRepository],
})
export class CompanyModule {}
