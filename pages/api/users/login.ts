import type { NextApiRequest, NextApiResponse } from 'next'
import { findUser, generateToken, TCurrentUser, validatePassword } from "./user.service";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      login(req, res);
      break;

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).json({ error: `Method ${method} Not Allowed` })
      break;
  }
}

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body

  const userExists = await findUser({ username })

  if (!userExists) {
    res.status(404).json({ error: `User not found` })
    return;
  }

  const isPasswordCorrect = await validatePassword(userExists, password)

  if (!isPasswordCorrect) {
    res.status(400).json({ error: `Data does not match` })
    return;
  }

  const returnUser: TCurrentUser = {
    username: userExists.username,
    token: generateToken(userExists)
  }

  res.status(200).json(returnUser)
  return;
}
