import type { WeekDay } from "../enum/week-day.js";
import { WeeklyPreset } from "../presets/weekly-preset.js";

interface ScheduleProps {
    days: WeekDay[];
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
            days: WeeklyPreset.BUSINESS_DAYS
        })
    }


    static allDays(): ScheduleValueObject {
        return new ScheduleValueObject({
            days: WeeklyPreset.ALL_DAYS
        })
    }

    get days(): WeekDay[] {
        return [...this.props.days];
    }

    worksOn(day: WeekDay): boolean {
        return this.props.days.includes(day);
    }
}