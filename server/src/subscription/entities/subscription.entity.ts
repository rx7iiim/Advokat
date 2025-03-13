import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { LawFirm } from 'src/law-firm/entities/law-firm.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  subscription_id: number;

  @Column()
  subscription_price: number;

  @Column({type:'enum',enum:["law firm","single lawyer"]})
  subscription_type: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  started_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  ended_at: Date;

  @OneToOne(() => User, (user) => user.subscription)
  @JoinColumn()
  user: User;

  @OneToOne(() => LawFirm, (lawfirm) => lawfirm.subscription)
  @JoinColumn()
  law_firm: LawFirm;
}