import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Enrollment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    id_User: string = "default user Parent";

    @Column({ type: 'varchar', length: 50 })
    id_Kid: string = "default user kid";

    @Column({ type: 'boolean' })
    isActive: boolean = true;

    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP', }) created_at: Date;

    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP', }) updated_at: Date;

    @ManyToMany(() => User, user => user.enrollments_kid, {
        onDelete: 'CASCADE',
    })
    @ManyToMany(() => User, user => user.enrollments__parent, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'id_User' })
    user: User;
    @JoinColumn({ name: 'id_Parent' })
    user_parent: User;
}
