const challengeService = require('../services/challengeService');
const { challengeSchema, solveChallengeSchema } = require('../schemas/challengeSchemas');

exports.getChallenges = async (req, res, next) => {
    const filters = req.query;

    try {
        const challenges = await challengeService.getChallenges(req.user.id, filters);
        res.status(200).json(challenges);
    } catch (error) {
        next(error);
    }
};

exports.getCreatedChallengesByUserName = async (req, res, next) => {
    const filters = req.query;
    const { username } = req.params;

    try {
        const challenges = await challengeService.getCreatedChallengesByUserName(req.user.id, username, filters);
        res.status(200).json(challenges);
    } catch (error) {
        next(error);
    }
};

exports.getSolvedChallengesByUserName = async (req, res, next) => {
    const filters = req.query;
    const { username } = req.params;

    try {
        const solvedChallenges = await challengeService.getSolvedChallengesByUserName(req.user.id, username, filters);
        res.status(200).json(solvedChallenges);
    } catch (error) {
        next(error);
    }
};

exports.getChallengeById = async (req, res, next) => {
    const { challengeId } = req.params;
    try {
        const challenge = await challengeService.getChallengeById(challengeId);
        if (!challenge) {
            throw new Error('Challenge not found');
        }
        res.status(200).json(challenge);
    } catch (error) {
        next(error);
    }
};

exports.createChallenge = async (req, res, next) => {
    const { error, value } = challengeSchema.validate(req.body);
    if (error) {
        throw new Error(error.details[0].message);
    }
    try {
        const newChallenge = await challengeService.createChallenge(req.user.id, value);
        res.status(201).json(newChallenge);
    } catch (error) {
        next(error);
    }
};

exports.solveChallenge = async (req, res, next) => {
    const { error, value } = solveChallengeSchema.validate({ ...req.body, userId: req.user.id });
    if (error) {
        throw new Error(error.details[0].message);
    }
    try {
        const result = await challengeService.solveChallenge(value);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
