import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  identifier: string;  // ← Changed from "email" to "identifier"

  @IsString()
  @IsNotEmpty()
  password: string;
}