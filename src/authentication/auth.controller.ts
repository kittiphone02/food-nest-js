import { Controller, Post, Body, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import { RegisterUsersDto } from "./dto/register-user.dto";


@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    @UsePipes(new ValidationPipe({ transform: true }))
    async login(@Body() loginDto: LoginDto): Promise<any> {
        try {
            const result = await this.authService.login(loginDto);
            return {
                status: 'Ok!',
                message: 'Successfully login!',
                result: result,
            };
        } catch (err) {
            return {
                status: 'Error!',
                message: 'Internal Server Error!',
            };
        }
    }

    @Post('/register')
    @UsePipes(new ValidationPipe({ transform: true }))
    async register(@Body() registerDto: RegisterUsersDto): Promise<any> {
        try {
            const result = await this.authService.register(registerDto);
            return {
                status: 'Ok!',
                message: 'Successfully register user!',
                result: result,
            };
        } catch (err) {
            console.log(err);
            return {
                status: 'Error!',
                message: 'Internal Server Error!',
            };
        }
    }
}
