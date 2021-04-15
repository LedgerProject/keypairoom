import { zencode_exec } from "zenroom";
import { UserChallenges } from "./model/userChallenges";
import {
  readJSONFromFile,
  readStringFromFile,
} from "./service/fileService";
import * as dotenv from "dotenv";

const DEFAULT_CLIENT_SIDE_CONTRACT =__dirname+"/zencode/Keypair-Creation-Client-Side.zen";
const REGULAR_EXPRESSION: RegExp = /\W/gi;
const EMPTY_STRING: string = "";
const DEFAULT_USER: string = "user";
const DEFAULT_LOCALE = "en_GB";

export const getSafetyQuestions = (userLocale: string) => {
  dotenv.config();
  const locale = userLocale ? userLocale : DEFAULT_LOCALE;
  const propertiesFileName =
    process.env.QUESTION_FOLDER! +
    process.env.QUESTION_FILE_PREPEND! +
    locale +
    ".json";
  const defaultPropertiesFileName = __dirname+"/props/questions-en_GB.json";
  return readJSONFromFile(propertiesFileName, defaultPropertiesFileName);
};

export const sanitizeAnswers = (answers: any) => {
  for (const key in answers) {
    if (answers[key]) {
      answers[key] = answers[key]
        .replace(REGULAR_EXPRESSION, EMPTY_STRING)
        .toLowerCase();
    }
  }
  return answers;
};

export async function recoveryKeypair(
  answers: UserChallenges,
  PBKDF: string,
  username: string
) {
  dotenv.config();
  const CLIENT_SIDE_CONTRACT = readStringFromFile(process.env.CLIENT_SIDE_CONTRACT!, DEFAULT_CLIENT_SIDE_CONTRACT);
  const user = username ? username : DEFAULT_USER;

  const keys: any = {
    userChallenges: answers,
    username: user,
    key_derivation: PBKDF,
  };
  const data: any = {};

  const execution: any = await zencode_exec(CLIENT_SIDE_CONTRACT, {
    data: JSON.stringify(data),
    keys: JSON.stringify(keys),
  });

  return JSON.parse(execution.result);
}

export async function verifyAnswers(
  answers: UserChallenges,
  PBKDF: string,
  username: string,
  userPublicKey: string
) {
  const execution = await recoveryKeypair(answers, PBKDF, username);

  return userPublicKey === execution[username].keypair.public_key;
}
