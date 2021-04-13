import { sanitizeAnswers } from '../clientSide';
test('sanitizeAnswers: remove space', () => {
  const answers = {
    question1: 'P aris',
    question2: 'ScoobyDoo',
    question3: 'Amsterdam',
    question4: 'null',
    question5: 'null',
  };

  const expectedAnswers = {
    question1: 'paris',
    question2: 'scoobydoo',
    question3: 'amsterdam',
    question4: 'null',
    question5: 'null',
  };

  expect(sanitizeAnswers(answers)).toStrictEqual(expectedAnswers);
});
test('sanitizeAnswers: remove apostrophe', () => {
  const answers = {
    question1: "L'Aquila",
    question2: 'ScoobyDoo',
    question3: 'Amsterdam',
    question4: 'null',
    question5: 'null',
  };

  const expectedAnswers = {
    question1: 'laquila',
    question2: 'scoobydoo',
    question3: 'amsterdam',
    question4: 'null',
    question5: 'null',
  };

  expect(sanitizeAnswers(answers)).toStrictEqual(expectedAnswers);
});

test('sanitizeAnswers: multiple answers', () => {
  const answers = {
    question1: "L'Aquila",
    question2: 'C arl',
    question3: '88 ggg',
    question4: 'null',
    question5: 'null',
  };

  const expectedAnswers = {
    question1: 'laquila',
    question2: 'carl',
    question3: '88ggg',
    question4: 'null',
    question5: 'null',
  };

  expect(sanitizeAnswers(answers)).toStrictEqual(expectedAnswers);
});
