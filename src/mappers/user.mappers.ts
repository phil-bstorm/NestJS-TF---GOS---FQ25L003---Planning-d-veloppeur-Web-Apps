import { AuthRegisterFormDto } from 'src/dtos/auth.form.dto';
import { UserEntity } from 'src/entities/user.entity';

// DTO -> Entity
export function authRegisterFormDtoToUserEntity(dto: AuthRegisterFormDto): UserEntity {
  const user = new UserEntity();
  user.username = dto.username.toLowerCase();
  user.password = dto.password;
  user.firstname = dto.firstname;

  return user;
}

// Entity -> DTO
