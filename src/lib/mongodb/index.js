import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
let client
let clientPromise

if (!clientPromise) {
    client = new MongoClient(uri, options)
    clientPromise = client.connect().then(console.log("MongoDB connection established"))
}

export default clientPromise