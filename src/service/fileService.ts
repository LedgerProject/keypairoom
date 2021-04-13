import * as fs from "fs";

export const fileExists = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
  return false;
};

export const readJSONFromFile = (filePath: string) => {
  return JSON.parse(readStringFromFile(filePath));
};

export const readStringFromFile = (filePath: string) => {
  return fs.readFileSync(filePath).toString();
};
