import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from '../services/api-config.service';

@Module({
    providers: [ApiConfigService],
    exports: [ApiConfigService],
})
@Global()
export class ApiConfigModule { }