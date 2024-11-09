import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from 'typeorm';
import { Kid } from 'src/kids/entities/kid.entity';

@Entity()
export class DataLocation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    id_Kid: string = "default kid";

    @Column({ type: 'decimal', precision: 10, scale: 8 }) // Ajuste para mayor precisión
    latitude: number;

    @Column({ type: 'decimal', precision: 11, scale: 8 }) // Ajuste para mayor precisión
    longitude: number;

    @Column()
    batteryLevel: number;

    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP', }) created_at: Date;

    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP', }) updated_at: Date;

    @ManyToMany(() => Kid, user => user.dataLocations, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'id_Kid' })
    kid: Kid;
}
