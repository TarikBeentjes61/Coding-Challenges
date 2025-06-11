const challengeService = require('../services/challengeService');
const uploadService = require('../services/uploadService');
const { createChallengeSchema, solveChallengeSchema, updateChallengeSchema } = require('../schemas/challengeSchemas');

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
    const { error, value } = createChallengeSchema.validate(req.body);
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
exports.updateChallenge = async(req, res, next) => {
    const { error, value } = updateChallengeSchema.validate(req.body);
    if (error) {
        throw new Error(error.details[0].message);
    }
    try {
        const existingChallenge = await challengeService.getChallengeById(value.challengeId)
        const oldImages = findImageNamesFromDescription(existingChallenge.description);
        const newImages = findImageNamesFromDescription(value.description);
        deleteUnusedImages(oldImages, newImages);
        const updatedChallenge = await challengeService.updateChallenge(req.user.id, value);
        res.status(201).json(updatedChallenge);
    } catch (error) {
        next(error);
    }
}
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

function findImageNamesFromDescription(desc) {
    const filenames = new Set();

    function walk(node) {
        if (!node) return;
        if (node.type === 'image' && node.attrs?.src) {
            const match = node.attrs.src.match(/(?:http:\/\/[^/]+\/)?(uploads\/challenges\/[^/]+\/[^?"\s]+)/);
            if (match) {
                filenames.add(match[1]);
            }
        }

        if (Array.isArray(node.content)) {
            for (const child of node.content) {
                walk(child);
            }
        }
    }

    walk(desc);
    return filenames;
}
function deleteUnusedImages(oldImages, newImages) {
    const images = [...oldImages].filter(name => !newImages.has(name));
    if (images) {
        for (const image of images) {
            uploadService.deleteFile(image);
        }
    }
}
