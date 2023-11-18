import { Role } from "../enum";

export type User = {
  _id: string;
  email: string;
  name: string;
  roles: Role[];
};
