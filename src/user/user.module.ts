import { Module } from '@nestjs/common';
import { UserRepository } from './user.respository';

@Module({
  imports: [],
  controllers: [],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
