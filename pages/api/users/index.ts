import type { NextApiRequest, NextApiResponse } from 'next'
import { createUser, findUser, generateToken, TCurrentUser, validatePassword } from "./user.service";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      getList(req, res);
      break;

    default:
      res
        .setHeader('Allow', ['POST'])
        .status(405)
        .json({ error: `Method ${method} Not Allowed` })
      res.end()
      break;
  }
}

const getList = (req: NextApiRequest, res: NextApiResponse) => {
  const { uuids } = req.body

  if (!uuids || !uuids?.length) {
    return res
      .status(400)
      .json({ users: [] })
  }
}


