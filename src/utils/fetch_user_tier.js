export default async function fetchUserTier() {
    const result = await fetch('/api/patreon/user/tier')
        .then((res) => {
            return res.json();
        })
    // // Filter out the tier from tierList.json


    return result;

}