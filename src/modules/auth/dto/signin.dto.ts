import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SigninDto {
  @IsNotEmpty({ message: 'validation.user.email.required' })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
