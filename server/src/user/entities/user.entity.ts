import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Case } from '../../case/entities/case.entity';
import { Subscription } from '../../subscription/entities/subscription.entity';
export enum UserRole {
  LAWYER = 'lawyer',
  ADMIN = 'admin',
  MANAGER ="manager",
}
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'client' })
  role: UserRole.LAWYER | UserRole.ADMIN | UserRole.MANAGER;

  @OneToMany(() => Case, (caseEntity) => caseEntity.client)
  cases: Case[];

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];
}
