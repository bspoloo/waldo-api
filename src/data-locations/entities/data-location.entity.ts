import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class DataLocation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    id_User: string = "default user";  
  
    @Column({ type: 'decimal', precision: 10, scale: 8 }) 
    latitude: number;

    @Column({ type: 'decimal', precision: 11, scale: 8 }) 
    longitude: number;

    @Column()
    batteryLevel: number;

    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @ManyToMany(() => User, user => user.dataLocations, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'id_User' })  
    user: User; 
}
