export default function makeQuery(object) {
    let string = []
    for (let key in object) {
        string.push(encodeURIComponent(key) + "=" + encodeURIComponent(object[key]))
    }
    return string.join("&")
}