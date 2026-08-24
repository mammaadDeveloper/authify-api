import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { SigninDto } from './dto/signin.dto';
import { Public } from 'src/common/decorators/public.decorator';

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
  signin(@Body() body: SigninDto) {
    return this.service.signin(body);
  }

  @Post('signout')
  @HttpCode(HttpStatus.NO_CONTENT)
  signout() {}

  @Post('refresh')
  refresh() {}
}
