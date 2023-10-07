## My flans for completing this project
1. Build all layouts
2. Learn about asynchronous JavaScript.
3. Build interactivity using asynchronous functions for fetching data from backend

# Async JS
- **Callbacks**: A callback is a function that is passed as an argument to another function and is executed when the first function completes its task. Callbacks are commonly used to handle asynchronous code in JavaScript, such as when making an AJAX request or setting a timeout. However, callbacks can lead to "callback hell" when you have multiple nested callbacks, which can make your code difficult to read and maintain. <br><br>

```
SetTimeout() and setInterval() methods
 console.log(1);
 setTimeout(()=>{
   console.log(2);
 }, 2000)
 console.log(3);
```







-**Promises**: Promises are a cleaner and more flexible way to handle asynchronous code than callbacks. A promise is an object that represents a value that may not be available yet, but will be at some point in the future. Promises can be in one of three states: pending, fulfilled, or rejected. You can use the then() method to handle the fulfillment of a promise, and the catch() method to handle any errors that occur. <br><br>
```
function promise(){
new Promise((resolve, reject)=>{
  fetch('url')
  .then(response => )
})
}
```
-**Async/await**: Async/await is a newer syntax for handling asynchronous code in JavaScript that was introduced in ES2017. Async/await is built on top of promises and provides a cleaner and more concise way to write asynchronous code. Async/await allows you to write asynchronous code that looks and behaves like synchronous code, making it easier to read and understand.

```
const api = "https://645508aef803f34576386931.mockapi.io/thexasan";
async function fetchData(){
  try {
    const response = await fetch(api);
    const data = response.json();
    getData(data)
  } catch (error) {
    console.error(error);
  }
}
```

