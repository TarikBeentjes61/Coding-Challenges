const { getChallengesCollection, getSolvedChallengesCollection } = require('../config/db');
const ApiError = require('../utils/apiError');
const { convertToObjectId, getCurrentDate } = require('../utils/utils');
const { incrementReputation } = require('./userService');

const challengePipeline = require('../pipelines/challengePipeline');

exports.getChallenges = async (userId, filters = {}) => {
  const challengesCollection = getChallengesCollection();
  const userIdObj = convertToObjectId(userId);
  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 25;
  const skip = (page - 1) * limit;
  return await challengesCollection.aggregate(challengePipeline.challenges(userIdObj, skip, limit)).toArray();
};

exports.getCreatedChallengesByUserName = async (userId, username, filters = {}) => {
  const challengesCollection = getChallengesCollection();
  const userIdObj = convertToObjectId(userId);
  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 25;
  const skip = (page - 1) * limit;
  return await challengesCollection.aggregate(challengePipeline.createdChallengesByName(userIdObj, username, skip, limit)).toArray();
};

exports.getSolvedChallengesByUserName = async (userId, username, filters = {}) => {
  const solvedChallengesCollection = getSolvedChallengesCollection();
  const userIdObj = convertToObjectId(userId);
  const page = parseInt(filters.page) || 1;
  const limit = parseInt(filters.limit) || 25;
  const skip = (page - 1) * limit;
  return await solvedChallengesCollection.aggregate(challengePipeline.solvedChallengesByUserName(userIdObj, username, skip, limit)).toArray();
};

exports.getChallengeById = async (challengeId) => {
  const challengesCollection = getChallengesCollection();
  const challengeIdObj = convertToObjectId(challengeId);
  if(!challengeIdObj) { 
    throw new ApiError("Challenge not found", 404);
  }
  const challenge = await challengesCollection.findOne({ _id: challengeIdObj });
  if (!challenge) {
    throw new ApiError("Challenge not found", 404);
  }
  return challenge;
};

exports.createChallenge = async ( userId, {title, description, solution }) => {
   const challengesCollection = getChallengesCollection();
   const existing = await challengesCollection.findOne({ title });
   if (existing) throw new ApiError('Title already exists', 409);
   const userIdObj = convertToObjectId(userId); 
   return await challengesCollection.insertOne({ userId: userIdObj, title, description, solution, date: getCurrentDate(), timesSolved: 0 });
};
exports.updateChallenge = async (userId, { challengeId, title, description, solution }) => {
  const challengesCollection = getChallengesCollection();
  const userIdObj = convertToObjectId(userId);
  const challengeIdObj = convertToObjectId(challengeId);
  const existing = await challengesCollection.findOne({ _id: challengeIdObj, userId: userIdObj });
  if (!existing) throw new ApiError('Challenge not found', 404);

  await challengesCollection.updateOne(
    { _id: existing._id },
    {
      $set: {
        title,
        description,
        solution,
        updatedAt: getCurrentDate(), 
      },
    }
  );

  return { message: 'Challenge updated successfully' };
};

exports.solveChallenge = async ({ userId, challengeId, solution }) => {
  const challengesCollection = getChallengesCollection();
  const solvedChallengesCollection = getSolvedChallengesCollection();
  const userIdObj = convertToObjectId(userId);
  const challengeIdObj = convertToObjectId(challengeId);

  const challenge = await challengesCollection.findOne({ _id: challengeIdObj });
  if (!challenge) throw new ApiError('Challenge not found', 404);
  if (challenge.userId.toString() === userIdObj.toString()) throw new ApiError('You cannot solve your own challenge', 403);
  if (challenge.solution !== solution) throw new ApiError('Incorrect solution', 400);

  const existing = await solvedChallengesCollection.findOne({ userId: userIdObj, challengeId: challengeIdObj });
  if (existing) throw new ApiError('Challenge already solved', 409);

  await challengesCollection.updateOne({ _id: challengeIdObj }, { $inc: { timesSolved: 1 } });
  await solvedChallengesCollection.insertOne({ userId: userIdObj, challengeId: challengeIdObj });

  await incrementReputation(userId, 1);
  await incrementReputation(challenge.userId, 1); 

  return { message: 'Challenge solved successfully' };
};
