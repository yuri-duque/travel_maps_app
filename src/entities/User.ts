import { Role } from "../enum";

export interface User {
  _id: string;
  email: string;
  name: string;
  roles: Role[];
}
