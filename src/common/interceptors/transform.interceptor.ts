import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface ApiResponse<T> {
    statusCode: number;
    data: T;
    timestamp: string;
    path: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const path = request.url;

        return next.handle().pipe(
            map((data) => ({
                statusCode: response.statusCode,
                data,
                timestamp: new Date().toISOString(),
                path,
            })),
        );
    }
}
