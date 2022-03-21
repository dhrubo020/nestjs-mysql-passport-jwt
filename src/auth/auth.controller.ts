import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthLoginDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './passport/jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() authLoginDto: AuthLoginDto) {
		return this.authService.login(authLoginDto);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get()
	async test() {
		return 'ok';
	}
}
