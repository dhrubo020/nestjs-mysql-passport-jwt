import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(private userService: UsersService, private jwtService: JwtService) {}

	async login(authLoginDto: AuthLoginDto) {
		const user = await this.validateUser(authLoginDto);
		const payload = {
			userId: user.id,
			logInTime: Date.now(),
		};
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	private async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
		const { email, password } = authLoginDto;
		const user = await this.userService.findByEmail(email);
		if (!user) {
			throw new UnauthorizedException();
		}

		if (!(await user?.validatePassword(password))) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
