import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    console.log('🛠️ Checking session:', request.session);
    console.log('👤 User in request:', request.user);

    if (!request.user) {
      throw new UnauthorizedException('User not found in session');
    }

    return request.user;
  },
);
