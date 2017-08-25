最近参考IMOOC基于Vue的音乐实战项目，自己模仿的写了一遍，整体来说收获很多。
接下来我会对整个项目进行简单的整理分析，希望能更深入理解，更深刻的掌握。因为涉及到知识点比较多，所以我打算分成四个模块来分析。

> [项目地址](https://github.com/Tetegw/vueMusic)

- Git
  - Git基础
  - Github
  - branch分支
  - 创建tag
- es6部分
  - Promise
  - 对象扩展
- 样式@2x/@3x处理

# 技术前提篇
## 一、Git
### 1.Git基础
Git是目前世界上最先进的分布式版本控制系统。

`集中式`版本控制系统，版本库是集中存放在中央服务器的，而干活的时候，用的都是自己的电脑，所以要先从中央服务器取得最新的版本。本地没有版本库，必须隔一段时间提交一次，才能创建出版本。

`分布式`版本控制系统根本没有“中央服务器”，每个人的电脑上都是一个完整的版本库，不需要联网了，因为版本库就在你自己的电脑上，可以不联网状态创建多个版本，回滚等操作。中央服务器可以用来交换多人之间的文件。


**工作区（Working Directory）**

电脑里能看到的目录

**版本库（Repository）**

工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。

Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的`暂存区`，还有Git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD，也就是`版本区`。

每次commit后，暂存区都是干净的。


![0.jpg](http://upload-images.jianshu.io/upload_images/5257856-046224f6be9f8c35.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- 创建仓库 `git init`

- 从工作区 => 暂存区 `git add`
    - `git add 文件名` 一个个添加
    - `git add -A` 或者 `git add .`全部添加
- 从暂存区 => 版本区 `git commit`
    - `git commit -m "描述"` 推送到版本区并描述
    - 如果一行不够，可以只执行`git commit`，就会跳出文本编译器，让你写多行。
        - feat：新功能（feature）
        - fix：修补bug
        - docs：文档（documentation）
        - style： 格式（不影响代码运行的变动）
        - refactor：重构（即不是新增功能，也不是修改bug的代码变动）
        - test：增加测试
        - chore：构建过程或辅助工具的变动
- 查看仓库状态 `git status`
- 查看不同 `git diff`
    - `git diff` 查看工作区和暂存区不同（add之前和之后）
    - `git diff --cached` 查看暂存区和版本区不同（commit之前和之后）
    - `git diff HEAD` 查看工作区和版本区不同
    - `git diff SHA1 SHA2` 查看两个版本之间区别
    - `git diff test` 查看当前分支和test分支不同
- 查看提交记录 `git log`
    - `git log --pretty=oneline` 一行简化显示
- 版本穿梭 `git reset`
    - `git reset --hard HEAD^` 版本回退到上一个版本（HEAD~100上前100个版本）
    - `git reset --hard commit_id` 版本回到指定版本号，可以去到未来
- 操作记录查看 `git reflog`
- 丢弃工作区的修改 `git checkout -- file`
    - 命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：
    - 一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
    - 一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
    - 总之，就是让这个文件回到最近一次git commit或git add时的状态。
- 删除文件
    - 删除后提交，就能删除版本区文件
    - 误删除后，`git checkout -- file`将最后的版本恢复到工作区

---
### 2.Github
从名字就可以看出，这个网站就是提供Git仓库托管服务的，所以，只要注册一个GitHub账号，就可以免费获得Git远程仓库。

由于你的本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，所以可以将本地电脑和Github通过密钥联系起来，提交时不需要帐号密码。

- 第1步：创建`SSH Key`。在用户主目录下，看看有没有`.ssh`目录，如果有，再看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：
    ```bash
    $ ssh-keygen -t rsa -C "youremail@example.com"
    ```
- 第2步：登陆GitHub，打开“settings”，“SSH and GPG keys”页面；
  然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容。

- 第3步：创建新的远程仓库，可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联
    ```bash
    # 添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的。
    $ git remote add origin 仓库地址

    # 用git push命令，实际上是把当前分支master推送到远程
    # 第一次加上了-u参数，会把本地的master分支和远程的master分支关联起来。
    $ git push -u origin master

    # 之后push到远程仓库，origin指的是远程仓库名，origin master可省略
    $ git push origin master

    # 最好的方式是先创建远程库，然后，从远程库克隆。
    $ git clone 地址
    ```
---
### 3.branch分支
分支就是科幻电影里面的平行宇宙，当你正在电脑前努力学习Git的时候，另一个你正在另一个平行宇宙里努力学习SVN。

现在有了分支，就不用怕了。你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。

- 创建分支 `git branch dev`
- 切换分支 `git checkout dev`
    - 创建并切换 `git checkout -b dev`
- 查看当前分支 `git branch`
- 合并分支（dev完成，切换master后，合并）`git merge dev`
    - `git merge dev`将dev分支合并到当前分支、
- 删除分支 `git branch -d dev`
    - `git branch -D <name>`强行删除未合并的分支，放弃分支

#### 分支冲突
当你在dev分支中修改了文件，并且切回master后也修改了文件，再次merge时可能会产生冲突，需要找到文件手动修改，最后再次提交add、commit。最终分支图如下：


![0.png](http://upload-images.jianshu.io/upload_images/5257856-80020b057fb3eb30.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 禁用快速合并
通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。如果要强制禁用Fast forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

下面我们实战一下--no-ff方式的git merge：
```bash
# 从dev分支合并到当前分支，保留合并历史，并产生新的commit和描述
git merge --no-ff -m "merge with no-ff" dev
```
在实际开发中，我们应该按照几个基本原则进行分支管理：

首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。

所以，团队合作的分支看起来就像这样：


![1.png](http://upload-images.jianshu.io/upload_images/5257856-d1302d75261c5866.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### bug分支
当你接到一个修复一个代号101的bug的任务时，很自然地，你想创建一个分支issue-101来修复它，但是，等等，当前正在dev上进行的工作还没有提交；并不是你不想提交，而是工作只进行到一半，还没法提交，预计完成还需1天时间。但是，必须在两个小时内修复该bug，怎么办？
幸好，Git还提供了一个stash功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：
```bash
# 储藏
$ git stash

#切换到想要修复的分支,创建bug分支，修复
$ git checkout master
$ git checkout -b issue-101

# 提交后，切回master分支，merge分支，删除原分支
$ git checkout master
$ git merge --no-ff -m "merged bug fix 101" issue-101
$ git branch -d issue-101

# 切换会dev分支，查看list，恢复并删除冷藏内容
$ git checkout dev
$ git stash list （注意这里）
$ git stash pop
```

#### 多人合作
- 首先，可以试图用git push origin branch-name推送自己的修改；
- 如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
- 如果合并有冲突，则解决冲突，并在本地提交；
- 没有冲突或者解决掉冲突后，再用git push origin branch-name推送就能成功！
- 如果git pull提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream branch-name origin/branch-name。


### 4.创建tag
Git的标签虽然是版本库的快照，但其实它就是指向某个commit的指针；tag就是一个让人容易记住的有意义的名字，它跟某个commit绑在一起。

```bash
#敲命令git tag <name>就可以打一个新标签：
$ git tag <name>
# 可以用命令git tag查看所有标签：
$ git tag
# 可以给commit id打上标签
$ git tag v0.9 6224937
# 查看标签信息
$ git show v0.9
# 还可以创建带有说明的标签，用-a指定标签名，-m指定说明文字：
$ git tag -a v0.1 -m "version 0.1 released" 3628164
# 如果标签打错了，也可以删除：
$ git tag -d v0.1
# 创建的标签都只存储在本地,如果要推送某个标签到远程，使用命令
$ git push origin <tagname>
# 如果标签已经推送到远程，要删除远程标签就麻烦一点，先从本地删除：
$ git tag -d v0.9
# 从远程删除。删除命令也是push
$ git push origin :refs/tags/v0.9
```


> [廖雪峰Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

## 二、es6部分
### 1.Promise
#### 介绍
看过几篇文章都没有下面这篇简洁明了：
> [谈谈 ES6 的 Promise 对象](https://segmentfault.com/a/1190000002928371)

#### 注意点：

- Promise 对象有三种状态：
    - Fulfilled 可以理解为成功的状态
    - Rejected 可以理解为失败的状态
    - Pending 既不是 Fulfilld 也不是 Rejected 的状态，可以理解为 Promise 对象实例创建时候的初始状态

- then 方法就是根据 Promise 对象的状态来确定执行的操作，resolve 时执行第一个函数（onFulfilled）

- then 可以使用链式调用的写法原因在于，每一次执行该方法时总是会返回一个 Promise 对象。另外，在 then onFulfilled 的函数当中的返回值，可以作为后续操作的参数

- catch 方法是 then(onFulfilled, onRejected) 方法当中 onRejected 函数的一个语法糖，也就是说可以写成 then(fn).catch(fn)，相当于 then(fn).then(null, fn)。使用 catch 的写法比一般的写法更加清晰明确。


#### 最佳实践
**多个异步问题**

res执行，才会继续下面then()
```javascript
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

**Promise.all**

1. Promise.all() 数组中所有promise都执行完，再执行then
2. 但是数组中不会按照顺序执行
3. 但是返回的值都会按顺序，返回一个数组

```javascript
var pro2 = new Promise((res, rej) => {
    setTimeout(function () {
        console.log('222');
        res();
    }, 5000);
})

var pro3 = new Promise((res, rej) => {
    setTimeout(function () {
        console.log('333');
        res();
    }, 1000);
})

var pro4 = new Promise((res, rej) => {
    setTimeout(function () {
        console.log('444');
        res();
    }, 4000);
})

var pro5 = function () {
    console.log('555');
}

Promise.all([pro2, pro3, pro4]).then(pro5)
// 333 444 222 555
```

**单纯的回调**

前者return值可以作为后续操作的参数
```javascript
printHello(true).then(function (message) {
    return message;
}).then(function (message) {
    return message + ' World';
}).then(function (message) {
    return message + '!';
}).then(function (message) {
    alert(message);
});
```


### 2.对象扩展

- 属性的简洁表示
- Object.assign 对象合并（浅拷贝）
- 属性可枚举性
    - ES5 有三个操作会忽略enumerable为false的属性。
        - for...in循环：只遍历对象自身的和继承的可枚举的属性（返回继承的属性）
        - Object.keys()：返回对象自身的所有可枚举的属性的键名
        - JSON.stringify()：只串行化对象自身的可枚举的属性
    - ES6 新增了一个操作Object.assign()，会忽略enumerable为false的属性
- 对象的扩展运算符
    - 解构赋值必须是最后一个参数，否则会报错。 
        ```
        let { ...x, y, z } = obj; // 句法错误
        let { x, ...y, ...z } = obj; // 句法错误
        ```
    - 扩展运算符
        ```
        let z = { a: 3, b: 4 };
        let n = { ...z };
        n // { a: 3, b: 4 }
        ```

### 3.class
基本上，ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

```javascript
// es5
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);

//es6
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

## 三、样式@3x处理

@2x和@3x图片处理 mixin
```css
bg-image($url)
    background-image: url($url + "@2x.png")
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
        background-image: url($url + "@3x.png")
```

扩大点击范围
```css
extend-click()
    position: absolute
    &:before
        content: ''
        position: absolute
        top -10px
        left -10px
        bottom -10px
        right -10px
```

一像素边框 公用类
```css
.border_1px
	position: relative;
.border_1px:after
	width: 100%;
	content: '';
	display: block;
	position: absolute;
	left: 0;
	bottom: 0;
	border-top: 1px solid $color-highlight-background;

@media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)
	.border_1px:after
		-webkit-transform: scaleY(0.7);
		transform: scaleY(0.7);

@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2)
	.border_1px:after
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	
@media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
	.border_1px:after
		-webkit-transform: scaleY(0.3);
		transform: scaleY(0.3);
```