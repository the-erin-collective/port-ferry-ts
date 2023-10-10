import * as FileHandler from './FileHandler';
import * as DateHelper from './DateHelper';
import * as JSONHandler from './JSONHandler';

export const handleProxyError = (err: Error, config: any, userReq: any) => {

  const stringData = JSONHandler.safeStringify(JSONHandler.getSimplifiedRequest(userReq));
  const currentDateTime = DateHelper.getCurrentDateTime();

  const logMessage = `[${currentDateTime}] Proxy error: ${err.message}`;

  console.log(`${logMessage}\n${stringData}`);

  FileHandler.writeToFile(`${logMessage}\n`, config.internalErrorLogs);
};