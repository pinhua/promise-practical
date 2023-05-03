export enum PromiseState {
    pending = 'PENDING',
    resolved = 'RESOLVED',
    rejected = 'REJECTED',
}

export function whatIsTheSquaredResolvedValue(f: () => Promise<number>): Promise<number> {
    // return the squared of the resolved value of the promise returned by f
    // f is an asynchronous function
    // Promise returned by f will not throw an error

    const promise = f();
    return promise.then((resolvedValue) => {
        const squaredResolvedValue = resolvedValue ** 2; /* square the `resolvedValue` variable */
        return squaredResolvedValue;
    });
}

export function didItResolveOrReject(f: () => Promise<string>): Promise<PromiseState> {
    // Return PromiseState.resolved if the given promise returned by f resolves
    // else, return PromiseState.rejected.
    //
    // f is an asynchronous function
        
        return f()
        .then(
            function resolved() {
                return PromiseState.resolved
            },
            function rejected() {
                return PromiseState.rejected
            }
        )
}
export function whatAreTheirSquaredResolvedValue(fs: Array<() => Promise<number>>): Promise<Array<number>> {
    // Given an array of functions that each returns a different promise (e.g. [f1, f2, f3])
    // Return their resolved value in the same order (i.e. [1, 4, 9])
    //
    // Each function fi is an asynchronous function
    // Promise returned by each function fi will not throw an error
    let s = []
    for(let i = 0; i<fs.length; i++){
        s.push(fs[i]())
    }
    return Promise.all(s).then((value)=>{
        let result = value.map(x => x ** 2)
        return result
    })    
}

export function didTheyResolveOrReject(fs: Array<() => Promise<number>>): Promise<Array<PromiseState>> {
    // Given an array of promises (e.g. [f1, f2, f3])
    // Determine whether they resolved or rejected (i.e. ["RESOLVED", "REJECTED", "RESOLVED"])
    //
    // Reminder: You can use PromiseState.resolved and PromiseState.rejected instead of typing the string yourself.
    let s: Array<Promise<PromiseState>> = []
    for(let i = 0; i<fs.length; i++){
        s.push(fs[i]().then(
            function resolved() {
                return PromiseState.resolved
            },
            function rejected() {
                return PromiseState.rejected
            }
        ))
    }
    return Promise.all(s).then((value)=>{
        return value
        })
}

export function resolveConcurrently(fs: Array<() => Promise<number>>): Promise<Array<number>> {
    // Given an array of asynchronous functions that each returns a different promise.
    // Execute all promise concurrently (i.e. not one after another).
    //
    // Put each squared resolved value into an array in the same order (e.g. [f1,f2,f3] => [1,4,9])
    // All promises will resolve and not reject.

    let s = []
    for(let i = 0; i<fs.length; i++){
        s.push(fs[i]())
    }
    return Promise.all(s).then((value)=>{
        let result = value.map(x => x ** 2)
        return result
    })   
}

export function resolveSequentially(
    f1: () => Promise<number>,
    f2: (x: number) => Promise<number>,
    f3: (x: number) => Promise<number>,
): Promise<number> {
    // Given 3 asynchronous functions that each returns a different promise.
    // Execute f1, f2, and f3 sequentially
    // Pass the resolved value of the promise returned by f1 as parameter to f2
    // Pass the resolved value of the promise returned by f2 as parameter to f3
    // Return the squared of the resolved value returned by f3.
    return f1()
    .then(function (result){
        return f2(result)
    })
    .then(function (newResult){
        return f3(newResult)
    })
    .then(function(finalResult){
        return finalResult ** 2
    })
}

export function resolveArraySequentially(fs: Array<(x? : number) => Promise<number>>): Promise<number> {
    // Given an array of promises, execute them in order, sequentially.
    // The resolved value of the promise should be passed as parameter to the next function
    // much like in `resolveSequentially`
    //
    // Return the squared of the resolved value returned by the last promise.
    if(!fs.length){
        return Promise.resolve(0)
    }

    var p = fs[0]()
    for(let i = 1; i<fs.length; i++){
         p = p
            .then(function (result) {
               return fs[i](result)
            })
    }

    return p.then(function(result) {
        return result ** 2
    })
}

export function resolveSequentiallyAndConcurrently(
    fs: Array<Array<() => Promise<number>>>,
): Promise<Array<Array<number>>> {
    // See requirement in README.md
    //check if array is empty
    if(!fs.length){
        return Promise.resolve([])
    }
    //define an array s to store the resolved individual arrays
    let s: Array<Promise<number>> = []
    //iterate through the main array
    /*for(let i = 0; i<fs.length; i++){
        var p = fs[i][0]()
        //iterate through each inner array
        for(let j = 1; j<fs[i].length; j++){
            //resolve the promise
            fs[i][j]() 
            p = p
            .then(function(result){
                return fs[i][j]()
            })
        }
        s.push(p) //push the resolved promise into s
    }*/
    let promise = Promise.resolve();
    for(const i of fs){
        for(const j of i)
        promise = promise.then(()=>{
            return j();
        }).then((result)=>{
            s.push(result)
        })
    } 
    return Promise.all(s).then((value)=>{
        let result = value.map(x => x())
        return result
    })   
    //resolve the promises in s concurrently
    /*let promise  = Promise.resolve();
    const results: Array<number> =[]
    for(let i = 0; i<s.length; i++){
        promise = promise.then(() =>{
            return s[i];
        }).then((result)=>{
            results.push(result);
        });
    }
    return promise.then(() =>{
        return results
    })*/
}
