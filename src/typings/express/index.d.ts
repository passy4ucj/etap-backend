import { Role, User } from "@prisma/client";


export interface UserPayload {
  id: string;
  email: string;
  name: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Users extends User {}
  }
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}