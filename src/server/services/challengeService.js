const { getDB } = require('../config/db');
const db = getDB();
const challengesCollection = db.collection('challenges');
const solvedChallengesCollection = db.collection('solvedChallenges');
const { convertToObjectId, getCurrentDate } = require('../utils/utils');

exports.getChallenges = async (userId, filters = {}) => {
  const userIdObj = convertToObjectId(userId);
  const { name, title, difficulty, solved } = filters;
  const solvedBool = solved === 'solved' ? true : solved === 'unsolved' ? false : undefined;
  try {
    const challenges = challengesCollection.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
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
      },

      {
        $match: {
          ...(title && { title: { $regex: title, $options: 'i' } }),
          ...(difficulty && { difficulty }),
          ...(name && { 'user.username': { $regex: name, $options: 'i' } }),
          ...(solvedBool !== undefined && { solved: solvedBool })
        }
      },

      {
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
      }
  ]).toArray();
      if (!challenges) {
        throw new Error();
      }
      return challenges;
    } catch (err) {
      throw err;
    }
};

exports.getCreatedChallengesByUserName = async (userId, username, filters = {}) => {
  const userIdObj = convertToObjectId(userId);
  const { title, difficulty, solved } = filters;
  const solvedBool = solved === 'solved' ? true : solved === 'unsolved' ? false : undefined;
  try {
    const challenges = await challengesCollection.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $match: { 'user.username': username }
      },
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
      },
      {
        $match: {
          ...(title && { title: { $regex: title, $options: 'i' } }),
          ...(difficulty && { difficulty }),
          ...(solvedBool !== undefined && { solved: solvedBool })
        }
      },
      {
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
      }
  ]).toArray();
    if (!challenges) {
      throw new Error();
    }
    return challenges;
  } catch (err) {
    throw err;
  }
};

exports.getSolvedChallengesByUserName = async (userId, username, filters = {}) => {
  const userIdObj = convertToObjectId(userId);
  const { name, title, difficulty, solved } = filters;
  const solvedBool = solved === 'solved' ? true : solved === 'unsolved' ? false : undefined;

  try {
    const challenges = await solvedChallengesCollection.aggregate([
      {
        $lookup: {
          from: 'challenges',
          localField: 'challengeId',
          foreignField: '_id',
          as: 'challenge'
        }
      },
      {
        $unwind: '$challenge'
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
      $match: {'user.username': username}
      },
      {
      $lookup: {
      from: 'solvedChallenges',
      let: { challengeId: '$challengeId' },
      pipeline: [
        {
        $match: {
          $expr: {
          $and: [
            { $eq: ['$challengeId', '$$challengeId']},
            { $eq: ['$userId', userIdObj]}
          ]
          }
        }
        }
      ],
      as: 'markSolved'
      }
      },
      {
        $addFields: {
        solved: { $gt: [{ $size: '$markSolved'}, 0] }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'challenge.userId',
          foreignField: '_id',
          as: 'creator'
        }
      },
      {
        $unwind: '$creator'
      },
      {
        $match: {
          ...(title && { title: { $regex: title, $options: 'i' } }),
          ...(difficulty && { 'challenge.difficulty': difficulty }),
          ...(name && { 'creator.username': { $regex: name, $options: 'i' } }),
          ...(solvedBool !== undefined && { solved: solvedBool })
        }
      },
      {
        $project: {
          _id: '$challenge._id',
          title: '$challenge.title',
          description: '$challenge.description',
          difficulty: '$challenge.difficulty',
          solution: '$challenge.solution',
          username: '$creator.username',
	        solved: '$solved',
          timesSolved: '$challenge.timesSolved',
          date: '$challenge.date'
        }	
    }
]).toArray();
    if (!challenges) {
      throw new Error();
    }
    return challenges;
  } catch (err) {
    throw err;
  }
};

exports.getChallengeById = async (challengeId) => {
  const challengeIdObj = convertToObjectId(challengeId);
  const challenge = await challengesCollection.findOne({ _id: challengeIdObj });
  if (!challenge) {
    const error = new Error('Challenge not found');
    error.status = 404;
    throw error;
  }
  return challenge;
};

exports.createChallenge = async ( userId, {title, description, difficulty, solution }) => {
   const existing = await challengesCollection.findOne({ title });
   if (existing) throw new Error('Title already exists');
   const userIdObj = convertToObjectId(userId); 
   await challengesCollection.insertOne({ userId: userIdObj, title, description, difficulty, solution, date: getCurrentDate(), timesSolved: 0 });
   return { message: 'Challenge created successfully' };
};

exports.solveChallenge = async ({ userId, challengeId, solution }) => {
  const userIdObj = convertToObjectId(userId);
  const challengeIdObj = convertToObjectId(challengeId);

  const challenge = await challengesCollection.findOne({ _id: challengeIdObj });
  if (!challenge) throw new Error('Challenge not found');
  if (challenge.solution !== solution) throw new Error('Incorrect solution' );

  const existing = await solvedChallengesCollection.findOne({ userId: userIdObj, challengeId: challengeIdObj });
  if (existing) throw new Error('Challenge already solved');
  await challengesCollection.updateOne({ _id: challengeIdObj }, { $inc: { timesSolved: 1 } });
  await solvedChallengesCollection.insertOne({ userId: userIdObj, challengeId: challengeIdObj });
  return { message: 'Challenge solved successfully' };
};
