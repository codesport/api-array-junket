# JavaScript Array Functions Demo Project

Basic demo of using an API call and working with the returned data.

Home page uses "raw" React. And the `/ssr` page uses Server Side Rendering (SSR) via `getServerSideProps()`

Basic array management manipulation methods include:

* `pop`: mutates original array by dropping last element. Returns mutated array
* `shift`: drops first element, mutates original array, and returns mutated array
* `splice`: select range of elements from an array. Commonly used to truncate array length
* `indexOf`:  find the index of a specific item in your array. May be used to find index of an key:value pair within a nested array of objects

More detailed explanations are on Treehouse's blog post about [basic array methods](https://blog.teamtreehouse.com/javascript-basic-array-methods)

Advanced methods include `map`, `reduce`, `filter`, and the spread operator.

## Filter Method Examples

A detailed explanation is given within the [admin-panel](https://github.com/codesport/admin-panel/blob/main-final-public/src/components/Controller.js#L210-L228) code.  

Below are update/append, delete, and select examples with the filter method.

`const updatedArray = array.filter( item => item.id !== formJSON.id).concat(formJSON)`

`const deletedElement = array.filter( item => item.id !== id)`

`const selectedElement = array.filter( item => item.id === id )[0]`


## Map and Reduce Examples

The following uses both map and reduce simultaneoulsy. It was inspired by examples on [Code Barbarian](https://thecodebarbarian.com/javascript-reduce-in-5-examples.html):

```javascript
const mapReduce = result.map( (singleItem, Index) =>
        singleItem.id        
)        
.reduce( (previousValue, currentValue) =>
    previousValue + currentValue
)          
```

Below is a modified example from the canonical [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#try_it):

```javascript
const array1 = [1, 2, 3, 4];

const sumWithInitial = array1.reduce( (previousValue, currentValue, index, array) => {
  	
    console.log('Element ', index,' : ',  previousValue, currentValue);
    return previousValue + currentValue

});

console.log(sumWithInitial);
// expected output: 10
```

# Axios Get

```javascript
async function getUserData() { //or const getUserData = async () =>{}
    try {

        const response = await axios.get(url)  //NB:  Requests will default to GET if method is not specified.
        const  result = response.data
        return result

    } catch (error) {

        console.log(error)

    }
}
```