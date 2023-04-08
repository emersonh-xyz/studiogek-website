export default async function fetchCampaignPost(id) {
    const results = await fetch(`/api/patreon/campaign/posts/${id}`)
        .then((res) => {
            return res.json();
        })

    return results;
}
