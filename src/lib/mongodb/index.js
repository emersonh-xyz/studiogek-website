const { MongoClient, ServerApiVersion } = require('mongodb');

const URI = process.env.MONGODB_URI;

let clientPromise

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URI)


if (process.env.NODE_ENV !== 'production') {

    if (!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect()
    }

    clientPromise = global._monogClientPromise
} else {

    clientPromise = client.connect();
}

export default clientPromise