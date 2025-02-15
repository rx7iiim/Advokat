import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Case } from '../../case/entities/case.entity';

@Entity({ name: 'lawyers' }) // Set table name
export class Lawyer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 }) // Set max length
  name: string;

  @Column()
  specialization: string;

  @Column({ type: 'int', default: 0 }) // Set type and default
  experience: number;

  @OneToMany(() => Case, (caseEntity) => caseEntity.lawyer)
  cases: Case[];
}