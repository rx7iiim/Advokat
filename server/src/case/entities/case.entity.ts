import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Lawyer } from '../../lawyers/entities/lawyer.entity';

@Entity({ name: 'cases' }) // Set table name
export class Case {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => User, (client) => client.cases, { onDelete: 'CASCADE' })
  client: User;

  @ManyToOne(() => Lawyer, (lawyer) => lawyer.cases, { onDelete: 'SET NULL' })
  lawyer: Lawyer;

  @Column({
    type: 'enum',
    enum: ['ongoing', 'closed', 'archived'],
    default: 'ongoing',
  })
  status: 'ongoing' | 'closed' | 'archived';

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
