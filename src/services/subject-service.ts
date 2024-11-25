import { prisma } from "../client";
import { Subject } from "@prisma/client";
import { NotFoundError } from "../errors";

// Types for Subject data
export type SubjectData = Pick<Subject, "name" | "description">;

export type ReturnedSubject = Subject;

export const createSubject = async (
  data: SubjectData
): Promise<ReturnedSubject> => {
  return await prisma.subject.create({
    data,
  });
};

export const findSubjectById = async (
  subjectId: string
): Promise<ReturnedSubject | null> => {
  return await prisma.subject.findUnique({
    where: { id: subjectId },
  });
};

export const updateSubject = async (
  subjectId: string,
  data: Partial<SubjectData>
): Promise<ReturnedSubject | null> => {
  return await prisma.subject.update({
    where: { id: subjectId },
    data,
  });
};

export const deleteSubject = async (
  subjectId: string
): Promise<ReturnedSubject> => {
  return await prisma.subject.delete({
    where: { id: subjectId },
  });
};

export const getAllSubjects = async (
  query?: Partial<SubjectData>
): Promise<ReturnedSubject[]> => {
  return await prisma.subject.findMany({
    where: { ...query },
    include: {
      Topics: true,
    },
  });
};

// Function to get learner rankings by subject
export const getLearnerRankingsBySubject = async (subjectId: string) => {
    // Fetch progress for the given subject and user, along with completion status
    const progressData = await prisma.progress.findMany({
      where: { subjectId },
      select: {
        userId: true,
        isCompleted: true,
      },
    });
  
    if (!progressData.length) {
      throw new NotFoundError("No progress data found for this subject");
    }
  
    // Calculate completion rates for each learner
    const learnerCompletionRates = progressData.reduce((acc, { userId, isCompleted }) => {
      if (!acc[userId]) {
        acc[userId] = { completed: 0, total: 0 };
      }
      acc[userId].total += 1;
      if (isCompleted) {
        acc[userId].completed += 1;
      }
      return acc;
    }, {} as Record<string, { completed: number; total: number }>);
  
    // Calculate the completion rate for each learner
    const rankings = Object.keys(learnerCompletionRates).map((userId) => {
      const { completed, total } = learnerCompletionRates[userId];
      const completionRate = total > 0 ? completed / total : 0;
      return { userId, completionRate };
    });
  
    // Sort learners by completion rate (highest first)
    rankings.sort((a, b) => b.completionRate - a.completionRate);
  
    return rankings;
};
