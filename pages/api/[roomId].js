import { ObjectId } from 'mongodb';
import clientPromise from '../../db/mongoClient'

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("book_room");

  switch (req.method) {
    case "DELETE": 
      const deleted = await db.collection("rooms").deleteOne({"_id": new ObjectId(req.query.roomId)}); 
      res.json({ status: 200, data: deleted });
      break;
    case "GET": console.log("req.query.roomId", req.query.roomId);
      const room = await db.collection("rooms").findOne({"_id": new ObjectId(req.query.roomId)}); 
      res.json({ status: 200, data: room });
      break;
  }
}