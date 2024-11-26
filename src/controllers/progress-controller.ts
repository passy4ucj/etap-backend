import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { successResponse } from "../helpers";
import { BadRequestError, NotFoundError } from "../errors";
import {
  createProgress,
  deleteProgress,
  findProgressById,
  getUserProgressBySubject,
  getRankingBySubject,
  updateProgress,
  getAllProgress,
} from "../services/progress-service";

// @desc    Create a new progress entry
// @route   POST /api/v2/progress
export const createProgressController = async (req: Request, res: Response) => {
  const { userId, subjectId, topicId, isCompleted } = req.body;

  if (!userId || !subjectId || !topicId)
    throw new BadRequestError("User ID, Subject ID, and Topic ID are required");

  const progress = await createProgress({ userId, subjectId, topicId, isCompleted });

  return successResponse(res, StatusCodes.CREATED, progress);
};

// @desc    Get progress by ID
// @route   GET /api/v2/progress/:id
export const getProgressByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const progress = await findProgressById(id);

  if (!progress) throw new NotFoundError("Progress not found");

  return successResponse(res, StatusCodes.OK, progress);
};

// @desc    Update a progress entry
// @route   PUT /api/v2/progress/:id
export const updateProgressController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  if (typeof isCompleted !== "boolean")
    throw new BadRequestError("isCompleted field is required and must be a boolean");

  const updatedProgress = await updateProgress(id, { isCompleted });

  if (!updatedProgress) throw new NotFoundError("Progress not found");

  return successResponse(res, StatusCodes.OK, updatedProgress);
};

// @desc    Get user progress for a specific subject
// @route   GET /api/v2/progress/user/:userId/subject/:subjectId
export const getUserProgressBySubjectController = async (req: Request, res: Response) => {
  const { userId, subjectId } = req.params;

  const progress = await getUserProgressBySubject(userId, subjectId);

  if (!progress.length) throw new NotFoundError("No progress found for the specified user and subject");

  return successResponse(res, StatusCodes.OK, progress);
};

// @desc    Get ranking by subject
// @route   GET /api/v2/progress/ranking/:subjectId
export const getRankingBySubjectController = async (req: Request, res: Response) => {
  const { subjectId } = req.params;

  const ranking = await getRankingBySubject(subjectId);

  return successResponse(res, StatusCodes.OK, ranking);
};

// @desc    Get all progress
// @route   GET /api/v2/progress
export const getAllProgressController = async (_req: Request, res: Response) => {
  const progress = await getAllProgress();

  return successResponse(res, StatusCodes.OK, progress);
};


// @desc    Delete a progress entry
// @route   DELETE /api/v2/progress/:id
export const deleteProgressController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const progress = await deleteProgress(id);

  if (!progress) throw new NotFoundError("Progress not found");

  return successResponse(res, StatusCodes.OK, {
    message: "Progress deleted successfully",
  });
};
