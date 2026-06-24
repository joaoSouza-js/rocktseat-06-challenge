import { describe, expect, it } from "vitest";
import { WeekDay } from "../enum/week-day.js";
import { ScheduleValueObject } from "./schedule.js";

describe("ScheduleValueObject", () => {
    it("should create a schedule with valid days", () => {
        const schedule = ScheduleValueObject.create({
            days: [WeekDay.MONDAY, WeekDay.TUESDAY],
        });

        expect(schedule.days).toEqual([WeekDay.MONDAY, WeekDay.TUESDAY]);
    });

    it("should throw if no days are provided", () => {
        expect(() => {
            ScheduleValueObject.create({
                days: [],
            });
        }).toThrow("Schedule must contain at least one day");
    });

    it("should return true when works on a given day", () => {
        const schedule = ScheduleValueObject.create({
            days: [WeekDay.MONDAY, WeekDay.WEDNESDAY, WeekDay.FRIDAY],
        });

        expect(schedule.worksOn(WeekDay.MONDAY)).toBe(true);
        expect(schedule.worksOn(WeekDay.WEDNESDAY)).toBe(true);
        expect(schedule.worksOn(WeekDay.FRIDAY)).toBe(true);
    });

    it("should return false when does not work on a given day", () => {
        const schedule = ScheduleValueObject.create({
            days: [WeekDay.MONDAY, WeekDay.TUESDAY],
        });

        expect(schedule.worksOn(WeekDay.SATURDAY)).toBe(false);
        expect(schedule.worksOn(WeekDay.SUNDAY)).toBe(false);
    });

    it("should return a copy of days array (immutability check)", () => {
        const schedule = ScheduleValueObject.create({
            days: [WeekDay.MONDAY, WeekDay.TUESDAY],
        });

        const days = schedule.days;

        days.push(WeekDay.SUNDAY);

        expect(schedule.days).toEqual([WeekDay.MONDAY, WeekDay.TUESDAY]);
    });
});
