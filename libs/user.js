import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

const users = [
  {
    id: 'a70e1230-7424-40ea-b349-75e42dd6c464',
    createdAt: 1637777309474,
    username: 'qwe',
    hash: '1167910bbe4ae86e4eb808221649e498d3ae0a284fcd748e8b3729fe75e70d8234a4deb5b8f477cad6a407514f4f1a4ea19bd370f0eeeb4763793f26bb622d3a',
    salt: 'a5ea6f04505b7d4a3da4b85d50cbacd9',
  }
]

export const createUser = async ({ username, password }) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')

  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    username,
    hash,
    salt,
  }

  users.push(user)

  return user
}

export const findUser = async ({ username }) => {
  return users.find((user) => user.username === username)
}

export const validatePassword = async (user, inputPassword) => {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}