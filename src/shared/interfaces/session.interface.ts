// nest g interface shared/interfaces/session

import { UserRole } from '../enums/user-role.enum';

export interface Session {
  id: string;
  role: UserRole;
}
