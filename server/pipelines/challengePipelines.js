function matchSolvedStatus(field, status) {
  if (status === 'solved') return { [field]: true };
  if (status === 'unsolved') return { [field]: false };
  return {};
}

function matchFilters({ title, difficulty, name }, prefix = '') {
  return {
    ...(title && { [`${prefix}title`]: { $regex: title, $options: 'i' } }),
    ...(difficulty && { [`${prefix}difficulty`]: difficulty }),
    ...(name && { [`${prefix}user.username`]: { $regex: name, $options: 'i' } }),
  };
}

function lookupUser() {
  return [
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' }
  ];
}

function lookupCreator() {
  return [
    {
      $lookup: {
        from: 'users',
        localField: 'challenge.userId',
        foreignField: '_id',
        as: 'creator'
      }
    },
    { $unwind: '$creator' }
  ];
}
function lookupChallenge() {
  return [
    {
      $lookup: {
        from: 'challenges',
        localField: 'challengeId',
        foreignField: '_id',
        as: 'challenge'
      }
    },
    { $unwind: '$challenge' }
  ];
}

function lookupSolved(userIdObj) {
  return [
    {
      $lookup: {
        from: 'solvedChallenges',
        let: { challengeId: '$_id', userId: userIdObj },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$challengeId', '$$challengeId'] },
                  { $eq: ['$userId', '$$userId'] }
                ]
              }
            }
          }
        ],
        as: 'solved'
      }
    },
    {
      $addFields: {
        solved: { $gt: [{ $size: '$solved' }, 0] }
      }
    }
  ];
}

function projectChallenge() {
  return {
    $project: {
      title: 1,
      description: 1,
      difficulty: 1,
      solution: 1,
      username: '$user.username',
      solved: 1,
      timesSolved: 1,
      date: 1
    }
  };
}

module.exports = {
  matchSolvedStatus,
  matchFilters,
  lookupUser,
  lookupCreator,
  lookupChallenge,
  lookupSolved,
  projectChallenge
};

