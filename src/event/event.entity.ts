import { Entity, Column, PrimaryGeneratedColumn, OneToOne,ManyToOne, BeforeInsert, OneToMany, Unique, JoinColumn, Index } from 'typeorm';

export enum EventTypes {
  ENTER = 'enter',
  EXIT = 'exit',
  HEARTBEAT = 'heartbeat',
}

@Entity({ name: 'eventregister' })
export class EventRegister {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  randomId: string;

  @Column()
  employeeId: string;

  @Column()
  doorDeviceId: string;

  @Column()
  status: string;

  @Column()
  eventType: EventTypes;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  created: Date;

}