import type { Account } from "@/domain/enterprise/entities/account/account-entity.js";
import { PermissionPresets } from "@/domain/enterprise/entities/account/presets/permission-preset.js";
import { Deliverer } from "@/domain/enterprise/entities/deliverer/deliverer-entity.js";
import { AvailabilityValueObject } from "@/domain/enterprise/entities/deliverer/value-objects/availability.js";
import { ScheduleValueObject } from "@/domain/enterprise/entities/deliverer/value-objects/schedule.js";
import type { AccountRepository } from "../../repositories/account-repository.js";
import type { DelivererRepository } from "../../repositories/deliverer-repository.js";
import { AccountCreatorService } from "../../services/account-creator.js";
import type { HasherGenerator } from "../../services/hasher-generator.js";
import { UniqueEntityId } from "@/domain/core/unique-entity-id.js";
import { ensureExists } from "@/domain/core/guards/ensure-exist.js";
import { AdministratorCreationPolicy } from "../../policies/admin/administrator-creation-policy.js";

interface Repositories {
    accountRepository: AccountRepository;
    delivererRepository: DelivererRepository;
}
interface Services {
    hasherGenerator: HasherGenerator;
}
interface AccountUseCaseDeps {
    repositories: Repositories;
    services: Services;
}

export interface CreateDelivererUseCaseInput {
    cpf: string;
    password: string;
    name: string;
    phone: string
    actorId: string
}
export interface CreateDelivererUseCaseResponse {
    account: Account;
    deliverer: Deliverer;
}
export class CreateDelivererUseCase {
    private accountRepository: AccountRepository;
    private delivererRepository: DelivererRepository;
    private hasherGenerator: HasherGenerator;
    private accountCreatorService: AccountCreatorService;

    constructor(deps: AccountUseCaseDeps) {
        this.accountRepository = deps.repositories.accountRepository;
        this.hasherGenerator = deps.services.hasherGenerator;
        this.delivererRepository = deps.repositories.delivererRepository;
        this.accountCreatorService = new AccountCreatorService(
            this.accountRepository,
            this.hasherGenerator,
        );
    }

    async execute(
        input: CreateDelivererUseCaseInput,
    ): Promise<CreateDelivererUseCaseResponse> {
        const actorId = UniqueEntityId.rehydrate(input.actorId);
        const actorAccount = await this.accountRepository.findById(actorId);

        ensureExists(actorAccount, "Account");
        AdministratorCreationPolicy.assertCanCreate(actorAccount);

        const account = await this.accountCreatorService.create({
            user: input,
            permissions: PermissionPresets.deliverer,
        });

        const deliverer = Deliverer.create({
            accountId: account.id,
            schedule: ScheduleValueObject.businessDays(),
            availability: AvailabilityValueObject.available(),
        });

        await this.delivererRepository.create(deliverer);

        return {
            account,
            deliverer: deliverer,
        };
    }
}
