import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { LawFirm } from '../../law-firm/entities/law-firm.entity';
import { Subscription } from '../../subscription/entities/subscription.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  confirmationExpires: Date;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ nullable: true })
  confirmationCode: string;


  @Column({ type: 'enum', enum: ['single_lawyer', 'law_firm', 'lawyer_in_firm'],default:"single_lawyer" })
  user_type: string;

  @ManyToOne(() => LawFirm, (lawFirm) => lawFirm.users, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'law_firm_id' })
  law_firm: LawFirm;

  @ManyToOne(() => Subscription, (subscription) => subscription.users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subscription_id' })
  subscription: Subscription;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}