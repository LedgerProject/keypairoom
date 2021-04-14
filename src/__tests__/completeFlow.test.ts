import { createPBKDF } from "../serverSide";
import {
  getSafetyQuestions,
  recoveryKeypair,
  verifyAnswers,
} from "../clientSide";
/*
  Here we will test a complete flow
  1. We will create on serverside a PBKDF for a specific user
  2. We will ask for questions in user locale (it_IT)
  3. We will create a keyPair first time
  4. We will verify that answering to 5/5 questions we obtain same public key
  5. We will verify that answering to 5/5 questions we don't obtain same public key

*/

test("completeFlow", async () => {
  //1. We will create on serverside a PBKDF for a specific user
  const userData = {
    email: "john@doe.com",
  };

  const data = await createPBKDF(userData);

  expect(data).toStrictEqual({
    key_derivation: "fRODgLOSb2+VMeB3k3IDbGNZxQ==",
  });

  const PBKDF = data.key_derivation;

  //2. We will ask for questions in user locale (it_IT)
  expect(getSafetyQuestions("en_GB")).toStrictEqual({
    question1: "Where my parents met?",
    question2: "What is the name of your first pet?",
    question3: "What is your home town?",
    question4: "What is the name of your first teacher?",
    question5: "What is the surname of your mother before wedding?",
  });

  const answers = {
    question1: "Parigi",
    question2: "ScoobyDoo",
    question3: "Amsterdam",
    question4: "Mrs Doubtfire",
    question5: "Gervasoni",
  };

  //3. We will create a keyPair first time
  const username = "user";

  const createdKeypair = await recoveryKeypair(answers, PBKDF, username);

  expect(createdKeypair).toStrictEqual({
    hashedAnswers: {
      "question1.hash": "c4kZLBh0JP7qLZ6SctCbbAwtxCJ0DCf1UqP7lBxjCxE=",
      "question2.hash": "2hauYmg/8TGnG5IeCTzlFKHvw1XpxbKaMdmEUbUNQ2c=",
      "question3.hash": "ABPAH+DQlCCbi9PSO4+W26vNAd3SoDnuuoLRiRrPDWE=",
      "question4.hash": "fIPY5zX5Yh8Y3xXyaosWSsNiGoPLigqrm06azAxY+FA=",
      "question5.hash": "daJd/6yRxfPtiQU+WgM6fbP6hreZi2NeksbkOy02aXo=",
    },
    user: {
      keypair: {
        private_key: "+fl3suk5vtnqOJ4nEQYbEfufjvDlIYHs5KET8sVUHlA=",
        public_key:
          "BJaPU1BELpo1TE/aUd/MUdx/dD8/Ew7KjodqplCaCaip7lz5dPKXHgATKkIVEH37BYhJHAVAatzyMmf8R6vdgvo=",
      },
    },
  });
  const publicKey = createdKeypair.user.keypair.public_key;

  //5. We will verify that answering to 5/5 questions we obtain same public key
  const allAnswers = {
    question1: "Parigi",
    question2: "ScoobyDoo",
    question3: "Amsterdam",
    question4: "Mrs Doubtfire",
    question5: "Gervasoni",
  };

  const allAnswersData = await verifyAnswers(
    allAnswers,
    PBKDF,
    username,
    publicKey
  );

  expect(allAnswersData).toStrictEqual(true);

  //6. We will verify that answering to 5/5 questions with 1 wrong we don't obtain same public key
  const allAnswersOneWrong = {
    question1: "Parigi",
    question2: "ScoobyDoo",
    question3: "Amsterdam",
    question4: "Miss Doubtfire",
    question5: "Gervasoni",
  };

  const allAnswersOneWrongData = await verifyAnswers(
    allAnswersOneWrong,
    PBKDF,
    username,
    publicKey
  );

  expect(allAnswersOneWrongData).toStrictEqual(false);
});
