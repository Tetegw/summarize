# git

git 全局配置

```bash
$ git config --global user.name "Tetegw"
$ git config --global user.email "1151832942@qq.com"
```



git 初始化

```bash
$ git init
```



## 时光穿梭

```bash
$ git status								//查看状态
$ git add <-A>								//添加到暂存区
$ git commit -m "描述文字"					  //添加到版本区
$ git diff 文件名							  //查看工作区文件变化
$ git log <--pretty=oneline>				  //打印文件日志
```



回退

```bash
$ git reset --head <HEAD^|commitId>				//版本区回退
$ git diff HEAD -- 文件名						//查看`工作区`和`版本区`最新版代码区别

$ git checkout -- 文件名						//撤销工作区的文件修改(到最后一次add或者commit时)
$ git reset HEAD 文件名						//将暂存区文件回退至工作区
```



## 远程仓库

```bash
$ ssh-keygen -t rsa -C "邮箱地址"				//创建公钥和私钥

$ git remote add origin git仓库地址				//关联本地和远程仓库
$ git push -u origin master					   //第一次将本地master推送到远程master
```



## 分支管理

```bash
$ git branch								  //查看分支情况
$ git branch 分支名							//新建一个新的分支
$ git checkout 分支名							//切换到其它分支
$ git checkout -b 分支名						//创建一个新分支并切换
$ git merge 分支名								//将某个分支合并到当前分支
$ git merge --no-ff -m "合并信息" 分支名		   //强制禁用fast forward，merge时生成新的commit
$ git branch -d 分支名							 //删除分支

$ git stash 								  //暂存工作区文件(已被git管理的)
$ git stash list							  //暂存的列表
$ git stash pop								  //将暂存的应用
```





