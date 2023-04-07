export default async function fetchCampaignPosts() {
    const results = await fetch('/api/patreon/campaign/posts')
        .then((res) => {
            return res.json();
        })

    return results;
}
