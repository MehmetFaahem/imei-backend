import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTService } from '../services/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JWTService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.headers['authorization'])
      throw new UnauthorizedException(
        'Authentication credentials were not provided.',
      );
    const token = req.headers['authorization'];
    const user = await this.jwtService.validateToken(token);
    req.user = {
      name: user.name,
      phone: user.phone,
    };
    return true;
  }
}
