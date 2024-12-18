import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('connection_status')
export class ConnectionStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ type: 'varchar', default: 'No network available' }) 
  connectionStatus: string; 

  @Column({type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP', })
  lastChecked: Date;

  @Column({ type: 'boolean', default: true })
  isActiveStatus: boolean;
}
