import { recoveryKeypair } from "../clientSide";
test("recoveryKeypair : pass Andrea userData", async () => {
  const answers = {
    question1: "Paris",
    question2: "ScoobyDoo",
    question3: "Amsterdam",
    question4: "null",
    question5: "null",
  };
  const PBKDF = "qf3skXnPGFMrE28UJS7S8BdT8g==";
  const username = "user";

  const data = await recoveryKeypair(answers, PBKDF, username);

  expect(data).toStrictEqual({
    hashedAnswers: {
      "question1.hash": "XdJytPMWt3anuOPQiUs34eQr49XTsgS4pYNsxQWXprE=",
      "question2.hash": "2hauYmg/8TGnG5IeCTzlFKHvw1XpxbKaMdmEUbUNQ2c=",
      "question3.hash": "ABPAH+DQlCCbi9PSO4+W26vNAd3SoDnuuoLRiRrPDWE=",
      "question4.hash": "dCNOmK/nSY+12vHzasLXiswzlGT5UHA7jAGYkvmCuQs=",
      "question5.hash": "dCNOmK/nSY+12vHzasLXiswzlGT5UHA7jAGYkvmCuQs=",
    },
    user: {
      keypair: {
        private_key: "VUVdIyPeC+x3o66b+n06Jxc4c3p9TBFfaSiaEPx5FmI=",
        public_key:
          "BDYfET6GOWSTizMYIRfcthw2MKksTpg+f8LR0ndq6fRxOLfhT7d1IjvwkvV0LzlzHuGat8SF9unNwhA3alpQ8So=",
      },
    },
  });
});
