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
      const allPosts = await db.collection("rooms").find({}).toArray(); 
      res.json({ status: 200, data: allPosts });
      break;
  }
}
