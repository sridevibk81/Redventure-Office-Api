import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventRegister as EventEntity } from './event.entity';
import { User } from '../auth/interface/user.interface';
import { CreateEventDTO } from '../event/dto/event.dto';
import { Payload } from 'src/auth/dto/payload';
import { UserService } from 'src/shared/user.service';



@Injectable()
export class EventService {
  /* constructor(
    @InjectRepository(EventEntity)
    private userRepository: Repository<EventEntity>,

    
  ) {} */

  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    private userService: UserService,
  ) { }


  async getSeqNumber(): Promise<string> {
    const rand = Math.floor(Math.random() * 100);
    return 'redventure-' + rand + '-id';
  }

  async createEvent(eventObj: any): Promise<any> {
    let obj: any;
    try {
      obj = await this.eventRepository.save(eventObj);
      return (obj);
    } catch (error) {
      Logger.log('Create user error', error);
      throw new HttpException('Create user fail!', HttpStatus.BAD_REQUEST);
    }

  }


  async getEmployeeStatus(reqObj: any): Promise<any> {
    const { employeeId, doorId } = reqObj.payload;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    
    const empStatusObj = await this.eventRepository
      .createQueryBuilder('eventregister')
      .where('eventregister."employeeId" =:employeeId', { employeeId: employeeId })
      .andWhere('eventregister."created" >= :createdAt', { createdAt: start.toISOString() })
      .getOne();
      
    return empStatusObj;

  }


  async getEmployeeEventStatus(reqObj: any): Promise<any> {
    const eventStatus = reqObj.eventType === 'enter'?'exit':'enter';
    const { employeeId, doorId } = reqObj.payload;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    
    const empStatusObj = await this.eventRepository
      .createQueryBuilder('eventregister')
      .where('eventregister."employeeId" =:employeeId', { employeeId: employeeId })
      .andWhere('eventregister."eventType" =:eventType', { eventType: eventStatus })
      .andWhere('eventregister."created" >= :createdAt', { createdAt: start.toISOString() })
      .getOne();
      
    return empStatusObj;

  }




}
