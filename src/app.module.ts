import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import Config from './config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [TypeOrmModule.forRoot(Config.database), UserModule, AuthModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
