import { prisma } from "../client";
import { Topic } from "@prisma/client";

// Types for Topic data
export type TopicData = Pick<Topic, "subjectId" | "title" | "description" | "videoUrl">;

export type ReturnedTopic = Topic;

export const createTopic = async (data: TopicData): Promise<ReturnedTopic> => {
  return await prisma.topic.create({
    data,
  });
};

export const findTopicById = async (topicId: string): Promise<ReturnedTopic | null> => {
  return await prisma.topic.findUnique({
    where: { id: topicId },
  });
};

export const updateTopic = async (
  topicId: string,
  data: Partial<TopicData>
): Promise<ReturnedTopic | null> => {
  return await prisma.topic.update({
    where: { id: topicId },
    data,
  });
};

export const deleteTopic = async (topicId: string): Promise<ReturnedTopic> => {
  return await prisma.topic.delete({
    where: { id: topicId },
  });
};

export const getTopicsBySubject = async (subjectId: string): Promise<ReturnedTopic[]> => {
  return await prisma.topic.findMany({
    where: { subjectId },
  });
};

export const getAllTopics = async (): Promise<ReturnedTopic[]> => {
  return await prisma.topic.findMany();
};
