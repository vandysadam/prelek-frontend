import { UserRoleEnum } from "../modules/users/enums/user-role.enum";

export const validateRoles = (role: UserRoleEnum, allowed: UserRoleEnum[]) => {
  return allowed.includes(role);
};
