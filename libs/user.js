import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

const users = []

export const createUser = async ({ email, password }) => {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')

  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    email,
    hash,
    salt,
  }

  users.push(user)

  return user
}

export const findUser = async ({ email }) => {
  return users.find((user) => user.email === email)
}

export const validatePassword = async (user, inputPassword) => {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}