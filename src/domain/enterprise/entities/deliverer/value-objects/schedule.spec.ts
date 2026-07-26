import { describe, expect, it } from "vitest";

import { ScheduleValueObject } from "./schedule.js";
import { WeekDay } from "../enum/week-day.js";

describe("ScheduleValueObject", () => {
    it("should create a schedule with valid days", () => {
        const schedule = ScheduleValueObject.create({
            days: [
                {
                    day: WeekDay.MONDAY,
                    shiftStart: 480,
                    shiftEnd: 1080,
                },
                {
                    day: WeekDay.TUESDAY,
                    shiftStart: 540,
                    shiftEnd: 1020,
                },
            ],
        });

        expect(schedule.days).toEqual([
            {
                day: WeekDay.MONDAY,
                shiftStart: 480,
                shiftEnd: 1080,
            },
            {
                day: WeekDay.TUESDAY,
                shiftStart: 540,
                shiftEnd: 1020,
            },
        ]);
    });

    it("should throw if no days are provided", () => {
        expect(() =>
            ScheduleValueObject.create({
                days: [],
            }),
        ).toThrow("Schedule must contain at least one day");
    });

    it("should return true when works on a given day", () => {
        const schedule = ScheduleValueObject.create({
            days: [
                {
                    day: WeekDay.MONDAY,
                    shiftStart: 480,
                    shiftEnd: 1080,
                },
                {
                    day: WeekDay.WEDNESDAY,
                    shiftStart: 480,
                    shiftEnd: 1080,
                },
            ],
        });

        expect(schedule.worksOn(WeekDay.MONDAY)).toBe(true);
        expect(schedule.worksOn(WeekDay.WEDNESDAY)).toBe(true);
    });

    it("should return false when does not work on a given day", () => {
        const schedule = ScheduleValueObject.create({
            days: [
                {
                    day: WeekDay.MONDAY,
                    shiftStart: 480,
                    shiftEnd: 1080,
                },
            ],
        });

        expect(schedule.worksOn(WeekDay.SUNDAY)).toBe(false);
    });

    it("should return schedule information for a given day", () => {
        const schedule = ScheduleValueObject.create({
            days: [
                {
                    day: WeekDay.MONDAY,
                    shiftStart: 480,
                    shiftEnd: 1080,
                },
            ],
        });

        expect(schedule.getDay(WeekDay.MONDAY)).toEqual({
            day: WeekDay.MONDAY,
            shiftStart: 480,
            shiftEnd: 1080,
        });
    });

    it("should return undefined when day does not exist", () => {
        const schedule = ScheduleValueObject.create({
            days: [
                {
                    day: WeekDay.MONDAY,
                    shiftStart: 480,
                    shiftEnd: 1080,
                },
            ],
        });

        expect(schedule.getDay(WeekDay.SUNDAY)).toBeUndefined();
    });

    it("should create a business days schedule", () => {
        const schedule = ScheduleValueObject.businessDays();

        expect(schedule.days).toHaveLength(5);

        expect(schedule.worksOn(WeekDay.MONDAY)).toBe(true);
        expect(schedule.worksOn(WeekDay.FRIDAY)).toBe(true);
        expect(schedule.worksOn(WeekDay.SATURDAY)).toBe(false);
        expect(schedule.worksOn(WeekDay.SUNDAY)).toBe(false);
    });

    it("should preserve shift times for business days", () => {
        const schedule = ScheduleValueObject.businessDays();

        expect(schedule.getDay(WeekDay.MONDAY)).toEqual({
            day: WeekDay.MONDAY,
            shiftStart: 480,
            shiftEnd: 1080,
        });
    });

    it("should return a copy of days array", () => {
        const schedule = ScheduleValueObject.create({
            days: [
                {
                    day: WeekDay.MONDAY,
                    shiftStart: 480,
                    shiftEnd: 1080,
                },
            ],
        });

        const days = schedule.days;

        days.push({
            day: WeekDay.SUNDAY,
            shiftStart: 0,
            shiftEnd: 0,
        });

        expect(schedule.days).toHaveLength(1);
    });
});