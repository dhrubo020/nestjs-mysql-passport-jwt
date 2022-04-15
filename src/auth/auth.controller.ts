import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/decorator/user.decorator';
import { AuthLoginDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { UserGuard } from './guards/user.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() authLoginDto: AuthLoginDto) {
		return this.authService.login(authLoginDto);
	}

	@ApiBearerAuth()
	@UseGuards(UserGuard)
	@Get('login-test')
	async test(@User() userId: string) {
		return userId;
	}
}
