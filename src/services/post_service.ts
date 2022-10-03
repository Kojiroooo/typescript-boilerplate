import { generateSessionToken } from '@/libs/generate_session_token';
import { PrismaClient, Post, User } from '@prisma/client';
import { userCreate } from './user_service';
const prisma = new PrismaClient();

export const postCreate = async (title: string, user: User): Promise<Post> => {
  return prisma.post.create({
    data: {
      title: title,
      userId: user.id,
    },
  });
};

export const getPostList = async () => {
  // TODO: has_manyでの取得を実現する
  return prisma.post.findMany();
}

// export const userLogin = async (email: string, password: string): Promise<User> => {
//   const user = await prisma.user.findFirst({
//     where: {
//       email,
//     },
//   });
//   if (user && validatePassword(password, user.passwordSalt, user.passwordHash)) {
//     const tokenUpdatedUser = await prisma.user.update({
//       where: {
//         id: user.id,
//       },
//       data: {
//         sessionToken: await generateSessionToken(),
//       },
//     });
//     return tokenUpdatedUser;
//   } else {
//     throw new AuthenticationError();
//   }
// };

// export class AuthenticationError extends Error {
//   name = 'AuthenticationError';
//   message = '認証情報が正しくありません';
// }
