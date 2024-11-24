import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    name: 'history_kids',
    expression: (connection) => connection.createQueryBuilder()
        .select([
            'e.id as id',
            'e.id_User as id_Parent',
            'e.id_Kid as id_Kid',
            'e.isActive as isActive',
            'e.created_at as created_at',
            'u.familyName as familyName',
            'u.givenName as givenName',
            'u.photo as photo',
        ])
        .from('user', 'u')
        .innerJoin('enrollment', 'e', 'e.id_Kid = u.id')
})

export class HistoryKid {
    @ViewColumn()
    id: number;

    @ViewColumn()
    id_Parent: string;

    @ViewColumn()
    id_Kid: string;

    @ViewColumn()
    isActive: boolean;

    @ViewColumn()
    created_at: Date;

    @ViewColumn()
    familyName: string;

    @ViewColumn()
    givenName: string;

    @ViewColumn()
    photo: string;
}
