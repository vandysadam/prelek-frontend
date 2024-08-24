import { UserRoleEnum } from '../../enums/user-role.enum';

export class User {
  /**
   * User ID
   */
  readonly _id?: string;

  /**
   * Username
   */
  username?: string;

  /**
   * User Email
   */
  house_number?: string;

  /**
   * User password
   */
  password?: string;

  /**
   * Role
   */
  role?: UserRoleEnum | string;

  /**
   * Name or CompanyName
   */
  fullName?: string;

  /**
   * Phone Number
   */
  phoneNumber?: string;

  userAvatarUrl?: string;

  /**
   * Created By (userId)
   */
  creatorId?: string;

  // createdBy?: User;

  lastLogin?: Date;

  twoFactorAuthenticationSecret?: string;

  is2FAEnabled?: boolean;

  otpAuthUrl?: string;

  isLogined?: boolean;

  isPremium?: boolean;

  premiumExpiredAt?: Date;

  readonly createdAt?: Date;

  readonly updatedAt?: Date;
}

/**
 * Organization-scoped roles used by Iqam Global / Ommar.net.
 */
export enum ROLE_TYPE_ENUM {
  ADMIN = 'ADMIN',
  FINANCE = 'FINANCE',
  OPERATOR = 'OPERATOR',
  GUEST = 'GUEST'
}

export type RoleType = keyof typeof ROLE_TYPE_ENUM;

export class CurrentUserDTO {
  id: string;
  name: string;
  roles: RoleType;
  house_number: number;
  email: String;
}
