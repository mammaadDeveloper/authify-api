import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
export class SignUpDto {
  @IsNotEmpty({
    message: 'validation.user.name.required',
  })
  @MinLength(10, { message: 'validation.user.name.min_length' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
