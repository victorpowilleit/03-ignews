// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
  console.log(request.query)
  const users = [
    {id: 1, name: 'Victor'},
    {id: 2, name: 'Pedro'},
    {id: 3, name: 'Natalia'},
  ]
  return response.json(users)
}

// export default (req, res) => {
//   res.status(200).json({ name: 'John Doe' })
// }