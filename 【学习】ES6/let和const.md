## let 和 const

```js
for (let i = 0,; i < 10; i++) {
  a[i] = function () {
   console.log(i) 
  }
}
a[6]()
// 6
```

上面代码中，变量`i`是`let`声明的，当前的`i`只在本轮循环中有效。



```js
for (let i = 0; i < 3; i++) {
  let i = 'abc'
  console.log(i)
}
// abc abc abc
```

`for`循环中设置循环变量的那部分是一个`父`作用域，而循环体内部是一个单独的子作用域。



```js
var temp = 123
if (true) {
  tmp = 'abc'
  let temp		// ReferenceError
}

=====================
typeof x
let x	// ReferenceError

typeof y // undefined
```

ES6明确规定，如果区块中有`let`或`const`命令，这个区块对这些命令声明的变量，从一开始就形成了一个封闭的作用域。凡是在声明前使用变量的，就会报错。称为“暂时性死区”。



```js
function func(arg) {
  let arg	// 报错
}
function func(arg) {
  {
    let arg	// 不报错
  }
}
```

`let`不允许在相同作用域内重复声明同一个变量。



```js
(function () {
  var temp = ''
  ...
})()

{
	let temp = ''
}
```

`let`实际上为javascript带来了块级作用域。



```js
if (true) {
  const max = 5
}
max	//报错
```

`const`和`let`一样，只在声明所在的块级作用域内有效、暂时性死区、不提升变量、不可重复声明。



`const`实际上保证的，并不是变量的值不得改变，而是变量指向的那个内存地址不得改动。对于简单数据类型来说，值就是保存在变量指向的那个内存地址。因此等同于常量。但对于复杂类型来说，变量指向的内存地址，保存的只是一个指针，`const`只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。



```js
var a = 1
window.a //1

let b = 1
window.b // undefined
```

从ES6开始，全局变量将逐步与顶层对象的属性脱钩。



