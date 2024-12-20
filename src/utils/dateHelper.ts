import { TIMEZONE } from "@/constant";
import { DateTime } from "luxon";

const today = DateTime.now().setZone(TIMEZONE); // Get the current date in the specified time zone

export const predefinedRanges = {
  today: { from: today.startOf("day"), to: today.endOf("day") },
  thisWeek: { from: today.startOf("week"), to: today.endOf("day") },
  thisMonth: { from: today.startOf("month"), to: today.endOf("day") },
  lastMonth: {
    from: today.minus({ months: 1 }).startOf("month"),
    to: today.minus({ months: 1 }).endOf("day"),
  },
};
