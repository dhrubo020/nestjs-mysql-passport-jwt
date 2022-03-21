import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { User } from 'src/decorator/user.decorator';
import { CreateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post('create')
	async create(@Body() createUserDto: CreateUserDto): Promise<any> {
		return await this.usersService.create(createUserDto);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get('self')
	async show(@User() id: string) {
		console.log(id);
		return await this.usersService.showById(parseInt(id));
	}
}
