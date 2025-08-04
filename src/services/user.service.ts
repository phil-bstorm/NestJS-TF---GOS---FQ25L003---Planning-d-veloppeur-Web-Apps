import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  InvalidLoginException,
  UsernameAlreadyExistsException,
} from 'src/shared/models/errors.model';
import * as sharp from 'sharp';
import { MemoryStoredFile } from 'nestjs-form-data';
import * as fs from 'fs';
import * as path from 'path';

// nest g s services/user

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(newUser: UserEntity) {
    const existingUsername = await this.userRepository.findOne({
      where: {
        username: newUser.username.toLowerCase(),
      },
    });

    if (existingUsername) {
      // Sans "super" dans UsernameAlreadyExistsException
      // throw new UsernameAlreadyExistsException(`Username "${newUser.username}" already exists.`);
      // avec "super" dans UsernameAlreadyExistsException
      throw new UsernameAlreadyExistsException(newUser.username);
    }

    newUser.password = await bcrypt.hash(newUser.password, 10);

    return this.userRepository.save(newUser);
  }

  async login(username: string, password: string) {
    const existingUsername = await this.userRepository.findOne({
      where: {
        username: username.toLowerCase(),
      },
    });

    if (!existingUsername) {
      throw new InvalidLoginException();
    }

    const isValidPassword = await bcrypt.compare(password, existingUsername.password);
    if (!isValidPassword) {
      throw new InvalidLoginException();
    }

    return existingUsername;
  }

  async updateAvatar(userId: string, avatarFile: MemoryStoredFile): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Converssion de l'image en format WebP et redimensionnement (par exemple, 200x200 pixels)
    const processedImage = await sharp(avatarFile.buffer)
      .resize(200, 200) // taille de l'image
      .webp({ quality: 50 }) // convertit en format WebP avec une qualité de 50%
      .toBuffer();

    // Définir le chemin où l'image sera enregistrée
    const filePath = `public/images/avatars/${userId}.webp`;
    const absolutePath = path.resolve(__dirname, '..', '..', filePath);

    // Vérification et création du répertoire si nécessaire
    await fs.promises.mkdir(path.dirname(absolutePath), { recursive: true });

    // Enregistrer l'image traitée dans le système de fichiers
    await fs.promises.writeFile(absolutePath, processedImage);

    // Mettre à jour l'URL de l'avatar dans la base de données
    user.avatar = filePath;
    await this.userRepository.save(user);

    return true;
  }
}
