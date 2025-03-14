import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Subscription } from '../../subscription/entities/subscription.entity';
import { Lawyer } from 'src/lawyer/entities/lawyer.entity';

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

  @Column()
  phoneNumber:number;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ nullable: true })
  confirmationCode: string;

  @Column({ nullable: true })
  confirmationExpires: Date;


  @Column({ type: 'enum', enum: ['manager', 'single lawyer','lawyer'],default:"single_lawyer" })
  role: string;

 

  @OneToOne(() => Subscription, (subscription) => subscription.user, { onDelete: 'CASCADE' })
  subscription: Subscription;

  @OneToOne(()=>Lawyer,(lawyer)=>lawyer.user,{onDelete:"CASCADE"} )
  lawyerId:Lawyer;
}