export default async function server(path, options = {}, file = false) {

    let host = import.meta.env.VITE_SERVER;

    let url = host + path;
    let Options;
    if (file) {
        Options = {
            credentials: 'include',
            ...options
        }

    }
    else {
        Options = {
            credentials: 'include',
            headers: { "content-type": "Application/json" },
            ...options
        }
    }

    let response = await fetch(url, Options);


    let ok = response.ok;

    let data = await response.json();
    return [data, ok];
}