import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { successResponse } from "../helpers";
import { BadRequestError, NotFoundError } from "../errors";
import {
  createTopic,
  deleteTopic,
  findTopicById,
  getTopicsBySubject,
  getAllTopics,
  updateTopic,
} from "../services/topic-service";

// @desc    Create a new topic
// @route   POST /api/v2/topics
export const createTopicController = async (req: Request, res: Response) => {
  const { subjectId, title, description, videoUrl } = req.body;

  if (!subjectId || !title)
    throw new BadRequestError("Subject ID and title are required");

  const topic = await createTopic({ subjectId, title, description, videoUrl });

  return successResponse(res, StatusCodes.CREATED, topic);
};

// @desc    Get all topics
// @route   GET /api/v2/topics
export const getAllTopicsController = async (_req: Request, res: Response) => {
  const topics = await getAllTopics();

  return successResponse(res, StatusCodes.OK, topics);
};

// @desc    Get topics by subject ID
// @route   GET /api/v2/topics/subject/:subjectId
export const getTopicsBySubjectController = async (req: Request, res: Response) => {
  const { subjectId } = req.params;

  const topics = await getTopicsBySubject(subjectId);

  if (!topics.length) throw new NotFoundError("No topics found for this subject");

  return successResponse(res, StatusCodes.OK, topics);
};

// @desc    Get a specific topic by ID
// @route   GET /api/v2/topics/:id
export const getTopicByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const topic = await findTopicById(id);

  if (!topic) throw new NotFoundError("Topic not found");

  return successResponse(res, StatusCodes.OK, topic);
};

// @desc    Update a topic
// @route   PUT /api/v2/topics/:id
export const updateTopicController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, videoUrl } = req.body;

  if (!title && !description && !videoUrl)
    throw new BadRequestError("At least one field (title, description, or video URL) is required for update");

  const updatedTopic = await updateTopic(id, { title, description, videoUrl });

  if (!updatedTopic) throw new NotFoundError("Topic not found");

  return successResponse(res, StatusCodes.OK, updatedTopic);
};

// @desc    Delete a topic
// @route   DELETE /api/v2/topics/:id
export const deleteTopicController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const topic = await deleteTopic(id);

  if (!topic) throw new NotFoundError("Topic not found");

  return successResponse(res, StatusCodes.OK, {
    message: "Topic deleted successfully",
  });
};
