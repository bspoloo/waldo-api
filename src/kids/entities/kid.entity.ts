import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { DataLocation } from 'src/data-locations/entities/data-location.entity';

@Entity()
export class Kid {

    @PrimaryColumn({type: 'varchar', length: 50})
    id: string;

    @Column()
    familyName: string;

    @Column()
    givenName: string;

    @Column()
    email: string;

    @Column()
    code: string;

    @Column({nullable: false, default: () => 'CURRENT_TIMESTAMP',}) created_at: Date;

    @Column({nullable: false, default: () => 'CURRENT_TIMESTAMP',}) updated_at: Date;

    @OneToMany(() => DataLocation, dataLocation => dataLocation.kid)
    dataLocations: DataLocation[];
}
