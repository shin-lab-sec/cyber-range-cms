// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from "mysql2"

type Data = {
  name: string
  arr: any //number[]
  method: string
}

const connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: "password",
  database: "sample"
})

// 全要素取得
const selectAll = (query:string) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result, fields) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  // res: NextApiResponse<Data>
) {
  const { method = "" } = req
  switch (method) {
    case "GET":
      // res.json({message: "a?"})
    case "POST":
  }

  try {
    const users = await selectAll("select * from users")
    // const users = await selectAll("select * from students") 
    res.status(200).json({
      name: 'api/users', method: method, data: users
    })
  } catch (err) {
    res.status(400).json({message: err})
  }


  
  // connection.query(
  //   'SELECT * FROM `users`',
  //   function (err, results, fields) {
  //     if (!results) {
  //       res.status(200).json({
  //         data: err
  //       })
  //     } else {
  //       res.status(200).json({
  //         method: method ,data: results
  //       })
  //     }
  //   }
  // )
}
