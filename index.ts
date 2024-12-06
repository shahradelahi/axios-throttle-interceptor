import type { AxiosInstance } from 'axios';
import pThrottle from 'p-throttle';

export interface AxiosThrottleOptions {
  /**
   The maximum number of calls within an `interval`.
   */
  readonly limit: number;
  /**
   The timespan for `limit` in milliseconds.
   */
  readonly interval: number;
  /**
   Abort pending executions. When aborted, all unresolved promises are rejected with `signal.reason`.
   */
  signal?: AbortSignal;

  /**
   Get notified when function calls are delayed due to exceeding the `limit` of allowed calls within the given `interval`.

   Can be useful for monitoring the throttling efficiency.
   */
  readonly onDelay?: (...arguments_: readonly any[]) => void;
}

/**
 *  Adds a throttling mechanism to an Axios instance by intercepting requests and
 *  applying rate-limiting rules. Useful for controlling the number of requests sent
 *  to a server over a specific time interval.
 *
 *  @example
 *  import axios from 'axios';
 *  import axiosThrottle from 'axios-throttle-interceptor';
 *
 *  const instance = axios.create();
 *
 *  axiosThrottle(instance, {
 *    limit: 5,
 *    interval: 1000,
 *    onDelay: () => console.log('Request delayed due to throttling.')
 *  });
 *
 *  instance.get('/example'); // The requests are now throttled.
 */
export function axiosThrottle(instance: AxiosInstance, options: AxiosThrottleOptions) {
  const throttle = pThrottle(options);

  const throttled = throttle((config: any) => config);

  instance.interceptors.request.use(throttled);
}

export default axiosThrottle;
