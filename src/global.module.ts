import { Global, Module } from '@nestjs/common';
import { JWTService } from './common/services/jwt.service';

@Global()
@Module({
  imports: [],
  providers: [JWTService],
  exports: [JWTService],
})
export class GlobalModule {}
