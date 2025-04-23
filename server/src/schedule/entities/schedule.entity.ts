import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn } from 'typeorm';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  schedule_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @ManyToOne(() => User, (user) =>user.schedules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;


}