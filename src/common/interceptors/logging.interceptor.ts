import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, body } = req;
    const now = Date.now();

    this.logger.log(`→ ${method} ${url} | Body: ${JSON.stringify(body)}`);

    return next.handle().pipe(
      tap((response) => {
        const ms = Date.now() - now;
        this.logger.log(
          `← ${method} ${url} | ${ms}ms | Response: ${JSON.stringify(response)}`,
        );
      }),
    );
  }
}
