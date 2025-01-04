import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { MongoDBModule } from 'src/kernel/infras/mongodb';
import { userProviders } from './providers';

@Module({
  imports: [MongoDBModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [...userProviders, UserService],
})
export class UserModule {}
