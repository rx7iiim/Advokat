import { Entity, Column, PrimaryColumn, DeleteDateColumn } from 'typeorm';
import { ISession } from 'connect-typeorm';

@Entity()
export class SessionEntity implements ISession {
  @PrimaryColumn()
  id: string;

  @Column('bigint')
  expiredAt: number;

  @Column('text')
  json: string;

  @DeleteDateColumn()
  deletedAt?: Date; // For soft deletes (optional)
}
