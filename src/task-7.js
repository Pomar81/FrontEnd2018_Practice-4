import { getJSON } from "./task-1.js";

export default function getSequential(urls) {
    const resultArr = [];
    let rethrow = false;

    let sequence = Promise.resolve();
    urls.forEach(url => {
        sequence = sequence
            .then(() => getJSON(url))
            .then(data => {
                resultArr.push(data);
                return resultArr;
            })
            .catch(err => {
                if (rethrow) {
                    throw err;
                }
                rethrow = true;
                throw new Error(`failed to fetch ${url}`);
            });
    });
    return sequence.then(() => resultArr);
/*

export default function getSequential(urls) {
    const promiseFactories = urls.map(url => function(arr) {
        return getJSON(url)
            .then(data => {
                arr.push(data);
                return arr;
            })
            .catch(err => {
                if ("rethrow" in err) {
                    throw err;
                }
                const newErr = new Error(`failed to fetch ${url}`);
                newErr.rethrow = true;
                throw newErr;
            });
    });

    let sequence = Promise.resolve([]);
    promiseFactories.forEach(promise => {
        sequence = sequence.then(promise);
    });
    return sequence;
}
*/


 /* export default async function getSequential(urls) {
    let result = [];
    for (const url of urls) {
        try {
            result.push(await getJSON(url));
        } catch (err) {
            throw new Error(`failed to fetch ${url}`);
        }
    };
    return result;
}
*/