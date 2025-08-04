import { UserRole } from 'src/shared/enums/user-role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column({ default: UserRole.Client })
  role: UserRole;

  @Column({ nullable: true })
  avatar: string; // url vers l'image de l'utilisateur (stockée sur le serveur)
}
