import { Role } from "./role";

export class User {
    username: String;
    email: String;
    roles: Role;
    token?: string;
}