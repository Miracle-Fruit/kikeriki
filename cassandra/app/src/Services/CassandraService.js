const authPort = 9047;
const restPort = 9048;

let authToken = null;
let gitpodURL = process.env.REACT_APP_GITPOD_URL
let authURL = gitpodURL.slice(0, 8) + authPort + "-" + gitpodURL.slice(8);
let restURL = gitpodURL.slice(0, 8) + restPort + "-" + gitpodURL.slice(8);

export async function getAuthToken() {
    fetch( authURL + '/v1/auth', {
        method: 'POST',
        mode: 'cors',
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
        fetch( restURL + '/v2/keyspaces/twitter/tweets/' + tweetID, {
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