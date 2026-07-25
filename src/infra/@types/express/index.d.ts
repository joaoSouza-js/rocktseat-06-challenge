// @types/express/index.d.ts

import { CurrentUserPayload } from "@/infra/auth/types/current-user";

declare global {
    namespace Express {
        interface User extends CurrentUserPayload { }
    }
}