import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { successResponse } from "../helpers";
import { BadRequestError, NotFoundError } from "../errors";
import {
  createSubject,
  deleteSubject,
  findSubjectById,
  getAllSubjects,
  getLearnerRankingsBySubject,
  updateSubject,
} from "../services/subject-service";

// @desc    Create a new subject
// @route   POST /api/v2/subjects
export const createSubjectController = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  if (!name) throw new BadRequestError("Subject name is required");

  const subject = await createSubject({ name, description });

  return successResponse(res, StatusCodes.CREATED, subject);
};

// @desc    Get all subjects
// @route   GET /api/v2/subjects
export const getAllSubjectsController = async (req: Request, res: Response) => {
  const { name, description } = req.query;

  const subjects = await getAllSubjects({
    name: name as string,
    description: description as string,
  });

  return successResponse(res, StatusCodes.OK, subjects);
};

// @desc    Get a specific subject by ID
// @route   GET /api/v2/subjects/:id
export const getSubjectByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const subject = await findSubjectById(id);

  if (!subject) throw new NotFoundError("Subject not found");

  return successResponse(res, StatusCodes.OK, subject);
};

// @desc    Update a subject
// @route   PUT /api/v2/subjects/:id
export const updateSubjectController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name && !description)
    throw new BadRequestError("At least one field (name or description) is required for update");

  const updatedSubject = await updateSubject(id, { name, description });

  if (!updatedSubject) throw new NotFoundError("Subject not found");

  return successResponse(res, StatusCodes.OK, updatedSubject);
};

// @desc    Delete a subject
// @route   DELETE /api/v2/subjects/:id
export const deleteSubjectController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const subject = await deleteSubject(id);

  if (!subject) throw new NotFoundError("Subject not found");

  return successResponse(res, StatusCodes.OK, {
    message: "Subject deleted successfully",
  });
};

// @desc    Get learner rankings by subject
// @route   GET /api/v2/subjects/:id/rankings
export const getLearnerRankingsController = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const rankings = await getLearnerRankingsBySubject(id);
      return successResponse(res, StatusCodes.OK, rankings);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
};
