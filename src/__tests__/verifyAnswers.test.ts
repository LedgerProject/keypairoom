import { verifyAnswers } from "../clientSide";
test("verifyAnswers : verify correct answers", async () => {
  const answers = {
    question1: "Paris",
    question2: "ScoobyDoo",
    question3: "Amsterdam",
    question4: "null",
    question5: "null",
  };
  const PBKDF = "qf3skXnPGFMrE28UJS7S8BdT8g==";
  const publicKey =
    "BDYfET6GOWSTizMYIRfcthw2MKksTpg+f8LR0ndq6fRxOLfhT7d1IjvwkvV0LzlzHuGat8SF9unNwhA3alpQ8So=";
  const username = "user";

  const data = await verifyAnswers(answers, PBKDF, username, publicKey);

  expect(data).toStrictEqual(true);
});

test("verifyAnswers : verify wrong answers", async () => {
  const answers = {
    question1: "Parigi",
    question2: "ScoobyDoo",
    question3: "Amsterdam",
    question4: "null",
    question5: "null",
  };
  const PBKDF = "qf3skXnPGFMrE28UJS7S8BdT8g==";
  const publicKey =
    "BDYfET6GOWSTizMYIRfcthw2MKksTpg+f8LR0ndq6fRxOLfhT7d1IjvwkvV0LzlzHuGat8SF9unNwhA3alpQ8So=";
  const username = "user";

  const data = await verifyAnswers(answers, PBKDF, username, publicKey);

  expect(data).toStrictEqual(false);
});
