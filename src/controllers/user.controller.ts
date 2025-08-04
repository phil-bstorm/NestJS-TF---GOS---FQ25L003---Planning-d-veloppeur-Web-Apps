import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { UploadAvatarDto } from 'src/dtos/user.form.dto';
import { ConnectedGuard } from 'src/guards/connected.guard';
import { UserService } from 'src/services/user.service';
import { Session } from 'src/shared/interfaces/session.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('avatar')
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(ConnectedGuard)
  @FormDataRequest()
  async updateAvatar(
    @Req() req: Request & { session: Session },
    @Body() updateAvatarDto: UploadAvatarDto,
  ) {
    console.log('UserId from the request context:', req.session.id);
    console.log('Avatar URL:', updateAvatarDto.image);
    await this.userService.updateAvatar(req.session.id, updateAvatarDto.image);
  }
}
