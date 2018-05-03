
export default class EnhancedPromise extends Promise {
    static some(promises, count) {

        return new EnhancedPromise((resolve, reject) => {
            let resolvedCount = 0,
                rejectedCount = 0;
            const resolvedData = [];

            function resolveHandler(data) {
                resolvedData.push(data);
                if (++resolvedCount >= count) { // ключ к решению!!!
                    resolve(resolvedData);
                }
            }

            function rejectHandler() {
                ++rejectedCount;
                if (promises.length - rejectedCount < count) { // ключ к решению!!!
                    reject(new Error());
                }
            }

            if (!promises.length) {
                resolve([]);
            }

            if (count > promises.length) {
                reject(new Error());
            }

            for (const promise of promises) {
                promise
                    .then(resolveHandler)
                    .catch(rejectHandler);
            }
        });
    }
}
