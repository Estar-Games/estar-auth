import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtStrategy } from '../auth/strategy';
import { UserRepository } from './repository';

@Global()
@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtStrategy],
  exports: [UserRepository]
})
export class UserModule {}
