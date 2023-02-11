import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Userdecorator = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
