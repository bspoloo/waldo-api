export interface JwtPayload {
    id: string;
    email: string;
    code?: string;
}