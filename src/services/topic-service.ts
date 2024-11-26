import { prisma } from "../client";
import { Topic } from "@prisma/client";

// Types for Topic data
export type TopicData = Pick<Topic, "subjectId" | "title" | "description" | "videoUrl">;

export type ReturnedTopic = Topic;

export const createTopic = async (data: TopicData) => {
  return await prisma.topic.create({
    data: { ...data },
  });
};

export const findTopicById = async (topicId: string) => {
  return await prisma.topic.findUnique({
    where: { id: topicId },
    include: {
      subject: true,
    }
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

export const getTopicsBySubject = async (subjectId: string) => {
  return await prisma.topic.findMany({
    where: { subjectId },
    include: {
      subject: true,
    }
  });
};

export const getAllTopics = async () => {
  return await prisma.topic.findMany({
    include: {
      subject: true,
    }
  });
};
