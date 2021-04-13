import { getSafetyQuestions } from "../clientSide";
test("getSafetyQuestions : pick default language", () => {
  expect(getSafetyQuestions("ccd")).toStrictEqual({
    question1: "Where my parents met?",
    question2: "What is the name of your first pet?",
    question3: "What is your home town?",
    question4: "What is the name of your first teacher?",
    question5: "What is the surname of your mother before wedding?",
  });
});
test("getSafetyQuestions : pick italian language", () => {
  expect(getSafetyQuestions("it_IT")).toStrictEqual({
    question1: "Dove si sono incontrati i tuoi genitori?",
    question2: "Quale è il nome del tuo primo animale domestico?",
    question3: "Quale è la tua citta' natale??",
    question4: "Quale è il nome del tuo primo insegnante?",
    question5: "Quale è il cognome di tua madre prima del matrimonio?",
  });
});
