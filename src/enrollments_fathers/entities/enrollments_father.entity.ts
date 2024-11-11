import { Column, Entity, PrimaryColumn, ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    name: 'enrollments_fathers',
    expression: `
        SELECT  e.id ,
                u.id as id_Parent, 
                e.id_kid , 
                u.familyName, 
                u.givenName, 
                u.photo , 
                u.phone,
                u.role, 
                u.email, 
        e.isActive
        FROM user u
        INNER JOIN enrollment e ON e.id_User = u.id
    `
})

export class EnrollmentsFather {
    @ViewColumn()
    id: number;

    @ViewColumn()
    id_Parent: string;

    @ViewColumn()
    id_kid: string;

    @ViewColumn()
    familyName: string;

    @ViewColumn()
    givenName: string;

    @ViewColumn()
    photo: string;

    @ViewColumn()
    phone: string;

    @ViewColumn()
    role: string;

    @ViewColumn()
    email: string;

    @ViewColumn()
    isActive: boolean;
}
