import * as FileHandler from './FileHandler';
import * as DateHelper from './DateHelper';
import * as JSONHandler from './JSONHandler';

export const handleStatusCode = (statusCode: number, userReq: any, config: any) => {
    if (config.statusCodesToLog.includes(statusCode)) {
      const currentDateTime = DateHelper.getCurrentDateTime();

      const stringData = JSONHandler.safeStringify(JSONHandler.getSimplifiedRequest(userReq));
      FileHandler.writeToFile(stringData, `${config.logFolder}${currentDateTime}_${statusCode}.req`);

      console.log(`[${currentDateTime}] Logged status code: ${statusCode}.\n${stringData}`);
    }
  };

