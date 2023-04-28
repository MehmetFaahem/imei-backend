import { Global, Module } from '@nestjs/common';
import { JWTService } from 'src/common/services/jwt.service';

@Global()
@Module({
  imports: [],
  providers: [JWTService],
  exports: [JWTService],
})
export class GlobalModule {}
