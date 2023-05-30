import { ObjectId } from 'mongodb';
import clientPromise from '../../db/mongoClient'

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("book_room");

  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body); 
      let myRoom = await db.collection("rooms").insertOne(bodyObject); 
      res.json(myRoom);
      break;
    case "GET":
      const allRooms = await db.collection("rooms").find({}).toArray(); 
      res.json({ status: 200, data: allRooms });
      break;
    case "PUT":
      let body = JSON.parse(req.body); 
      const edited = await db.collection("rooms").updateOne(
        {"_id": new ObjectId(body.id)}, 
        { $set: body }
      ); 
      res.json({ status: 200, data: edited });
      break;
  }
}

