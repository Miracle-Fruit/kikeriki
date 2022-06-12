let authToken = null;


export async function getAuthToken() {
    // TODO Send help pls
    fetch('https://9047-miraclefrui-distributed-jucvhvmw5h6.ws-eu47.gitpod.io/v1/auth', {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: "cassandra",
            password: "cassandra"
        })
    })
        .then(response => response.json())
        .then(response => { authToken = response['authToken']; })
        .catch(err => { console.log(err); })
}

export async function getTweetByID(tweetID) {
    if (authToken == null) {
        setTimeout(getTweetByID, 1000, tweetID)
    } else {
        console.log(tweetID)
        fetch('https://9048-miraclefrui-distributed-jucvhvmw5h6.ws-eu47.gitpod.io/v2/keyspaces/twitter/tweets/' + tweetID, {
            method: 'GET',
            credentials: "include",
            headers: {
                'X-Cassandra-Token': authToken
            }
        })
            .then(response => response.json())
            .then(response => { console.log(response); })
            .catch(err => { console.log(err); })
    }
}