import { getSafetyQuestions } from '../clientSide';
test('getSafetyQuestions : pick default language', () => {
  expect(getSafetyQuestions('ccd')).toStrictEqual({
    question1: 'Question one?',
    question2: 'Question two?',
    question3: 'Question three?',
    question4: 'Question four?',
    question5: 'Question five?',
  });
});
test('getSafetyQuestions : pick italian language', () => {
  expect(getSafetyQuestions('it_IT')).toStrictEqual({
    question1: 'Domanda uno?',
    question2: 'Domanda due?',
    question3: 'Domanda tre?',
    question4: 'Domanda quattro?',
    question5: 'Domanda cinque?',
  });
});
