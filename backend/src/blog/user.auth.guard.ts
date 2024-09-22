import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }
  
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: 'yash123',
        });
  
        // Attach the user payload to the request object
        request['user'] = payload;
        return true; // User is authenticated
      } catch (err) {
        console.error('JWT verification failed:', err);
        throw new UnauthorizedException('Invalid token');
      }
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        return undefined;
      }
  
      const [type, token] = authHeader.split(' ');
      return type === 'Bearer' ? token : undefined;
    }
  }
  