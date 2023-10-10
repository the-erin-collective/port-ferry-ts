import * as fs from 'fs';

export const writeToFile = (data: string, fileName: string) => {
  fs.appendFileSync(fileName, data);
};

export const readJSONFileSync = (filePath: string): any => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};