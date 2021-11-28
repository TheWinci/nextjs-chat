import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid';
var jwt = require('jsonwebtoken');

export type TUserName = string;
export type TPassword = string;
export type UserParams = {
  username: TUserName;
  password: TPassword;
}

export type TUuid = string;
export type TUser = {
  uuid: TUuid;
  createdAt: number,
  username: TUserName,
  hash: string,
  salt: string,
}

export type TToken = string;
export type TCurrentUser = {
  username: TUserName,
  token: TToken,
}
export type TPublicUser = {
  uuid: TUuid,
  username: TUserName,
}

const users = [
  {
    uuid: 'a70e1230-7424-40ea-b349-75e42dd6c464',
    createdAt: 1637777309474,
    username: 'qwe',
    hash: '1167910bbe4ae86e4eb808221649e498d3ae0a284fcd748e8b3729fe75e70d8234a4deb5b8f477cad6a407514f4f1a4ea19bd370f0eeeb4763793f26bb622d3a',
    salt: 'a5ea6f04505b7d4a3da4b85d50cbacd9',
  }
]

const userTokens = new Map<TToken, any>();

export const createUser = async ({ username, password }: UserParams) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')

  const user = {
    uuid: uuidv4(),
    createdAt: Date.now(),
    username,
    hash,
    salt,
  }

  users.push(user)

  return user
}

export const findUser = async ({ username }: { username: TUserName }) => {
  return users.find((user) => user.username === username)
}

export const findUserById = async ({ uuid }: { uuid: string }) => {
  return users.find((user) => user.uuid === uuid)
}

export const validatePassword = async (user: TUser, inputPassword: TPassword) => {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}

export const generateToken = (user: TUser) => {
  const userToken = jwt.sign(user, 'shhhhh');

  userTokens.set(userToken, user.uuid)

  return userToken;
}

export const findUserByToken = (userToken: string) => {
  const userId = userTokens.get(userToken);
  const user = findUserById(userId)

  return user
}

