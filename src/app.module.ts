import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';


@Module({
  imports: [TypeOrmModule.forRoot(), SharedModule, AuthModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
