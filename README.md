[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=10963497)
# Promise Practical

## Setup

Run `npm install` - Installs necessary packages

## Solving

Modify the functions in `./src/questions.ts` accordingly.

> The `.ts` extension is for `typescript`. The purpose is to provide some type checking which should assist you in the development. You can write your solution in pure JavaScript.

## Running Tests

Run `npm run [TEST-NAME]` e.g. `npm run whatIsTheSquaredResolvedValue`

See full list of test names in `package.json`

# Questions

For all question, you are NOT allowed to use async-await. You are only allowed to use promises.

## Q1: whatIsTheSquaredResolvedValue

You are given a function that returns a promise that resolves to a number, example:

```js
function foo() {
    return Promise.resolve(3);
}
```

You are to return a promise that resolves to the squared resolved value, in this case, your function should return a promise to resolve to the value `9`.

As a warm up, here's a skeleton of the solution:

```js
export function whatIsTheSquaredResolvedValue(f: () => Promise<number>): Promise<number> {
    // return the squared of the resolved value of the promise returned by f
    // f is an asynchronous function
    // Promise returned by f will not throw an error

    const promise = f();
    return promise.then((resolvedValue) => {
        const squaredResolvedValue = 0; /* square the `resolvedValue` variable */
        return squaredResolvedValue;
    });
}
```

> Run `npm run whatIsTheSquaredResolvedValue` to test your solution.

---

## Q2: didItResolveOrReject

You are given a function that returns a promise that either resolves or reject. Example:

```js
// This resolves
function foo() {
    return Promise.resolve(1);
}

// This rejects
function bar() {
    return Promise.reject(1);
}
```

You are to detect whether it resolved or rejected. If it resolves, return a promise that resolves to `PromiseState.resolved`. Else return a promise that resolves to `PromiseState.rejected`. Example:

```js
...
    ._____(() => PromiseState.resolved)
    ._____(() => PromiseState.rejected)
```

> Run `npm run didItResolveOrReject` to test your solution.

---

## Q3: whatAreTheirSquaredResolvedValue

You are now given an array of function. Each function returns a promise that resolves to an integer. Example

```js
[() => Promise.resolve(1), () => Promise.resolve(2), () => Promise.resolve(3)];
```

You are to return a promise that resolves to an array with their corresponding squared the resolved value, note that the order matters. In this case:

```js
Promise.______(...)
    .then((...) => {
        ...
        return [1, 4, 9]
    })
```

---

## Q4: didTheyResolveOrReject

Combination of Q2 and Q3.

You get an array of function. Each function returns a promise that resolves or rejects. Example

```js
[() => Promise.resolve(1), () => Promise.reject(2), () => Promise.resolve(3)];
```

You are to return a promise that resolves to an array with PromiseState.resolved if the corresponding promise resolved, else PromiseState.rejected. In this case:

```js
Promise.______(...)
    .then((...) => {
        ...
        return [PromiseState.resolved, PromiseState.rejected, PromiseState.resolved]
    })
```

---

## Q5: resolveConcurrently

Same as Q3, but it must be done concurrently

Graphically:

![concurrent](https://www.plantuml.com/plantuml/png/SoWkIImgAStDuG8pkDBoYxAv51Ii3At1f9QXBP054bH8J4_Cp0C96bc3IIqZMnDqAMDhCAbbR6jfpPMQbw80Diugsb17mKH7mJBM6cXBVW6N0r0AQ2K0)

> Your solution to Q3 may already solve Q5.

---

## Q6: resolveSequentially

You are given 3 functions, each function takes in an integer as parameter and return a promise that resolves to a number. Example:

```js
const f1 = () => Promise.resolve(1);
const f2 = (x) => Promise.resolve(x + 2);
const f3 = (x) => Promise.resolve(x + 3);
```

1. You are to execute f1, and pass the resolved value to f2.
2. You will then pass the resolved value from f2 into f3.
3. And lastly, return the squared value of the resolved value from f3

Effectively:

```js
f1(); // resolves to 1
f2(1); // resolves to 1 + 2 = 3
f3(3); // resolves to 3 + 3 = 6
return Promise.resolve(36); // 6 * 6 = 36
```

Graphically:

![sequential-3](https://www.plantuml.com/plantuml/png/SoWkIImgAStDuG8pk1GKhD8CDJGLR1KChS4S8mr34CyOmZFMC0RnpC0yCoqpa0oGKroINy3ba9gN0ZG80000)

---

## Q7: resolveArraySequentially

Same as Q6, but you are given an array or varying length instead.

---

## Q8: resolveSequentiallyAndConcurrently

> This is a combination of `Q5` and `Q7`.

Given an array of arrays, where each array contains a set of asynchronous functions that return promises, write a function that:

1. executes the promises in each inner array sequentially, and
2. executes each of the inner arrays concurrently.

The function should return a new array of arrays containing the resolved values of the original promises in the same order as the input. All promises are guaranteed to resolve, not reject.

### Example:

```js
fs = [
    [() => Promise.resolve(1), () => Promise.resolve(2)], // array 1
    [() => Promise.resolve(3)], // array 2
    [() => Promise.resolve(4), () => Promise.resolve(5), () => Promise.resolve(6)], // array 3
];

resolveSequentiallyAndConcurrently(fs);

// should return  [[1, 2], [3], [4, 5, 6]]
```

The sequence of the process:

![explanation](https://www.plantuml.com/plantuml/png/SoWkIImgAStDuG8pkDBoYxAv51Ii3Ar1f94rM40XCJqnCmyaO8mkO09MPmecpQovKlDI540AWARb5t0v0Bb0em40)
