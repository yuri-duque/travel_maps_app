import { Gender, Role } from "../enum";

export interface User {
  _id: string;
  email: string;
  name: string;
  gender: Gender;
  roles: Role[];
}
