import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { DataLocation } from 'src/data-locations/entities/data-location.entity';
import { Code } from 'src/codes/entities/code.entity';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';

@Entity()
export class User {

    @PrimaryColumn({type: 'varchar', length: 50})
    id: string;

    @Column()
    familyName: string;

    @Column()
    givenName: string;

    @Column()
    email: string;

    @Column()
    role: string;

    @Column({nullable: false, default: () => 'CURRENT_TIMESTAMP',}) created_at: Date;

    @Column({nullable: false, default: () => 'CURRENT_TIMESTAMP',}) updated_at: Date;

    @OneToMany(() => DataLocation, dataLocation => dataLocation.user)
    dataLocations: DataLocation[];

    @OneToMany(() => Code, code => code.user)
    codes: Code[];

    @OneToMany(() => Enrollment, enrollment => enrollment.user)
    enrollments_kid: Enrollment[];
    @OneToMany(() => Enrollment, enrollment => enrollment.user_parent)
    enrollments__parent: Enrollment[];
}
