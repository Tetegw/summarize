## python基础
- Python还允许用r''表示''内部的字符串默认不转义
- Python允许用'''...'''的格式表示多行内容
- Python中布尔值`首写字母`大写
- `and`,`or`,`not`
- 常量用`大写`表示，依旧可以改变
- %运算符就是用来格式化字符串的。在字符串内部，%s表示用字符串替换，%d表示用整数替换，有几个%?占位符，后面就跟几个变量或者值，顺序要对应好。如果只有一个%?，括号可以省略。
  ```python
  >>> 'Hello, %s' % 'world'
  'Hello, world'
  >>> 'Hi, %s, you have $%d.' % ('Michael', 1000000)
  'Hi, Michael, you have $1000000.'
  ```
- 变量classmates就是一个list。用len()函数可以获得list元素的个数，记得最后一个元素的索引是len(classmates) - 1，还可以用-1做索引。
- 追加元素到末尾`append()`,插入到指定的位置`insert(1， '')`，指定超出长度会加在最后，删除list末尾的元素`pop()`,要删除指定位置的元素，用`pop(i)`方法，返回删除元素。
- 另一种有序列表叫元组：tuple。tuple和list非常类似，但是tuple一旦初始化就不能修改。只有1个元素的tuple定义时必须加一个逗号,，来消除歧义(会认为其是小括号)`t = (1,)`。
- tuple所谓的“不变”是说，tuple的每个元素，指向永远不变。即指向'a'，就不能改成指向'b'，指向一个list，就不能改成指向其他对象，但指向的这个list本身是可变的！
- dict键值对，如果k值不存在，dist[k]会报错，要避免key不存在的错误，有两种办法，一是通过in判断key是否存在`'a' in dict`，返回True或者False，二是通过dict提供的get()方法，如果key不存在，可以返回None，或者自己指定的value。`d.get(k, -1)`。要删除一个key，用pop(key)方法，对应的value也会从dict中删除。
- 默认参数很有用，但使用不当，也会掉坑里。默认参数有个最大的坑。当默认参数是一个对象`[]`时，函数内部对此对象操作了`['a']`，那么再次调用时默认的参数变成了`['a']`，也就是说默认参数第一次调用时指向的地址，再次调用指向的地址不会变化。定义默认参数要牢记一点：默认参数必须指向不变对象！
- 函数的参数改为可变参数：`def calc(*numbers):`；所以Python允许你在list或tuple前面加一个*号，把list或tuple的元素变成可变参数传进去，所以相当于结解构复制。


