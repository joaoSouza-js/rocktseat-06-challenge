import { WeekDay } from "../enum/week-day.js";

interface ScheduleDayProps {
    day: WeekDay;
    shiftStart: number;
    shiftEnd: number;
}

interface ScheduleProps {
    days: ScheduleDayProps[];
}

export class ScheduleValueObject {
    private constructor(
        private readonly props: ScheduleProps,
    ) { }

    static create(props: ScheduleProps): ScheduleValueObject {
        if (props.days.length === 0) {
            throw new Error("Schedule must contain at least one day");
        }

        return new ScheduleValueObject(props);
    }

    static businessDays(): ScheduleValueObject {
        return new ScheduleValueObject({
            days: [
                {
                    day: WeekDay.MONDAY,
                    shiftStart: 480,
                    shiftEnd: 1080,
                },
                {
                    day: WeekDay.TUESDAY,
                    shiftStart: 480,
                    shiftEnd: 1080,
                },
                {
                    day: WeekDay.WEDNESDAY,
                    shiftStart: 480,
                    shiftEnd: 1080,
                },
                {
                    day: WeekDay.THURSDAY,
                    shiftStart: 480,
                    shiftEnd: 1080,
                },
                {
                    day: WeekDay.FRIDAY,
                    shiftStart: 480,
                    shiftEnd: 1080,
                },
            ],
        });
    }

    static rehydrate(props: ScheduleProps): ScheduleValueObject {
        return new ScheduleValueObject(props);
    }

    get days(): ScheduleDayProps[] {
        return [...this.props.days];
    }

    worksOn(day: WeekDay): boolean {
        return this.props.days.some(
            scheduleDay => scheduleDay.day === day
        );
    }

    getDay(day: WeekDay): ScheduleDayProps | undefined {
        return this.props.days.find(
            scheduleDay => scheduleDay.day === day
        );
    }
}