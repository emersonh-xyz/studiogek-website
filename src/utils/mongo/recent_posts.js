export default async function fetchRecentPosts() {
    const results = await fetch('/api/posts/recent')
        .then((res) => res.json())
        .catch((err) => console.log(err))

    return results
}
