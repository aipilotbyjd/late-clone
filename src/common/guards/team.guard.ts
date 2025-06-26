import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    BadRequestException,
} from '@nestjs/common';

@Injectable()
export class TeamGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const teamIdParam = request.params.teamId || request.body.teamId;

        if (!teamIdParam) {
            throw new BadRequestException('teamId is required');
        }
        if (!user?.teams || !Array.isArray(user.teams)) {
            throw new ForbiddenException('User has no team assignments');
        }
        if (!user.teams.includes(teamIdParam)) {
            throw new ForbiddenException('User is not a member of the specified team');
        }
        return true;
    }
}
