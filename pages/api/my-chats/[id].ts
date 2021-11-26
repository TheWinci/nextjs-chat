import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      break;

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).json({ error: `Method ${method} Not Allowed` })
      break;
  }
}
