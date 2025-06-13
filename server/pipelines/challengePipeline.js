function matchFilters({ title, difficulty, name, solved }, prefixMap = {}) {
  const solvedBool = solved === 'solved' ? true : solved === 'unsolved' ? false : undefined;

  return {
    ...(title && { [prefixMap.title || 'title']: { $regex: title, $options: 'i' } }),
    ...(difficulty && { [prefixMap.difficulty || 'difficulty']: difficulty }),
    ...(name && { [prefixMap.name || 'username']: { $regex: name, $options: 'i' } }),
    ...(solvedBool !== undefined && { solved: solvedBool }),
  };
}
exports.challenges = (userIdObj, skip, limit) => {
    return [
        { $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
        }},
        { $unwind: '$user' },
        { $lookup: {
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
    { $addFields: {
        solved: { $gt: [{ $size: '$solved' }, 0] }
      }
    },
    { $skip: skip},
    { $limit: limit},
    { $project: {
      title: 1,
      description: 1,
      difficulty: 1,
      solution: 1,
      username: '$user.username',
      solved: 1,
      timesSolved: 1,
      date: 1
    }}]
}

exports.createdChallengesByName = (userIdObj, username, skip, limit) => {
    return [
    { $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
    }},
    { $unwind: '$user' },
    { $match: { 'user.username': username } },
    { $lookup: {
        from: 'solvedChallenges',
        let: { challengeId: '$challengeId' },
        pipeline: [
        { $match: {
            $expr: {
                $and: [
                    { $eq: ['$challengeId', '$$challengeId'] },
                    { $eq: ['$userId', userIdObj] }
                ]
            }
        }}
        ],
        as: 'solved'
    }},
    { $addFields: {
        solved: { $gt: [{ $size: '$solved' }, 0] }
    }},
    { $skip: skip},
    { $limit: limit},
    { $project: {
      title: 1,
      description: 1,
      difficulty: 1,
      solution: 1,
      username: '$user.username',
      solved: 1,
      timesSolved: 1,
      date: 1
    }}]
}

exports.solvedChallengesByUserName = (userIdObj, username, skip, limit) => {
    return [
        { $lookup: {
            from: 'challenges',
            localField: 'challengeId',
            foreignField: '_id',
            as: 'challenge'
        }},
        { $unwind: '$challenge' },
        { $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
        }},
        { $unwind: '$user' },
        { $match: { 'user.username': username } },
        { $lookup: {
            from: 'solvedChallenges',
            let: { challengeId: '$challengeId' },
            pipeline: [
            { $match: {
                $expr: {
                    $and: [
                        { $eq: ['$challengeId', '$$challengeId'] },
                        { $eq: ['$userId', userIdObj] }
                    ]
                }
            }}
            ],
            as: 'solved'
        }},
        { $addFields: {
            solved: { $gt: [{ $size: '$solved' }, 0] }
        }},
        { $lookup: {
            from: 'users',
            localField: 'challenge.userId',
            foreignField: '_id',
            as: 'creator'
        }},
        { $unwind: '$creator' },
        { $skip: skip},
        { $limit: limit},
        { $project: {
            _id: '$challenge._id',
            title: '$challenge.title',
            description: '$challenge.description',
            difficulty: '$challenge.difficulty',
            solution: '$challenge.solution',
            username: '$creator.username',
            solved: 1,
            timesSolved: '$challenge.timesSolved',
            date: '$challenge.date'
        }}
    ];
};


