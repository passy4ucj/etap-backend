import { prisma } from "../client";
import { Progress } from "@prisma/client";

// Types for Progress data
export type ProgressData = Pick<Progress, "userId" | "subjectId" | "topicId" | "isCompleted">;

export type ReturnedProgress = Progress;

export const createProgress = async (data: ProgressData): Promise<ReturnedProgress> => {
  return await prisma.progress.create({
    data,
  });
};

export const findProgressById = async (progressId: string): Promise<ReturnedProgress | null> => {
  return await prisma.progress.findUnique({
    where: { id: progressId },
  });
};

export const updateProgress = async (
  progressId: string,
  data: Partial<ProgressData>
): Promise<ReturnedProgress | null> => {
  return await prisma.progress.update({
    where: { id: progressId },
    data,
  });
};

export const getUserProgressBySubject = async (
  userId: string,
  subjectId: string
): Promise<ReturnedProgress[]> => {
  return await prisma.progress.findMany({
    where: { userId, subjectId },
  });
};

export const getRankingBySubject = async (subjectId: string) => {
  return await prisma.progress.groupBy({
    by: ["userId"],
    where: { subjectId, isCompleted: true },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
  });
};

export const deleteProgress = async (progressId: string): Promise<ReturnedProgress> => {
  return await prisma.progress.delete({
    where: { id: progressId },
  });
};
