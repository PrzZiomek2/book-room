
import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URI
const options = {
   useUnifiedTopology: true,
   useNewUrlParser: true,
}

let client = new MongoClient(uri, options);
let clientPromise

if (!process.env.MONGO_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {

  if (!global._mongoClientPromise) {

    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise;
} 
else {
  clientPromise = client.connect()
}

export default clientPromise
