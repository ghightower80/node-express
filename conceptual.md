### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript? 
Some common ways of handling asynchronous code in javascript are callbacks, promises, and async/await.

- What is a Promise? 
A promise is a feature in javascript. It represents a value that can be available now, in the future or never.

- What are the differences between an async function and a regular function?
An async function will always return a promise. In asynchrony it allows the use of the await keyword inside the function. This waits for the function to resolve before continuing in to the next statement. This makes it easier to work with promises. 

A regular function returns a value using the return keyword and the value is returned immediatly. In asynchrony regular functions run synchronously and block the execution until the function completes. They can use callback or promises, but handling asynchronous operations would require more complicated patterns.
 
- What is the difference between Node.js and Express.js?
They are both technologies used for building web applications but they serve different purposes. Node is a runtime environment that allows you to use javascript on the server side. Express is a framework web application for Node. It provides features and tools to make Node easier to use. 

- What is the error-first callback pattern? 
It is a call back function used in Noden for asynchronous operations and reporting errors. A callback function is passed as an argument to an asynchronous function and is expected to be called back with two parameters. The first parameter is for errors and the second for a seccessful result.

- What is middleware? 
Middleware is the code that runs between the request being sent to the server and the actual response being returned to the user.

- What does the `next` function do?
 "Next" is a callback function that is passed to the middleware function and is used to pass control to the next middleware function or end the request-response cycle.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
The code uses 3 await requests. Each request has to wait for the previous to finish to start. This can lead to poor performance. The variable names are very specific and could be more general such as user1, user2, user3. The code also lacks error handling, 'try-catch' would solve the problem. 