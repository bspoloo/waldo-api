import { Column, Entity, PrimaryColumn, ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    name: 'enrollments_fathers',
    expression: `
        SELECT e.id, 
               u.id AS id_Parent, 
               e.id_kid, 
               u.familyName, 
               u.givenName, 
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
    role: string;

    @ViewColumn()
    email: string;

    @ViewColumn()
    isActive: boolean;
}
