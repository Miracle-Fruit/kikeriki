const authPort = 9047;
const restPort = 9048;

export let authToken = null;
let gitpodURL = process.env.REACT_APP_GITPOD_URL
let authURL = gitpodURL.slice(0, 8) + authPort + "-" + gitpodURL.slice(8);
export const restURL = gitpodURL.slice(0, 8) + restPort + "-" + gitpodURL.slice(8);

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