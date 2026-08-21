import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@Controller({
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post('signup')
  @ResponseMessage('User signed up successfully')
  signup(@Body() body: SignUpDto) {
    return this.service.signup(body);
  }

  @Post('signin')
  signin() {}

  @Post('signout')
  signout() {}

  @Post('refresh')
  refresh() {}
}
