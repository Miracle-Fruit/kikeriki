export async function getAuthToken() {
    // TODO Send help pls
    fetch('172.20.0.20:9047/v1/auth', {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            username: "cassandra",
            password: "cassandra"
        })})
        .then(response => response.json())
        .then(response => {console.log(response);})
        .catch(err => {console.log(err);})
}