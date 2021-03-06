import { getSafetyQuestions } from "../clientSide";
test("getSafetyQuestions : pick default language", () => {
  expect(getSafetyQuestions("en_GB")).toStrictEqual({
    question1: "Where my parents met?",
    question2: "What is the name of your first pet?",
    question3: "What is your home town?",
    question4: "What is the name of your first teacher?",
    question5: "What is the surname of your mother before wedding?",
  });
});
