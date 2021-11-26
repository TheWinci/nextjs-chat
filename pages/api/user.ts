import type { NextApiRequest, NextApiResponse } from 'next'
import { createUser, findUser, validatePassword } from "../../libs/user";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      login(req, res);
      break;

    case 'PUT':
      register(req, res);
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

  res.status(200).json({ user: userExists })
  return;
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

