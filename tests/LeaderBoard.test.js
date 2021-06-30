import LeaderBoard from '../src/scenes/LeaderBoard';

test('should sort the scores in ascending order', () => {
  const unSortedScores = [
    { user: 'Galiwango', score: 25 },
    { user: 'Ananiya', score: 75 },
    { user: 'Gango', score: 100 },
    { user: 'Anan', score: 50 },
  ];

  const sortedScores = [
    { user: 'Gango', score: 100 },
    { user: 'Ananiya', score: 75 },
    { user: 'Anan', score: 50 },
    { user: 'Galiwango', score: 25 },
  ];

  expect(unSortedScores).not.toEqual(sortedScores);

  LeaderBoard.sortData(unSortedScores);
  expect(unSortedScores).toEqual(sortedScores);
});