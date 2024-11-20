import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  id_User: string;

  @Column({ type: 'varchar', length: 50 })
  id_Kid: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.enrollments__parent, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_User' })
  parent: User;

  @ManyToOne(() => User, (user) => user.enrollments_kid, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_Kid' })
  kid: User;
}
