// JSONHandler.ts
export const safeStringify = (obj: any, indent = 2): string => {
  let cache: any[] = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          return;
        }
        cache.push(value);
      }
      return value;
    },
    indent
  );
  cache = null as any; // Enable garbage collection
  return retVal;
};

export const getSimplifiedRequest = (userReq: any): any => {

  const simplifiedRequest = {
    url: userReq.url,
    method: userReq.method,
    statusCode: userReq.statusCode,
    params: userReq.params,
    query: userReq.query,
    baseUrl: userReq.baseUrl,
    originalUrl: userReq.originalUrl,
    body: userReq['parsedBody']
  };

  return simplifiedRequest;
};
