import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiConfigService {
    constructor(private configService: ConfigService) { }

    get port(): number {
        return this.configService.getOrThrow<number>('PORT');
    }



    get databaseUrl(): string {
        const value = this.configService.getOrThrow<string>('DATABASE_URL');

        return value
    }

    get schemaId(): string {
        return process.env.SCHEMA_ID!
    }




}