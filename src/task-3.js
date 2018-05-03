import { getJSON } from "./task-1.js";


export default function getSeries(url1, url2) {
    const result = [];
    let rethrow = false;
    return getJSON(url1)
        .then(data => {
            result.push(data);
            return result;
        })
        .catch(() => {
            rethrow = true;
            throw new Error("First fetch failed");
        })
        .then(() => getJSON(url2))
        .then(data => {
            result.push(data);
            return result;
        })
        .catch(err => {
            if (rethrow) {
                throw err;
            }
            throw new Error("Second fetch failed");
        });
}
