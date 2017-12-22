/* 
 * copy underscore 1.8.3
 * 静下心来，把underscore敲一遍
 */ 

 // 自执行函数，沙箱模式
(function () { 
  // 定义root，判断在`浏览器`或者`Node环境`以及`其他this`的环境
  var root = ((((typeof self === 'object') && (self.self === self) && self) || ((typeof global === 'object') && (global.global === global) && global)) || this) || ({})
  
  // 简化常用原型，压缩后可简化单个字母
  var ArrayProto = Array.prototype,
      ObjProto = Object.prototype;

  // 简化常用Array和Object方法，压缩后可简化单个字母
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // 简化ES5常用方法，压缩后可简化单个字母
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create;
  // todo: 具体用处

  // 定义_构造函数
  var _ = function (obj) {
    if(obj instanceof _) return obj; 
    if(!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  }
  // var res = _([])
  /* 
    调用_([])：
    this => window，执行了new _([]),创建新的实例；
    this => _的实例，因为_是一个构造函数，里面的this指向构造函数的实例；
    实例的_wrapped 被赋予 []，也就是(实例的_wrapped)继承了[]的方法，且实例继承_的方法。
  */

  // 判断是不是node环境，nodeType是为了判断如果在浏览器环境，保证exports和module不是elements
  // 如果不是Node环境，root为window对象，root._ = _暴露出来
  if (((typeof exports) != 'undefined') && (!exports.nodeType)) {
    if (((typeof module) != 'undefined') && (!module.nodeType) && (module.exports)) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // 版本号，静态属性
  _.VERSION = '1.8.3';
  
  // 优化callback函数
  // func => 回调函数； context => 运行环境； argCount => 参数个数
  var optimizeCb = function (func, context, argCount) { 
    if (context === (void 0)) { return func };
    switch (argCount) {
      case 1:
        return function (value) {
          return func.call(context, value)
        }
      case null:
      case 3: 
        return function (value, index, collection) { 
          // 运行环境绑定context
          return func.call(context, value, index, collection)
        }
      case 4:
        return function (accumulator, value, index, collection) { 
          return func.call(context, accumulator, value, index, collection)
        }
      default:
        break;
    }
    return function () {
      func.call(context, arguments)
    }
  }

  // 获取对象属性
  var shallowProperty = function (key) { 
    return function (obj) { 
      return (obj == null) ? (void 0) : obj[key]
    }
  }

  // 获取集合的长度
  var getLength = shallowProperty('length')

  // 定义最大数字
  var MAX_ARRAY_INDEX = (Math.pow(2, 53) - 1)

  // 判断是不是数组或者伪数组
  var isArrayLike = function (collection) { 
    var length = getLength(collection)
    return ((typeof length === 'number') && length >=0 && length <= MAX_ARRAY_INDEX)
  }
  // console.log(isArrayLike({'1': '22', length: 1}));

  // 【暴露】each/forEach遍历方式；_.each(list, iteratee, [context]) 
  // 遍历list中的所有元素，按顺序用每个元素当做参数调用 iteratee 函数。如果传递了context参数，则把iteratee绑定到context对象上。每次调用iteratee都会传递三个参数：(element, index, list)。如果list是个JavaScript对象，iteratee的参数是 (value, key, list))。返回list以方便链式调用。
  _.each = _.forEach = function (obj, iteratee, context) { 
    // 优化回调函数，默认走3，3个参数
    var iteratee = optimizeCb(iteratee, context)
    // 获取keys，如果是伪数组或数组，keys = false；如果是一般对象，keys为键集合;
    // length对应的为 obj.length 和 key.length
    // 获取索引，如果keys存在，是集合，键就是key[i]；如果keys是false，就是伪数组或者数组，键是i
    var key = (!isArrayLike(obj)) && (_.keys(obj)),
        length = (key || obj).length;
    for (let i = 0; i < length; i++) {
      var currentKey = key ? key[i] : i;
      // 回调函数，如JQ中obj.forEach((value, index, obj) => {})
      iteratee(obj[currentKey], currentKey, obj)
    }
  }

  // 【暴露】map/collect 遍历映射；_map(list, iteratee, [context])
  _.map = _.collect = function (obj, iteratee, context) { 
    // 优化回调函数，默认走3，3个参数
    var iteratee = optimizeCb(iteratee, context)
    // 获取keys，如果是伪数组或数组，keys = false；如果是一般对象，keys为键集合;
    // length对应的为 obj.length 和 key.length
    // 获取索引，如果keys存在，是集合，键就是key[i]；如果keys是false，就是伪数组或者数组，键是i
    var key = (!isArrayLike(obj)) && (_.keys(obj)),
        length = (key || obj).length,
        // 给定固定长度，性能会好
        // 自己加入了判断，可以遍历对象
        result = key ?  new Object() : new Array(length)
    for (let i = 0; i < length; i++) {
      var currentKey = key ? key[i] : i;
      // 回调函数，如JQ中obj.forEach((value, index, obj) => {})
      result[currentKey] = iteratee(obj[currentKey], currentKey, obj)
    }
    return result;
  }

  // 【暴露】获取obj的key集合
  _.keys = function (obj) {
    // 如果不是对象，返回一个空数组当为集合
    if(!(_.isObject(obj))){ return [] }
    // 如果ES5原生keys方式存在，调用Object.keys()
    if(nativeKeys) { return nativeKeys(obj) }
    // 走最原始方法，forin遍历出所有的key
    var keys = [];
    for (var key in obj) {
      if (_.has(obj, key)) {
        array.push(key)
      }
    }
    return keys;
  }

  // 【暴露】检测给定的path是否是obj的固有属性，path可传入数组或伪数组
  // 对象是否包含给定的键吗？等同于object.hasOwnProperty(key)，但是使用hasOwnProperty 函数的一个安全引用，以防意外覆盖。
  _.has = function (obj, path) { 
    if (!isArrayLike(path)) { return (obj != null) && hasOwnProperty.call(obj, path) }
    
    var length = path.length;
    for (let i = 0; i < length; i++) {
      var key = path[i];
      if ((obj == null) || !hasOwnProperty.call(obj, key)) {
        return false
      }
      // obj = obj[key]     todo: 源码这里是不是有问题？？
    }
    return !!(path.length)
  }

  // 【暴露】判断是不是对象object，不包括null
  _.isObject = function (obj) { 
    var type = typeof obj;
    // 如果是function，一定是对象；如果是object，需要确定不是null，才能确定是对象
    return (type === 'function') || ((type === 'object') && (!!obj))
  }

  // 根据传入的参数正负数判断正序和倒序，创建一个createReduce函数
  var createReduce = function (dir) { 
    var reducer = function (obj, iteratee, memo, initial) { 
      // 如果dir为正数，按顺序循环，否者倒序。
      var keys = (!isArrayLike(obj)) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // 如果没有初始化值，默认第一个为默认值
      if (!initial) {
        memo = obj[ keys ? keys[index]: index ]
        index += dir
      }
      // 遍历执行回调函数，赋值给memo，最终return出去
      for (; (index >= 0) && (index < length); index += dir) {
        var currentKey = keys ? keys[currentKey] : index
        memo = iteratee(memo, obj[currentKey], currentKey, obj)
      }
      return memo
    }
    return function (obj, iteratee, memo, context) {
      // 判断如果参数个数大于等于3，说明有初始值memo，否则没有初始值
      var initial = (arguments.length >= 3)
      var iteratee = optimizeCb(iteratee, context, 4)
      return reducer(obj, iteratee, memo, initial)
    }
  }
  // 【暴露】迭代函数，回调函数参数(meno, value, index, obj)
  // reduce方法把list中元素归结为一个单独的数值。Memo是reduce函数的初始值，会被每一次成功调用iteratee函数的返回值所取代 。这个迭代传递4个参数：memo,value 和 迭代的index（或者 key）和最后一个引用的整个 list。
  // 如果没有memo传递给reduce的初始调用，iteratee不会被列表中的第一个元素调用。第一个元素将取代memo参数传递给列表中下一个元素调用的iteratee函数
  _.reduce = _.foldl = _.inject = createReduce(1)
})()


