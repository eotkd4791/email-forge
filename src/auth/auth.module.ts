import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthGuard } from '@/auth/auth.guard';
import { AuthService } from '@/auth/auth.service';

@Module({
  imports: [HttpModule],
  providers: [AuthGuard, AuthService],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
