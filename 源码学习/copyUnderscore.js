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
  if (((typeof exports) != 'undefined') && (!exports.nodeType)) {
    if (((typeof module) != 'undefined') && (!module.nodeType) && (module.exports)) {
      exports = module.exports = _;
    } else {
      root._ = _;
    }
    exports._ = _;
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

  // each/forEach遍历方式；_.each(list, iteratee, [context]) 
  // 遍历list中的所有元素，按顺序用每个元素当做参数调用 iteratee 函数。如果传递了context参数，则把iteratee绑定到context对象上。每次调用iteratee都会传递三个参数：(element, index, list)。如果list是个JavaScript对象，iteratee的参数是 (value, key, list))。返回list以方便链式调用。
  _.each = _.forEach = function (obj, iteratee, context) { 
    // 优化回调函数，默认走3，3个参数
    var iteratee = optimizeCb(iteratee, context)
    // 获取keys，如果是伪数组或数组，keys = false；如果是一般对象，keys为键集合;
    // length对应的为 obj.length 和 key.length
    // 获取索引，如果keys存在，是集合，键就是key[i]；如果keys是false，就是伪数组或者数组，键是i
    var key = (!isArrayLike(obj)) || (_.keys(obj)),
        length = (key || obj).length;
    for (let i = 0; i < length; i++) {
      var currentKey = key ? key[i] : i;
      // 回调函数，如JQ中obj.forEach((value, index, obj) => {})
      iteratee(obj[currentKey], currentKey, obj)
    }
  }

  // 检测给定的path是否是obj的固有属性，path可传入数组或伪数组
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
  // console.log(_.has({'1': '22', '22': '33'}, ['22', '1']));

  // 【暴露】判断是不是对象object，不包括null
  _.isObject = function (obj) { 
    var type = typeof obj;
    // 如果是function，一定是对象；如果是object，需要确定不是null，才能确定是对象
    return (type === 'function') || ((type === 'object') && (!!obj))
  }

  // 获取obj的key集合
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
  /* console.log(_.keys({'1': '11', '2': '22'}));
  console.log(_.keys([1, 2, 3, 4, 5, 6])); */

})()


