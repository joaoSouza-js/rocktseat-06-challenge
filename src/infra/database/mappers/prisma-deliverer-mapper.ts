import { UniqueEntityId } from "@/domain/core/unique-entity-id";
import { Deliverer } from "@/domain/enterprise/entities/deliverer/deliverer-entity";
import { WeekDay } from "@/domain/enterprise/entities/deliverer/enum/week-day";
import {
    Availability,
    AvailabilityValueObject,
} from "@/domain/enterprise/entities/deliverer/value-objects/availability";
import { ScheduleValueObject } from "@/domain/enterprise/entities/deliverer/value-objects/schedule";
import { $Enums, Prisma } from "@/generated/prisma/browser";


type DelivererModel = Prisma.DelivererGetPayload<{
    include: {
        schedules: true;
    };
}>;

type DelivererScheduleModel =
    Prisma.DelivererScheduleCreateWithoutDelivererInput;


export class PrismaDelivererMapper {

    static toDomain(deliverer: DelivererModel): Deliverer {

        const schedule = ScheduleValueObject.rehydrate({
            days: deliverer.schedules.map((schedule) => ({
                day: WeekDay[schedule.day],
                shiftStart: schedule.shiftStart,
                shiftEnd: schedule.shiftEnd,
            })),
        });

        const delivererId = UniqueEntityId.rehydrate(deliverer.id);
        const accountId = UniqueEntityId.rehydrate(deliverer.accountId);

        const availability =
            AvailabilityValueObject.rehydrate(
                Availability[deliverer.availability]
            );

        return Deliverer.rehydrate(
            {
                accountId,
                schedule,
                availability,
            },
            delivererId
        );
    }


    static toPrisma(deliverer: Deliverer): Prisma.DelivererCreateInput {

        const schedules: DelivererScheduleModel[] = deliverer.schedule.days.map((day) => ({
            day: $Enums.ScheduleDay[day.day],
            shiftStart: day.shiftStart,
            shiftEnd: day.shiftEnd,
        }));

        const prismaCreateInput: Prisma.DelivererCreateInput = {
            account: {
                connect: {
                    id: deliverer.accountId.toString(),
                },
            },

            availability:
                $Enums.Availability[deliverer.availability.current],

            schedules: {
                create: schedules,
            },
        };

        return prismaCreateInput
    }
}