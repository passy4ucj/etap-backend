
import { prisma } from "../client";
import { User } from "@prisma/client";

export type UserAccount = Pick<
    User,
    "name" | "email" | "password"
    >;

// excluded password types
export type ReturnedUser = Partial<Pick<User, "password">> &
Omit<User, "password">;


export const createUser = async (data: UserAccount): Promise<ReturnedUser> => {
    const user: ReturnedUser = await prisma.user.create({
        data: { ...data, role: 'ADMIN' },
    });
    delete user.password;

    return user;
};

export const findUser = async (
    email: string
): Promise<ReturnedUser | null> => {
    return await prisma.user.findUnique({ where: { email } });
};

export const findUserByIdService = async (
    userId: string
): Promise<ReturnedUser | null> => {
    return await prisma.user.findUnique({ 
        where: { id: userId },
    });
};


export const updatePassword = async (email: string, password: string) => {
const user = await prisma.user.update({
    where: { email },
    data: { password },
});
return user;
};

export const getAllUserService = async (query: any) => {

let filterObject: any;
filterObject = {
    name: query.name,
    role: query.role,
}

return await prisma.user.findMany({
    where: {
    ...filterObject
    },
    select: {
    id: true,
    name: true,
    role: true,
    email: true,
    },
});
};
