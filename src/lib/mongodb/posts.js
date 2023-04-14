import clientPromise from ".";

let client;
let db;
let posts;

async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = await client.db()
        posts = await db.collection('posts')
    } catch (error) {
        console.log(error)
    }
}

; (async () => {
    await init()
})()

export async function getPosts() {
    try {
        if (!posts) await init()
        const result = await posts

        return { posts: result }
    }
    catch (error) {
        return { error: 'Failed to fetch posts' }
    }
}