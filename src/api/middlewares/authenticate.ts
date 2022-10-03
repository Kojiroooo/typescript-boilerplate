import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  var sessionToken = req.headers.authorization?.match(/Bearer\s(.*)/)[1] as string;

  let user;

  if (sessionToken !== undefined) {
    user = await prisma.user.findFirst({
      where: {
        sessionToken: sessionToken,
      },
    });
  }

  console.log(user);

  res.locals.user = user;
  return next();
};
