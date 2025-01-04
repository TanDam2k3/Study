import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { MongoDBModule } from 'src/kernel/infras/mongodb';
import { authProviders } from './providers';
import { LoginController, UserRegisterController } from './controllers';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongoDBModule, UserModule],
  controllers: [AuthController, LoginController, UserRegisterController],
  providers: [...authProviders, AuthService],
  exports: [...authProviders, AuthService],
})
export class AuthModule {}
