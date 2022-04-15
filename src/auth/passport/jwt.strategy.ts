import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
			expiresIn: '30s',
		});
	}

	async validate(payload: { userId: number }) {
		console.log('JwtStrategy extends PassportStrategy(Strategy)');
		return {
			userId: payload.userId,
		};
	}
}
