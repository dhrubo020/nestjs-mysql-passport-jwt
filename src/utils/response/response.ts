import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Response<T> {
	@ApiProperty()
	success: boolean;
	data: T;
}

@Injectable()
export class GlobalResponseTransformer<T> implements NestInterceptor<T, Response<T>> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
		return next.handle().pipe(map((data) => ({ success: true, data, message: null })));
	}
}
