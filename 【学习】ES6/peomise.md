# Promise
## Promise的含义
Promise是异步编程的一种解决方案，比传统的解决方案--回调函数和事件--更合理和更强大。

所谓`promise`，简单来说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise是一个对象，从它可以获取异步操作的信息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。

`Promise`对象有以下两个特点。

（1）对象的状态不受外部影响。`Promise`对象代表一个异步操作，有三种状态：`Pending`（进行中）、`Fulfilled`（已成功）和`Rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是`Prtomise`这个名字由来，它的意思是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`Pending`变为`Fulfiled`和从`Pending`变为`Rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这是就称为Resolved（已定型）。如果该百年已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过它，再去监听，是得不到结果的。



`Promise`也有一些缺点。首先无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`Pending`状态时，无法得知目前进展到哪个阶段（刚刚开始还是即将完成）。



## resolve 和 reject

下面创建一个`Promise`实例。
```javascript
function helloWorld(flag){
    return new Promise(function(resolve, reject){
        if(flag){
            resolve('成功')
        }else{
            reject('失败')
        }
    }) 
}
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由Javascript引擎提供，不用自己部署。

- `resolve`函数作用：将Promise对象状态变为“成功”；一般在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。
- `reject`函数作用：将Promise对象状态变为“失败”；一般在异步操作失败时调用，并将异步操作的错误，作为参数传递出去。




## then 和 catch
`promise`实例生成以后，可以用`then`方法分别指定`Resolved`状态和`Rejected`状态的回调函数。

`then`方法可以接受两个回调函数作为参数。第一个回调函数是`Promise`对象的状态变为`Resolved`时调用，第二个回调函数是`Promise`对象的状态变为`Rejected`时调用。第二个参数是可选的。这两个函数都接受`Promise`对象传出的值作为参数。

`catch`方法是`then(onFulfiled, onRejected)`方法当中`onRejected`函数的一个简单的写法，也就是说可以写成`then(fn).catch(fn)`，相当于`then(fn).then(null, fn)`。使用`catch`的写法比一般的写法更清晰明确。


```javascript
helloWorld(true).then(function(){
    //success  `Resolved`状态
},function(){
    //failure  `Rejected`状态
})

//then..catch 方式
helloWorld(true).then(function(){
    //success  `Resolved`状态
}).catch(function(){
    //failure  `Rejected`状态
})
```



## Promise.all 和 Promise.race

`Promise.all`方法用于将多个Promise实例，包装成一个新的Promise实例。

`Promise.all`可以接收一个元素为Promise对象的数组作为参数，当这个数组里面所有的Promise对象都变为`resolve`时，该方法才会返回。

```javascript
var pro2 = new Promise((res, rej) => {
    setTimeout(function () {
        console.log('222');
        res('222');
    }, 5000);
})

var pro3 = new Promise((res, rej) => {
    setTimeout(function () {
        console.log('333');
        res('333');
    }, 1000);
})

var pro4 = new Promise((res, rej) => {
    setTimeout(function () {
        console.log('444');
        res('444');
    }, 4000);
})

Promise.all([pro2, pro3, pro4]).then(function(result){
    console.log(result)
})
// 333, 444, 222 
// [222, 333, 444]
```

注意点：`[pro2, pro3, pro4]`中的promise没有依赖关系，不会按顺序执行。但是返回的值都会按照顺序且返回一个数组。

`Promise.race`同样接收一个数组，不同的是只要数组中Promise对象中有一个率先改变状态（无论是resolve还是reject），该方法就会返回。



## Promise.resolve

有时需要将现有对象转为Promise对象，`Promise.resolve`方法就起到这个作用。
```javascript
var res = Promise.resolve('foo')
// 等价于
var res =  new Promise(resolve => resolve('foo'))
```

`Promise.reslove`方法的参数分为四种情况：

- 参数时Promise实例

  那么`Promise.resolve`将不做任何修改，原封不动地返回这个实例

- 参数是一个`thenable`对象（指的是具有`then`方法的对象）

  `Promise.resolve`方法会将这个对象转为Promise对象，然后就立即执行`thenable`对象的`then`方法。

  ```javascript
  let thenable = {
    then: function(resolve, reject) {
      resolve(42);
    }
  };

  let p1 = Promise.resolve(thenable);
  p1.then(function(value) {
    console.log(value);  // 42
  });
  ```

- 参数不是具有`then`方法的对象，或根本就不是对象

  返回Promise对象，状态为`Resolved`

- 不带有任何参数

  直接返回一个`	Resolved`状态的Promise对象。

  ​

## Promise.reject

`Promise.reject()`返回一个新的`Promise`实例，且该实例状态为`rejected`。

```js
var p = Promise.reject('出错了');
// 等同于
var p = new Promise((resolve, reject) => reject('出错了'))
```

注意：参数会原封不动的传递给后续方法的参数。（不会执行`thenable `中的`then` 方法）



## done 和 finally

**done**

Promise对象的回调链，不管以`then`方法或`catch`方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。因此，我们可以提供一个`done`方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。

```js
asyncFunc()
  .then(f1)
  .catch(r1)
  .then(f2)
  .done();
```



**finally**

`finally`方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与`done`方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。

```js
helloWorld(true)
  .then(function () {
    // run test
  })
  .finally(function(){
    // 必然执行
  });
```



# Demo实践

多个异步问题

```js
function pro(flag) {
    return new Promise((res, rej) => {
        if (flag) {
            res('success')
        } else {
            rej('fail')
        }
    })
}

function pro2() {
    return new Promise((res, rej) => {
        setTimeout(function () {
            console.log('222');
            res();
        }, 5000);
    })
}

function pro3() {
    return new Promise((res, rej) => {
        setTimeout(function () {
            console.log('333');
            res();
        }, 1000);
    })
}

function pro4() {
    return new Promise((res, rej) => {
        setTimeout(function () {
            console.log('444');
            res();
       }, 4000);
    })
}

function pro5() {
    return new Promise((res, rej) => {
        setTimeout(function () {
            console.log('555');
            res();
        }, 1000);
    })
}

pro(true)
    .then((res) => {
        console.log(res);
    })
    .then(pro2)
    .then(pro3)
    .then(pro4)
    .then(pro5)
    //success 222 333 444 555
```



单纯的回调，前者return值可以作为后续操作的参数

```js
function helloWorld(flag){
    return new Promise(function(resolve, reject){
        if(flag){
            resolve('成功')
        }else{
            reject('失败')
        }
    }) 
};

helloWorld(true).then(function (message) {
    return message;
}).then(function (message) {
    return message + ' World';
}).then(function (message) {
    return message + '!';
}).then(function (message) {
    alert(message);
});
// 成功 World!

helloWorld(false).then(function (message) {
    return message;
}).then(function (message) {
    return message + ' World';
}).then(function (message) {
    return message + '!';
}).then(function (message) {
    alert(message);
}).catch(function(message){
  	alert(message)
})
// 失败

```


































































