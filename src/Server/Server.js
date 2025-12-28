export default async function server(path, options = {}) {

    let host = import.meta.env.VITE_SERVER;

    let url = host + path;

    let response = await fetch(url, {
        credentials: 'include',
        Headers: { "Content-Type": "Application/json" },
        ...options
    })

    let ok = response.ok;

    let data = await response.json();
    if (data) {
        return [data, ok];
    }
    else {

    }

}