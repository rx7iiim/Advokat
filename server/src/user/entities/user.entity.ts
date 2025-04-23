import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Subscription } from '../../subscription/entities/subscription.entity';
import { LawFirm } from '../../law-firm/entities/law-firm.entity';
import { Client } from '../../client/entities/client.entity'
import { File } from '../../file/entities/file.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phoneNumber:number;

  @Column()
  firmLawyer: boolean;


  @Column({ nullable: true })
  phone_number: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ nullable: true })
  confirmationCode: string;

  @Column({ nullable: true })
  confirmationExpires: Date;


  @Column({ type: 'enum', enum: ['Firm Manager', 'single lawyer','lawyer'],default:"single lawyer" })
  role: string;

  @Column()
  plan:string;

 
  @OneToOne(() => Subscription, (subscription) => subscription.user, { onDelete: 'CASCADE' })
  subscription: Subscription;
  
  @OneToMany(() => Task, (task)=>task.user ,{ nullable: true })
  tasks: Task[];

  @ManyToOne(() => LawFirm, (lawFirm) => lawFirm.lawyers, { nullable: true, onDelete: 'CASCADE', cascade: true})
  @JoinColumn({ name: 'law_firm_id' })
  law_firm: LawFirm;

  @OneToMany(() => Client, (client) => client.user,{ nullable: true })
  clients: Client[];

  @OneToMany(() => File, (file) => file.user,{ nullable: true })
  files: File[];

  @OneToMany(() => Schedule, (schedule) => schedule.user,{ nullable: true })
  schedules: Schedule[];
}