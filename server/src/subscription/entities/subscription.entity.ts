import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  subscription_id: number;

  @Column()
  subscription_price: number;

  @Column('jsonb')
  subscription_type: object;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  started_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  ended_at: Date;

  @OneToMany(() => User, (user) => user.subscription)
  users: User[];
}