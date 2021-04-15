import * as fs from "fs";

export const readJSONFromFile = (filePath: string, defaultFilePath:string) => {
  return JSON.parse(readStringFromFile(filePath, defaultFilePath));
};

export const readStringFromFile = (filePath: string, defaultFilePath:string) => {
  try {
    return fs.readFileSync(filePath).toString();
  } catch (err) {
    return fs.readFileSync(defaultFilePath).toString();
  }
};