import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from 'typeorm';

@Entity()
export class Code {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    id_User: string = "default user";  

    @Column({ type: 'varchar', length: 50 }) 
    code: string;

    @Column({ type: 'boolean'}) 
    isAvaible: boolean = true;

    @Column({nullable: false, default: () => 'CURRENT_TIMESTAMP',}) created_at: Date;

    @Column({nullable: false, default: () => 'CURRENT_TIMESTAMP',}) updated_at: Date;

    @ManyToMany(() => User, user => user.codes, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'id_User' })  
    user: User; 
}
