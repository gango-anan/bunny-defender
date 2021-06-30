import LeaderBoard from '../src/scenes/LeaderBoard';

const leaderBoard = new LeaderBoard();

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

  leaderBoard.sortData(unSortedScores);
  expect(unSortedScores).toEqual(sortedScores);
});