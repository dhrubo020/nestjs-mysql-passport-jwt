/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	private logger = new Logger('Global Errors');
	catch(exception: any, host: ArgumentsHost) {
		this.logger.error(exception.message, exception.stack);
		const ctx = host.switchToHttp();
		const request = ctx.getResponse();

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;
		const message = exception?.response?.message || exception.message;
		let responseObjArr: unknown[];

		if (typeof message === 'object') {
			responseObjArr = [...message];
		} else {
			responseObjArr = [message];
		}

		request.status(status).send({
			success: false,
			message: responseObjArr,
			data: null,
		});
	}
}
