import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { SharedModule } from 'src/shared/shared.module';
import { EventService } from './event.service';
import { EventRegister } from './event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([EventRegister]),SharedModule],
  
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
