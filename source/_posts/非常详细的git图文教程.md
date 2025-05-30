---
title: 非常详细的git图文教程
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2025-05-30 07:45:48
tags: git
---
> 转载自: [https://blog.csdn.net/Javachichi/article/details/140660754](https://blog.csdn.net/Javachichi/article/details/140660754)


### Git安装

###### 安装

1.先去官网下载这个软件, 准备安装到本电脑中

> https://git-scm.com/

2.根据自己电脑系统下载此软件到本机

> Windows 系统直接下载 `.exe` 文件即可，[macOS 系统](https://so.csdn.net/so/search?q=macOS%20%E7%B3%BB%E7%BB%9F&spm=1001.2101.3001.7020)使用 `Homebrew` [命令行安装](https://so.csdn.net/so/search?q=%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%AE%89%E8%A3%85&spm=1001.2101.3001.7020)，终端输入 `git --version` 确认安装

![](https://i-blog.csdnimg.cn/blog_migrate/6422c4910e90438a736ea45a29f107a5.jpeg)

3.默认选择默认安装路径即可，如若想更改路径，务必使用英文路径

4.对于 Windows 系统，查看安装是否成功: 在任意文件夹右键，查看是否有`Git Base Here` 选项，有就成功了

![](https://i-blog.csdnimg.cn/blog_migrate/e94b3057d597eab77c7e6a26f6c9f9da.jpeg)

###### 介绍

Git 的三个区域：

-   **工作区：** 处理工作的区域
    
-   **暂存区：** 临时存放的区域
    
-   **本地git仓库：** 最终的存放区域
    

在文件夹的体现如下：

-   **工作区：** 在你电脑里看到的目录
    
-   **暂存区：** 在.git文件夹内的index中 (二进制记录)
    
-   **版本库：** 指的整个.git文件夹 (也认为是本地仓库)
    

在代码中的体现如下：

![](https://i-blog.csdnimg.cn/blog_migrate/18e6483d9ddd80a458849cb610a8e5aa.jpeg)

### Git使用

官方文档：教程链接\[1\]

菜鸟教程：教程链接\[2\]

###### Git配置

安装完 Git 之后，要做的第一件事就是设置你的用户名和邮件地址。因为每一个 Git 提交都会使用这些信息

命令格式如下：中文自己看情况换

-   **git config：** 固定命令，设置git相关配置
    
-   **–global：** 全局配置；一次配置，整机在使用git时都生效
    

```auto
git config --global user.name 你的用户名  
git config --global user.email 你的邮箱地址  

```

运行命令效果如下：

![](https://i-blog.csdnimg.cn/blog_migrate/79299b35520aec2607aa9fc32f60bd74.jpeg)

配置后，可以运行如下命令查看是否成功

```auto
git config --list  
#如果信息太多，可以输入 q 退出  

```

运行命令效果如下：

![](https://i-blog.csdnimg.cn/blog_migrate/a489e67d87b209e85eb2301fa8fcecd8.jpeg)

出现以上内容即为注册成功。如果后续想要修改，只需要重新执行一下命令即可

###### 文件右侧标记

一般使用 VSCode 打开一个包含git仓库的文件夹时，会有这些标记

![](https://i-blog.csdnimg.cn/blog_migrate/9dc69ba3fb42022c6239ecd396350a9e.jpeg)

右侧没有标记的时候为未修改 或 此文件/文件夹，被git忽略不跟踪变化

-   **M：已修改（Modified）** - 文件已被修改但还没有被添加到暂存区
    
-   **A：已添加（Added）** - 文件已经被添加到暂存区，但还没有被提交
    
-   **D：已删除（Deleted）** - 文件已经被删除，并且已经被标记为删除，但还没有提交
    
-   **R：已重命名（Renamed）** - 文件已经被重命名，这也算作是一种修改，需要被添加到暂存区
    
-   **C：已复制（Copied）** - 文件已经被复制，这也算作是一种修改，需要被添加到暂存区
    
-   **U：已更新但未融合（Updated but Unmerged）** - 这表示一个文件已经被更新了，但在合并时发生了冲突，需要手动解决冲突后再标记为已解决
    

###### Git基础命令

**初始化空的Git仓库**

新建一个文件夹或现有的文件夹并不是 git 仓库，因为文件夹内不包含 `.git` 文件夹，没有被 git 管理

可以在新文件夹或现有文件夹，运行如下命令得到 `.git` 文件夹，初始化成功则可让 git 开始准备管理

```auto
# 初始化 git 仓库, 产物: .git 文件夹 (所在文件夹"内"被管理)  
git init  

```

例如，在新文件夹中输入`git init`命令用于初始化空的git版本库

![](https://i-blog.csdnimg.cn/blog_migrate/2ee8f377adb31590ce29c90a8a829bcc.jpeg)

初始化空的 git 仓库成功后，在项目文件夹中，开启显示隐藏文件，即可查看 `.git` 文件夹

-   对于 Windows 系统，在查看里面勾选隐藏的项目选项
    
-   对于 macOS 系统，使用快捷键`Command + Shift + .`切换隐藏文件显示
    

**记录更新到Git仓库**

每当完成了一个阶段的目标，想要记录下它时，就将它提交到仓库

核心操作：`工作区开发`—>`将修改后的文件添加到暂存区`—>`将暂存区的文件记录到版本库`

把工作区变化放到暂存区中，执行如下命令

```auto
# 将 index.html 添加到暂存区  
git add index.html  
  
# 将css目录下一切添加到暂存区  
git add css  

```

如下命令，可以一次性把所有变化文件放入暂存区

```auto
# .的意思是当前目录下所有变化都暂存  
git add .  

```

把暂存区内容，提交到版本库，命令如下（此处文字说明可以不加引号）

```auto
git commit -m '提交的内容说明'  

```

过程图示：

![](https://i-blog.csdnimg.cn/blog_migrate/18e6483d9ddd80a458849cb610a8e5aa.jpeg)

以上命令相当于存档了一次，在版本库中产生一次提交记录并生成版本号

本次存档，不耽误我们在工作区 (项目文件夹) 下继续编写项目

**Git日志及状态查看**

查看所有提交的日志记录，命令如下

```auto
git log  

```

运行命令效果如下：

![](https://i-blog.csdnimg.cn/blog_migrate/7d14f77986207f9bfc46857a61a7b70a.jpeg)

当我们的日志越来越多，可能想要简化查看，可以输入如下命令

> –oneline：在一行显示简略信息

```auto
git log --oneline  

```

运行命令效果如下：

![](https://i-blog.csdnimg.cn/blog_migrate/dcef3a696d2805b9ee3ddb4e0e64f309.jpeg)

如果改的代码过多，忘记改过哪些了，可以运行如下命令来查看 git 仓库变化，只能看未提交的所有变更的文件状态

```auto
git status  

```

运行命令效果如下：

![](https://i-blog.csdnimg.cn/blog_migrate/7d25a70643e6f226452aa12a9568660b.jpeg)

暂存并再次提交，产生一次版本记录

```auto
git add .  
git commit -m '新建登录页面_和样式'  

```

过程图示：

![外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传](https://i-blog.csdnimg.cn/blog_migrate/a6c226bb5e42040b24b8f8d925edfd65.png)

**Git版本回退**

时光机，回到过去~

回退命令语法如下

```auto
git reset --hard 版本号  

```

查看版本号（每次的版本号随机生成）

```auto
git log --oneline  

```

![](https://i-blog.csdnimg.cn/blog_migrate/586d8c245bc6e07eab6f6d97c1cac050.jpeg)

尝试回退到 477321b 这次记录上

```auto
git reset --hard 477321b  

```

观察工作区，回退成功

![](https://i-blog.csdnimg.cn/blog_migrate/959c048243711edde86c9eddfec22146.jpeg)

如果想要在回到最近一次提交的记录，但发现git log看不到未来的记录了，问题不大。输入`git reflog`命令，可以查看 git 所有的操作记录，包括你的reset记录

```auto
git reflog  

```

运行命令效果如下：

![](https://i-blog.csdnimg.cn/blog_migrate/47d73c2055148fb0731058ae43ad774f.jpeg)

拓展命令：

-   git bash（终端）清屏：clear
    
-   git bash（终端）另起一页：Ctrl + L
    

**Git忽略文件**

有的时候，我们某些文件或文件夹不想让 git 进行跟踪管理。这时候可以在 .git 文件夹同级目录下新增`.gitignore`的忽略文件并写入忽略规则（此处的文件名就是 `.gitignore` ，不是后缀）

项目文件夹结构如下：

![](https://i-blog.csdnimg.cn/blog_migrate/bad0963ee385b3c0258ac535152f64da.jpeg)

```auto
# .gitignore内容：  
password.txt  
  
其余用法：  
# 忽略文件夹  
css  
# 忽略文件夹下的某个文件  
css/index.js  
# 忽略文件夹下某类文件  
css/*.js  

```

根目录新建 `password.txt`，查看 git 追踪到了哪些变化

```auto
git status  

```

运行命令效果如下：

![](https://i-blog.csdnimg.cn/blog_migrate/1bec4d6d2e97ea1d172770a80d92f16d.jpeg)

发现只新增了`.gitignore` ，符合规则的都被忽略掉了

`.gitignore`文件在项目中可以根据脚手架自动生成，无需自己编写，当然如果你非要写，以下是Vue官方自动生成的`.gitignore`文件代码，可供复制使用

```auto
# Logs  
logs  
*.log  
npm-debug.log*  
yarn-debug.log*  
yarn-error.log*  
pnpm-debug.log*  
lerna-debug.log*  
  
node_modules  
dist  
dist-ssr  
*.local  
  
# Editor directories and files  
.vscode/*  
!.vscode/extensions.json  
.idea  
.DS_Store  
*.suo  
*.ntvs*  
*.njsproj  
*.sln  
*.sw?  

```

###### Git分支

**分支本质**

分支其实就是一个叫HEAD的指针标记，每次代码提交，此HEAD指针都会往后移动一次，保证指向的 (并且工作区里的) 都是最后一次提交

例如：当我们输入命令：`git reset --hard a3bcab2`，HEAD指针会移动，而且HEAD移动后，会影响工作区里的代码

**创建分支**

-   创建分支命令如下

```auto
# 创建分支  
git branch 分支名  

```

该命令创建分支后不会自动切换分支，我们可以运行命令查看现在这个 .git 版本库里所有分支

-   查看当前版本库所有分支命令如下

```auto
# 查看当前版本库所有分支，绿色带*代表现在所处的分支  
git branch  

```

运行命令效果如下：

![](https://i-blog.csdnimg.cn/blog_migrate/c72671481172255664ee0b0b6f8fc08e.jpeg)

-   手动切换到分支上

```auto
# 切换分支命令  
git checkout 分支名  

```

运行命令效果如下：

![](https://i-blog.csdnimg.cn/blog_migrate/c2ebf8581a8944ae8d7e20fdb1cb055e.jpeg)

第一次创建并切换到 reg 分支，你会发现 master 分支上的所有代码 (和当前节点所有提交记录) 都被复制了过来 了，我们只需要在这个基础上接着往后开发就行

过程图示：![外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传](https://i-blog.csdnimg.cn/blog_migrate/75efdb121feb9e34c764cc41b58cc332.png)

**分支下开发流程**

我们现在就可以在当前 reg 分支下来编写注册页面的逻辑代码，例如新建`reg.html`文件，并随便写点内容。随后暂存并提交一次，这次提交的记录会出现在这里，如图

![](https://i-blog.csdnimg.cn/blog_migrate/91c29a03e45c825badb95d88316fcda0.jpeg)

以后在当前 reg 分支下开发，就会在 reg 范围内，每次提交产生一次版本记录，不会影响到别的分支

**分支合并**

我们可以把分支里写好的代码，合并到主分支或其他分支上，步骤如下：

首先，切换到你要合并到的目标分支上（以master主分支为例）

```auto
# 切换分支  
git checkout master  

```

切换分支后，HEAD指针位置如下：

![](https://i-blog.csdnimg.cn/blog_migrate/d083d865aa609320c08462da255f4fb2.jpeg)

合并命令语法

```auto
# 把目标分支名下的所有记录, 合并到当前分支下  
git merge 目标分支名  

```

这里我们执行命令`git merge reg`，执行后效果如图：

![](https://i-blog.csdnimg.cn/blog_migrate/6011b4e4504af9e6ddc1cabf168ddf0f.jpeg)

可见，reg 代码提交记录已经复制到了 master (主分支) 中

**分支删除**

假如注册功能开发完毕，代码已经合并到 master 分支上，我们已经不需要 reg 分支

命令如下

```auto
git branch -d 分支名  

```

如果分支的修改没有被合并到其他分支上，Git 会提示一个类似以下的错误信息：

```auto
error: The branch 'branch_name' is not fully merged. If you are sure you want to delete it, run 'git branch -D branch_name'.  

```

在这种情况下，Git 建议你确认是否要删除这个分支。如果你确定要删除该分支并且不在乎丢失该分支的修改，你可以使用`git branch -D <branch_name>`命令来强制删除该分支。但请注意，这样会丢失掉分支上的未合并修改

**分支合并时的冲突问题**

在两个分支修改了同一个文件并提交过，在合并的时候，就会产生冲突

这里模拟一次简单的冲突：

-   在 master 分支下，修改`login.html`的某行代码，并完成一次暂存提交

![](https://i-blog.csdnimg.cn/blog_migrate/bdc5f815cd85503bc72f86a664b63003.jpeg)

-   切换到 reg 分支下，也修改`login.html`的对应行代码，并完成一次暂存提交

![](https://i-blog.csdnimg.cn/blog_migrate/1ad551e14e3cd0f78b890d303b78af02.jpeg)

-   再切换回到 master 分支下，用合并命令，把 reg 分支下代码和变化合并过来，不出意外就会出现冲突了

![](https://i-blog.csdnimg.cn/blog_migrate/025e2ad6081beb30f360ffe20d093a07.jpeg)

发生冲突后，VSCode界面

![](https://i-blog.csdnimg.cn/blog_migrate/9c0a3eaa0146c77c00e6862954b25e38.jpeg)

> 此时我们要进行抉择：`采用当前更改`、`采用传入更改`、`全部保留`

选择保留方式后，需要再次暂存提交一次

![](https://i-blog.csdnimg.cn/blog_migrate/0e525d5e292271935a8d668cbbfefb4e.jpeg)

> 此时结束冲突状态，变回正常状态

打印冲突合并后的日志记录

![](https://i-blog.csdnimg.cn/blog_migrate/eadefcdaa1fc77c1a1cb0b1282a520d0.jpeg)

总结：当我们合并遇到冲突了，应手动解决，然后暂存，提交一次即可

###### Git分支流程图详解（拓展）

HEAD头指针，它指向当前所在的分支或者某个具体的提交记录。每次提交会产生新的记录master和HEAD会后移

![](https://i-blog.csdnimg.cn/blog_migrate/86e4d08c3766857b6119db2288ec2cf1.jpeg)

以当前节点为基准创建新的分支 (包含之前的所有提交记录)，`git branch reg` 就会在当前的提交记录上创建一个新的指针，名称为reg

![](https://i-blog.csdnimg.cn/blog_migrate/00ebf68db8345c18ba30ee25dabe01b1.jpeg)

`git checkout reg`切换的是HEAD指针指向 (切换分支)

![](https://i-blog.csdnimg.cn/blog_migrate/9781e995fe6fb15d933dfd580cd75aaa.jpeg)

注册页面新建后，`git add .`添加到暂存区，`git commit -m` 产生了一次提交记录

![](https://i-blog.csdnimg.cn/blog_migrate/a4ee51f96288a2ef485c63be0db580a9.jpeg)

注册页面的样式新建后暂存提交，产生了一次提交记录

![](https://i-blog.csdnimg.cn/blog_migrate/8318e270ecb708ab0a63bf44cbaee524.jpeg)

合并分支，例如把 A 合并到 B上

-   `git checkout B`，切换到目标分支 B
    
-   `git merge A`，把 A 分支记录合并到所在 B 分支下
    

先切换到主分支`git checkout master`

![](https://i-blog.csdnimg.cn/blog_migrate/53092ba53011ff4526811383e3898ebb.jpeg)

合并reg分支`git merge reg`

![](https://i-blog.csdnimg.cn/blog_migrate/bcd9e7763c614bca4799b6dfce58c2fd.jpeg)

在reg分支下，修改了`index.html`文件，并暂存提交，产生了记录

![](https://i-blog.csdnimg.cn/blog_migrate/f9efbcb3431f0708dde58905e0f71cdb.jpeg)

切换到master分支，并修改`index.html`文件(同一个文件)，暂存提交，产生了记录

![](https://i-blog.csdnimg.cn/blog_migrate/45b02ad20e1547e3e18f29c0bdda1539.jpeg)

在master分支中，想要把reg合并过来。由于修改了同一个文件，会报错，需要解决冲突

![](https://i-blog.csdnimg.cn/blog_migrate/168a7ebdb0a1eaf9715eba70c0a54feb.jpeg)

手动解决冲突后，会产生一个新的提交记录

![](https://i-blog.csdnimg.cn/blog_migrate/c163980bc00d145da38b8ba9a77a8424.jpeg)

删除reg分支，全部过程结束

![](https://i-blog.csdnimg.cn/blog_migrate/2bbef1a6250e89ce9d3e6921e3154d84.jpeg)

###### Git远程仓库

**介绍**

远程仓库是指托管在因特网或其他网络上的 Git 仓库，可以存储我们版本库的所有记录和存档记录

远程仓库在团队协作中发挥着重要的作用。它不仅可以充当备份存储，保护你的代码免受数据丢失的风险，还可以让团队成员之间轻松地共享代码、查看代码变更、进行代码审查等

![](https://i-blog.csdnimg.cn/blog_migrate/ba56d38ddc91ab9f04ef53a5b2ba1174.jpeg)

主流的远程仓库有 GitHub (gay hub)全球最大的同行交友社区，以及服务器在国内的 gitee（码云）。由于 GitHub 服务器在国外，方便起见，这里以码云为例，供初学者参考，GitHub 流程与 gitee 类似

**注册**

注册登录 `gitee.com` 网站以后，添加主邮箱为自己本地 git 仓库设置的邮箱，注意一定要相同，否则无法正确提交 如果忘记了本地设置的邮箱地址：

-   可以打开控制台输入 `git config --list` 重新查看邮箱地址
    
-   当然也可以使用 `git config --global user.email` 你的邮箱地址重新覆盖原来的邮箱地址
    

邮箱设置界面不要勾选不公开我的邮箱地址，否则也无法正常提交

![](https://i-blog.csdnimg.cn/blog_migrate/422926a21726a7af1bb472b1745c5409.jpeg)

**仓库新建**

可以选择创建一个远程仓库的项目 (可以多个)，创建界面如下

![](https://i-blog.csdnimg.cn/blog_migrate/13109087f594728b9892db45a679aeed.jpeg)

勾选完成后选择创建，创建后， 会得到一个远程仓库的地址链接，一般是以`.git`结尾的地址

地址分为两种最常用的两种传输协议：

-   **HTTPS协议：** 需要输入用户名和密码`https://gitee.com/(userName)/(repositoryName).gitssh`
    
-   **SSH协议：** 需要配置密钥，可免密码登录`git@gitee.com:userName/repositoryName.git`
    

选择SSH路径，界面如下

![](https://i-blog.csdnimg.cn/blog_migrate/992730b5c1f5a34fe29a4591443e0541.jpeg)

**SSH配置**

我们可以在本机一次性配置 SSH 以后免密登录，SSH 密钥组成和作用如下：

-   **作用：** 实现本地仓库和 gitee 平台之间免登录的加密数据传输
    
-   **组成：** id\_rsa (私钥文件，存放于客户端的电脑中即可)、id\_rsa.pub (公钥文件，需要配置到 gitee 平台中)
    

> 私钥加密的信息，只能通过公钥解密。公钥加密的信息，只能通过私钥解密。安全性高！

SSH 密钥创建与使用步骤：

-   先在本机生成一个密钥 (以后也可以重新生成、重新配置)，打开一个终端，输入以下命令：
    
    ```auto
    ssh-keygen -t rsa -C "你注册账号的邮箱"  
    
    ```
    
-   连续敲击 3 次回车，即可在`C:\Users\用户名文件夹.ssh目录`中生成`id_rsa`和`id_rsa.pub`两个文件
    
-   使用 VSCode 打开`id_rsa.pub`文件，复制里面的文本内容
    
-   粘贴配置到 码云 -> 设置 -> ssh 公钥 中即可
    
-   如果为 mac ，可进入以下教程查看：mac获取公钥
    

**初始化空仓库**

先给本地仓库配置个远程仓库的地址, 建立仓库之间的链接

由于每次 push 操作都需要带上远程仓库的地址，十分麻烦，我们可以给仓库设置一个别名

```auto
# 给远程仓库设置一个别名  
git remote add 仓库别名 仓库地址  
git remote add origin git@gitee.com:(username)/repository.git  
  
# 删除 origin 这个别名  
git remote remove origin  
  
# 使用 -u 记录 push 到远端分支的默认值，将来直接 git push 即可  
git push -u 仓库别名 分支名  

```

![](https://i-blog.csdnimg.cn/blog_migrate/ca624a42307ac4a95a3998e78af0c4dc.jpeg)

下面为实际操作举例：

-   随便新建一个项目文件夹，初始化 git，随后在项目文件中随便填充点内容，这里我新增一个`.gitignore`文件，随后暂存提交到本地 git 库

![](https://i-blog.csdnimg.cn/blog_migrate/f25cd2a623c0906f09fb401c47c255f4.jpeg)

-   输入以下命令：

```auto
# 注意：这里的existing_git_repo是你的项目根路径  
# 如果你是在项目文件夹开启的终端，忽略此行  
cd existing_git_repo  
  
# 添加远程仓库关联，仓库别名origin，可以随意更改，后接ssh地址  
# 此处的ssh是自动生成的，可以去gitee空仓库的代码页直接复制即可  
git remote add origin git@gitee.com:li-houyi/test-factory.git  
  
# 第一次推送到远程时需要指定具体的分支，因为远程仓库并没有这个分支  
# 使用 -u 记录 push 到远端分支的默认值，将来直接 git push 即可  
git push -u origin "master"  

```

-   出现此页面即为成功：

![](https://i-blog.csdnimg.cn/blog_migrate/2580fb33fc40cd2ea5094963954e3b5e.jpeg)

> 注意：推送的本地仓库一定要非空并且本地暂存提交过，不然会报错！这点也很好理解，你传个空的项目到一个空仓库，这可不得给你报错吗

-   推送成功后重新进入 gitee 仓库页面查看是否正确推送

![](https://i-blog.csdnimg.cn/blog_migrate/23b3b5b5a170cc9d4f915efc01c67724.jpeg)

空仓库创建成功后可以在管理页面将仓库开源，当然也可以不设置开源（默认私有）

**克隆项目**

如果你想要从远程仓库克隆一份项目代码到本地进行开发，可以使用 `git clone` 命令

```auto
git clone [options] <repository-url> [directory]  
# directory（可选）克隆后的本地仓库所处的目录名称（默认创建与远程仓库名字相同的目录）  

```

常见选项：

-   **`-b <branch>` 或 `--branch <branch>`：** 指定要克隆的远程仓库的特定分支，它不会影响克隆操作所获取的分支数量，而只是指定了默认要检出的分支（不指定则默认克隆远程仓库的主分支）
    
-   **`--depth <depth>`：** 指定克隆的深度，即只克隆指定数量的提交历史
    
-   **–single-branch：** 仅克隆指定分支以及该分支上的历史记录，不下载其他分支
    
-   **–recurse-submodules：** 初始化并克隆子模块的内容
    
-   **\-n 或 --no-checkout：** 克隆后不立即检出任何分支，保留 HEAD 指向原始仓库的默认分支
    
-   **`-o <name>` 或 `--origin <name>`：** 自定义远程仓库的别名。
    
-   **`-u <remote> <branch>` 或 `--set-upstream-to=<remote>/<branch>`：** 设置追踪关系，使得本地分支自动与指定的远程分支关联
    

如果项目只有一个分支，那么以上代码执行完毕就已经克隆结束了（`git clone` 默认拉取 master 分支），不过实际开发中，并非只有一个分支，于是我们还需执行以下步骤：

-   在本地建分支，分支名与远程分支名相同，查看远程分支名使用`git branch -r`

```auto
git checkout -b 对应远程分支名  

```

-   拉取远程分支 (不要在 master 分支直接拉取对应分支的代码，切换到新建的分支)

```auto
# 每次拉取都需要指定远程仓库名和分支名  
git pull 远程仓库名 分支名  

```

-   以上两行命令可以合并写做一行（创建并拉取远程分支代码）

```auto
git checkout -b 分支名 origin/分支名  

```

-   拓展: 设置 `git pull` 默认拉取的分支（设置本地分支与远程分支相关联）

```auto
git branch --set-upstream-to=origin/远程分支名 本地分支名  

```

**Git远程仓库流程回顾**

Step1：

![](https://i-blog.csdnimg.cn/blog_migrate/d5cc5eef8446a1590914635cbd351b10.jpeg)

Step2：

![](https://i-blog.csdnimg.cn/blog_migrate/1ecacd99ed65a04534db34803906f372.jpeg)

Step3：

![](https://i-blog.csdnimg.cn/blog_migrate/3d98a58141752a9dd1fdeb8280906f05.jpeg)

Step4：

![](https://i-blog.csdnimg.cn/blog_migrate/b2ffcd0b90e160ae114e10ab877fc69f.jpeg)

### Git常用命令总览

本命令默认远程仓库名为origin、默认远程仓库主分支名为master、`<>`为必填项，`[]`为可选项

![](https://i-blog.csdnimg.cn/blog_migrate/8934d539be405ce0124631f9db85f721.jpeg)
