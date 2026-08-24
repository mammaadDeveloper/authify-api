import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { SigninDto } from './dto/signin.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { RefreshGuard } from '../token/guards/refresh.guard';

type AuthenticatedRequest = {
  user: { id: number };
  headers: { authorization?: string };
};

@Controller({
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('User signed up successfully')
  @Public()
  signup(@Body() body: SignUpDto) {
    return this.service.signup(body);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('User logged in successfully.')
  @Public()
  signin(@Body() body: SigninDto) {
    return this.service.signin(body);
  }

  @Post('signout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ResponseMessage('User logged out successfully.')
  signout(@Req() request: AuthenticatedRequest) {
    return this.service.signout(request.user.id);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Token refreshed successfully.')
  @Public()
  @UseGuards(RefreshGuard)
  refresh(@Req() request: AuthenticatedRequest) {
    const authorization = request.headers.authorization;
    const refreshToken = authorization?.startsWith('Bearer ')
      ? authorization.slice(7)
      : '';

    return this.service.refresh(refreshToken, request.user.id);
  }
}
