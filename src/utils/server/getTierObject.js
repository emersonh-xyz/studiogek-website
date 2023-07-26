import tierList from "../../config/tierList"

export default async function getTierObject(token) {

    // const url = `https://www.patreon.com/api/oauth2/v2/identity?include=memberships.currently_entitled_tiers`

    const url = `https://www.patreon.com/api/oauth2/v2/identity?include=memberships.currently_entitled_tiers`

    // const url = `https://www.patreon.com/api/oauth2/v2/identity`

    const results = await fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + token?.accessToken,
            'user-agent': 'Chrome: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
        },
    }).then((res) => res.json())

    // console.log(results)

    // This means we were able to hit the endpoint
    if (results.hasOwnProperty('included')) {

        // Juicy
        const isJuicy = findObjectById(results.included, "9956198");

        // Gek
        const isGek = findObjectById(results.included, "9384773");

        // Uncut
        const isUncut = findObjectById(results.included, "9384741");

        // Voting
        const isVoting = findObjectById(results.included, "9384706");

        if (isJuicy) {
            return tierList[4];
        } else if (isGek) {
            return tierList[3]
        } else if (isUncut) {
            return tierList[2]
        } else if (isVoting) {
            return tierList[1]
        } else {
            return tierList[0];
        }
    } else {
        // If we can't find anything or it wasn't included just return 0
        return tierList[0]
    }

}

function findObjectById(array, id) {
    const object = array.find(obj => obj.id === id);
    if (object === undefined) {
        return "";
    }
    return object
}

