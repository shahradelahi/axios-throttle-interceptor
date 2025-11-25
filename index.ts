import { throttle } from '@se-oss/throttle';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

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
   Use a strict, more resource-intensive, throttling algorithm.
   The default algorithm uses a windowed approach that will work correctly in most cases,
   limiting the total number of calls at the specified limit per interval window.
   The strict algorithm throttles each call individually, ensuring the limit is not exceeded for any interval.

   @default false
   */
  readonly strict?: boolean;
  /**
   Abort pending executions. When aborted, all unresolved promises are rejected with `signal.reason`.
   */
  signal?: AbortSignal;

  /**
   Get notified when function calls are delayed due to exceeding the `limit` of allowed calls within the given `interval`.

   Can be useful for monitoring the throttling efficiency.
   */
  readonly onDelay?: (...arguments_: readonly any[]) => void;
  /**
   Calculate the weight/cost of each function call based on its arguments.

   The weight determines how much of the `limit` is consumed by each call.
   This is useful for rate limiting APIs that use point-based or cost-based limits,
   where different operations consume different amounts of the quota.

   By default, each call has a weight of `1`.
   */
  readonly weight?: (...arguments_: readonly any[]) => number;
}

/**
 Adds a throttling mechanism to an Axios instance by intercepting requests and
 applying rate-limiting rules. Useful for controlling the number of requests sent
 to a server over a specific time interval.

 @example
 import axios from 'axios';
 import axiosThrottle from 'axios-throttle-interceptor';

 const instance = axios.create();

 axiosThrottle(instance, {
   limit: 5,
   interval: 1000,
   onDelay: () => console.log('Request delayed due to throttling.')
 });

 instance.get('/example'); // The requests are now throttled.
 */
export function axiosThrottle(instance: AxiosInstance, options: AxiosThrottleOptions) {
  const throttled = throttle((config: InternalAxiosRequestConfig) => config, options);

  instance.interceptors.request.use(throttled);
}

export default axiosThrottle;
