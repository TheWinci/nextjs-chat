import type { NextApiRequest, NextApiResponse } from 'next'
import { createUser, findUser, generateToken, TCurrentUser, validatePassword } from "./user.service";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      register(req, res);
      break;

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).json({ error: `Method ${method} Not Allowed` })
      break;
  }
}


const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body

  const userExists = await findUser({ username })

  if (userExists) {
    res.status(400).json({ error: `Username already taken` })
    return;
  }

  const createdUser = await createUser({ username, password })

  if (!createdUser) {
    res.status(500).json({ error: `Failed to create user` })
    return;
  }

  res.status(201).json({ message: `User created` })
  return;
}

