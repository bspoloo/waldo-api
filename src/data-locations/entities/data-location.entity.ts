import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from 'typeorm';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Kid } from 'src/kids/entities/kid.entity';

@Entity()
export class DataLocation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    id_Kid: string = "defaul kid";

    @Column({type: 'varchar', length: 50 })
    latitude: string;

    @Column({type: 'varchar', length: 50 })
    longitude: string;

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

