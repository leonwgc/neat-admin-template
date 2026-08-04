/**
 * @file src/utils/createFetchOnce.ts
 * @author leon.wang
 */

/**
 * Wrap an async request function so concurrent calls share the same in-flight promise.
 * The next call after settlement will create a new request.
 */
const createFetchOnce = <TArgs extends unknown[], TResult>(
  request: (...args: TArgs) => Promise<TResult>,
) => {
  let pendingRequest: Promise<TResult> | null = null;

  return (...args: TArgs): Promise<TResult> => {
    if (!pendingRequest) {
      pendingRequest = request(...args);
      pendingRequest.finally(() => {
        pendingRequest = null;
      });
    }

    return pendingRequest;
  };
};

export default createFetchOnce;
