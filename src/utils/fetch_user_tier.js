const tierList = require("../config/tiers")

export default async function fetchUserTier() {
    const results = await fetch('/api/patreon/user/tier')
        .then((res) => {
            return res.json();
        })

    console.log(results)

    // // Filter out the tier from tierList.json
    // const tier = tierList.find((tier) => tier.id === results.data);

    return results;

}