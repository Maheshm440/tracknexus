'use client';

import { useState, useCallback } from 'react';
import {
  getStartOfDay,
  getEndOfDay,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfYear,
  getEndOfYear,
  subtractDays,
} from '@/lib/utils/date-formatter';

export interface DateRange {
  from: Date;
  to: Date;
}

export interface UseDateRangeOptions {
  initialRange?: DateRange;
}

/**
 * Hook for managing date ranges in the CRM dashboard
 */
export function useDateRange(options?: UseDateRangeOptions) {
  const defaultRange: DateRange = options?.initialRange || {
    from: subtractDays(new Date(), 30),
    to: new Date(),
  };

  const [dateRange, setDateRange] = useState<DateRange>(defaultRange);

  /**
   * Get today's date range
   */
  const getToday = useCallback(() => {
    const today = new Date();
    setDateRange({
      from: getStartOfDay(today),
      to: getEndOfDay(today),
    });
  }, []);

  /**
   * Get yesterday's date range
   */
  const getYesterday = useCallback(() => {
    const yesterday = subtractDays(new Date(), 1);
    setDateRange({
      from: getStartOfDay(yesterday),
      to: getEndOfDay(yesterday),
    });
  }, []);

  /**
   * Get this week's date range
   */
  const getThisWeek = useCallback(() => {
    const today = new Date();
    setDateRange({
      from: getStartOfWeek(today),
      to: getEndOfWeek(today),
    });
  }, []);

  /**
   * Get last week's date range
   */
  const getLastWeek = useCallback(() => {
    const lastWeekStart = subtractDays(new Date(), 14);
    setDateRange({
      from: getStartOfWeek(lastWeekStart),
      to: getEndOfWeek(lastWeekStart),
    });
  }, []);

  /**
   * Get this month's date range
   */
  const getThisMonth = useCallback(() => {
    const today = new Date();
    setDateRange({
      from: getStartOfMonth(today),
      to: getEndOfMonth(today),
    });
  }, []);

  /**
   * Get last month's date range
   */
  const getLastMonth = useCallback(() => {
    const lastMonth = subtractDays(new Date(), 30);
    setDateRange({
      from: getStartOfMonth(lastMonth),
      to: getEndOfMonth(lastMonth),
    });
  }, []);

  /**
   * Get this year's date range
   */
  const getThisYear = useCallback(() => {
    const today = new Date();
    setDateRange({
      from: getStartOfYear(today),
      to: getEndOfYear(today),
    });
  }, []);

  /**
   * Get last 7 days
   */
  const getLast7Days = useCallback(() => {
    const today = new Date();
    setDateRange({
      from: subtractDays(today, 7),
      to: today,
    });
  }, []);

  /**
   * Get last 30 days
   */
  const getLast30Days = useCallback(() => {
    const today = new Date();
    setDateRange({
      from: subtractDays(today, 30),
      to: today,
    });
  }, []);

  /**
   * Get last 90 days
   */
  const getLast90Days = useCallback(() => {
    const today = new Date();
    setDateRange({
      from: subtractDays(today, 90),
      to: today,
    });
  }, []);

  /**
   * Set custom date range
   */
  const setCustomRange = useCallback((from: Date, to: Date) => {
    setDateRange({ from, to });
  }, []);

  /**
   * Reset to default range (last 30 days)
   */
  const reset = useCallback(() => {
    setDateRange(defaultRange);
  }, [defaultRange]);

  return {
    dateRange,
    setDateRange,
    setCustomRange,
    getToday,
    getYesterday,
    getThisWeek,
    getLastWeek,
    getThisMonth,
    getLastMonth,
    getThisYear,
    getLast7Days,
    getLast30Days,
    getLast90Days,
    reset,
  };
}
