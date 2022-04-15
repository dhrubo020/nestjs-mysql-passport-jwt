import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();

		if (!request.headers?.authorization) {
			throw new HttpException('Required authorization header.', HttpStatus.BAD_REQUEST);
		}
		const token = request.headers.authorization.split(' ')[1];
		const decode = this.jwtService.verify(token, { secret: process.env.JWT_SECRET }) as any;

		if (decode?.userId) {
			request.user = { ...decode };
			return true;
		} else {
			return false;
		}
	}
}
