import axios from 'axios';
import { describe, expect, it } from 'vitest';

import { axiosThrottle } from './index';

const inRange = (value: number, range: { start: number; end: number }): boolean => {
  return value >= range.start && value <= range.end;
};

const timeSpan = () => {
  const start = Date.now();
  return () => Date.now() - start;
};

describe('axiosThrottle', () => {
  it('should throttle requests', async () => {
    const instance = axios.create();
    const totalRuns = 10;
    const limit = 2;
    const interval = 1000;

    axiosThrottle(instance, { limit, interval });

    const end = timeSpan();
    const promises = Array.from({ length: totalRuns }, () =>
      instance.get('https://httpbin.org/get')
    );

    await Promise.all(promises);

    const totalTime = (totalRuns * interval) / limit;
    expect(
      inRange(end(), {
        start: totalTime - interval - 500,
        end: totalTime + interval + 1000,
      })
    ).toBe(true);
  });
});
