import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Lawyer } from '../../lawyer/entities/lawyer.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';

@Entity()
export class LawFirm {

  @PrimaryGeneratedColumn()
  lawFirmId: number;

  @Column({ unique: true })
  Email: string;

  @Column()
  password: string;

  @Column()
  LawFirmName: string;

  @Column()
  address: string;

  @Column()
  PhoneNumber: number;

  @Column()
  EmployeesNumber:number;

  @Column({ default: false })
  IsEmailConfirmed: boolean;

  @Column({ nullable: true })
  ConfirmationCode: string;

  @Column({ nullable: true })
  ConfirmationExpires: Date; 

  
  @OneToOne(() => Subscription, (subscription) => subscription.law_firm, { onDelete: 'CASCADE' })
  subscription: Subscription;

  @OneToMany(() => Lawyer, (lawyer) => lawyer.lawyer_id)
  lawyers: Lawyer[];  
}