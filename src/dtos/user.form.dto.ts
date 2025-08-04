import { ApiProperty } from '@nestjs/swagger';
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';

export class UploadAvatarDto {
  @ApiProperty({
    description: 'The avatar image file to upload',
    required: true,
    type: 'string',
    format: 'binary',
  })
  @IsFile()
  @MaxFileSize(20 * 1024 * 1024) // 5 MB
  @HasMimeType(['image/jpeg', 'image/png', 'image/gif'])
  image: MemoryStoredFile;
}
