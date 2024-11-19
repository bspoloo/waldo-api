import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('connection_status')
export class ConnectionStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ default: false })
  isConnected: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastChecked: Date;
}
