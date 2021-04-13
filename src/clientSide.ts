import { zencode_exec } from 'zenroom';
import { UserChallenges } from './model/userChallenges';
import { fileExists, readJSONFromFile, readStringFromFile } from './service/fileService';

const clientSideContract = 'zencode/Keypair-Creation-Client-Side.zen';
const REGULAR_EXPRESSION: RegExp = /\W/gi;
const EMPTY_STRING: string = '';
const DEFAULT_USER: string = 'user';

export const getSafetyQuestions = (userLocale: string) => {
  const locale = userLocale ? userLocale : 'en_GB';
  const propertiesFileName = 'props/questions-' + locale + '.json';
  const defaultPropertiesFileName = 'props/questions-en_GB.json';
  let questions: any;
  if (fileExists(propertiesFileName)) {
    questions = readJSONFromFile(propertiesFileName);
  } else {
    questions = readJSONFromFile(defaultPropertiesFileName);
  }
  return questions;
};

export const sanitizeAnswers = (answers: any) => {
  for (const key in answers) {
    if (answers[key]) {
      answers[key] = answers[key].replace(REGULAR_EXPRESSION, EMPTY_STRING).toLowerCase();
    }
  }
  return answers;
};

export async function recoveryKeypair(answers: UserChallenges, PBKDF: string, username: string) {
  const CLIENT_SIDE_CONTRACT = readStringFromFile(clientSideContract);
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

export async function verifyAnswers(answers: UserChallenges, PBKDF: string, username: string, userPublicKey: string) {
  const execution = await recoveryKeypair(answers, PBKDF, username);

  return userPublicKey === execution.user.keypair.public_key;
}
