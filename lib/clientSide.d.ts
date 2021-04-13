import { UserChallenges } from './model/userChallenges';
export declare const getSafetyQuestions: (userLocale: string) => any;
export declare const sanitizeAnswers: (answers: any) => any;
export declare function recoveryKeypair(answers: UserChallenges, PBKDF: string, username: string): Promise<any>;
export declare function verifyAnswers(answers: UserChallenges, PBKDF: string, username: string, userPublicKey: string): Promise<boolean>;
