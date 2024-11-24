import { Column, Entity, PrimaryColumn, ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    name: 'enrollments_kids',
    expression: (connection) => connection.createQueryBuilder()
        .select([
            'e.id as id',
            'u.id as id_Kid',
            'e.id_User as id_Parent',
            'u.familyName as familyName',
            'u.givenName as givenName',
            'u.photo as photo',
            'u.phone as phone',
            'u.role as role',
            'u.email as email',
            'e.isActive as isActive',
            'cs.connectionStatus as connectionStatus',
            'cs.lastChecked as lastChecked',
            'cs.isActiveStatus as isActiveStatus',
        ])
        .from('user', 'u')
        .innerJoin('enrollment', 'e', 'e.id_Kid = u.id')
        .innerJoin('connection_status', 'cs', 'u.id = cs.userId')
        // Sin parámetros dinámicos
        .where('u.role = "kid"') // Valor estático
})

export class EnrollmentsKid {
    @ViewColumn()
    id: number;

    @ViewColumn()
    id_Kid: string;

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
