import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { HttpDeliverModule } from "./http/http-deliver.module";
import { HttpDelivererModule } from "./http/http-deliverer.module";
import { HttpRecipientModule } from "./http/http-recipient.module";

@Module({
    imports: [
        AuthModule,
        HttpDeliverModule,
        HttpDelivererModule,
        HttpRecipientModule
    ],

})
export class HttpModule { }
