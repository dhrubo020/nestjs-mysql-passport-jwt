import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	@ApiProperty({ example: 'auth@mail.com' })
	email: string;

	@IsNotEmpty()
	@ApiProperty({ example: '12345' })
	password: string;
}

export class AuthLoginDto {
	@IsEmail()
	@ApiProperty({ example: 'auth@mail.com' })
	email: string;

	@IsNotEmpty()
	@ApiProperty({ example: '12345' })
	password: string;
}
