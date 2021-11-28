import type { NextApiRequest, NextApiResponse } from 'next'
import { createUser, findUser, generateToken, TCurrentUser, validatePassword } from "./user.service";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      getSingle(req, res);
      break;

    default:
      res
        .setHeader('Allow', ['GET'])
        .status(405)
        .json({ error: `Method ${method} Not Allowed` })
      res.end()
      break;
  }
}

const getSingle = (req: NextApiRequest, res: NextApiResponse) => {
  const { uuid } = req.body

  if (!uuid || !uuid?.length) {
    return res
      .status(400)
      .json({ users: [] })
  }
}


