import { findUserByToken } from "../users/user.service";

export const getUserChatList = (userToken: string) => {
  const user = findUserByToken(userToken);

  return [];
}
