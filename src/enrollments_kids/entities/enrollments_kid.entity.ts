import { Column, Entity, PrimaryColumn, ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    name: 'enrollments_kids',
    expression: `
        select 
            e.id ,
            u.id as id_Kid, 
            e.id_User as id_Parent , 
            u.familyName, 
            u.givenName, 
            u.photo , 
            u.phone,
            u.role, 
            u.email, 
            e.isActive, 
            cs.connectionStatus, 
            cs.lastChecked,
            cs.isActiveStatus
        from user u
        inner join enrollment e 
        on e.id_Kid = u.id
        inner join connection_status cs 
        on u.id = cs.userId where u.role = "kid" and e.isActive = true and cs.isActiveStatus = true
    `
})

export class EnrollmentsKid {
    @ViewColumn()
    id: number;

    @ViewColumn()
    id_kid: string;

    @ViewColumn()
    id_Parent: string;

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

    @ViewColumn()
    connectionStatus: string;

    @ViewColumn()
    lastChecked: Date;

    @ViewColumn()
    isActiveStatus: Boolean;
}
