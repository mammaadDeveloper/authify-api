import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';

@Controller({
  version: '1',
})
export class AuthController {
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {}

  @Post('signin')
  signin() {}

  @Post('signout')
  signout() {}

  @Post('refresh')
  refresh() {}
}
