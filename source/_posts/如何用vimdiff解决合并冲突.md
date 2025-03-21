---
title: 如何用vimdiff解决合并冲突
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2025-03-21 13:19:29
tags: 
- vim
- git
---

> 转载自: [https://juejin.cn/post/7351300787648921619](https://juejin.cn/post/7351300787648921619)

## vimdiff 介绍

`vimdiff` 等同于 `vim -d` 命令，即 {% mark Vim 编辑器的 diff 模式 color:purple %}。  


该命令后面通常会接两个或多个文件名作为参数，这些文件会同时在 Vim 编辑器的分割窗口中打开，并{% mark 高亮显示文件之间内容有差异的部分 color:purple %}。  

同时，该模式下还提供部分快捷按键用于完成文件内容的合并等操作。

### 启动 vimdiff

`vimdiff` 命令常用于编辑同一文件的不同历史版本，对各文件的内容进行比对与调整。如下面两个文件：

```ruby
$ cat file1
Line one
Line 2
Line three


Line 4
Line     5
Line 6
```

```ruby
$ cat file2
Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
```

可以使用 `vim -O2 file1 file2` 命令，在左右排列的两个窗口中同时打开 file1 和 file2 两个文件，如下图所示：  

![](//upload-images.jianshu.io/upload_images/6875152-f4c2b05fdeaf1444.png)

而 `vimdiff file1 file2` 命令会以同样的形式打开这两个文件，并且用**不同的背景色**高亮显示彼此间有差别的内容，如下图：  

![](//upload-images.jianshu.io/upload_images/6875152-d34dda92bc969b52.png)

从上面的两幅截图中可以得出 vimdiff 标记差别内容时的几个规则：

-   {% mark 只在某一个文件中存在的行背景色设置为蓝色，而另一文件中的对应位置则被标记为绿色 color:purple %}。（或者说，相对于另一个文件，当前文件中“多余”的行标记为蓝色，“缺少”的行则标记为绿色）
-   {% mark 两个文件中同时存在但是内容有差异的行，都标记为粉色，而引起差异的文字标记为红色 color:purple %}

除了 `vimdiff FILE_LEFT FILE_RIGHT` 或者 `vim -d FILE_LEFT FILE_RIGHT` 的形式外，也可以通过在 Vim 中输入命令进入 diff 模式。

比如先进入 Vim 编辑 FILE\_LEFT 文件（`vim FILE_LEFT`），再输入以下命令进入 diff 模式：  
`:vertical diffsplit FILE_RIGHT`

### 光标移动

可以使用下列两种快捷键，{% mark 在文件的各个差异点之间前后移动 color:purple %}：

-   `], c`：跳转到下个差异点
-   `[, c`：跳转到上个差异点

至于光标{% mark 在两个窗口之前的切换 color:purple %}，可以使用如下按键：

-   `Ctrl-w, l`：光标切换到右侧的窗口
-   `Ctrl-w, h`：光标切换到左侧的窗口
-   `Ctrl-w, w`：光标在两个窗口间彼此切换

### 内容合并

可以使用 `d, p` （即 diff put）命令，将当前差异点中的内容覆盖到另一文件中的对应位置。  
如当光标位于左侧文件（file1）中的第一行时，依次按下 `d`、`p` 键，则 file1 中的 `Line one` 被推送到右侧，并替换掉 file2 中对应位置上的 `Line 1` 。截图如下：  

![](//upload-images.jianshu.io/upload_images/6875152-b90c5dc9c6064384.png)

  

而 `d, o` （即 diff obtain）命令可以将另一窗口中差异点处的内容拉取到当前位置并进行替换操作。截图如下：  

![](//upload-images.jianshu.io/upload_images/6875152-22a3c389a3636e7b.png)

即在 file1 的第一行执行 `d o` 命令后，file2 中的第一行内容 `Line 1` 被拉取到 file1 中并替换掉原来位置上的 `Line one`。

### 多文件编辑

vimdiff 实际上是 Vim 编辑器的 diff 模式，因此适用于 Vim 编辑器的命令和快捷键也同样可以在该模式下使用。常用的几个命令如下：

-   `:qa`：退出所有文件
-   `:wa`：保存所有文件
-   `:wqa`：保存并退出所有文件
-   `qa!`：强制退出（不保存）所有文件
-   `z o`：查看被折叠的内容
-   `z c`：重新折叠

其他常用的命令与快捷键可参考 [Vim 速查手册](https://www.jianshu.com/p/af14f639dadb)

## vimdiff 解冲突

使用 `vimdiff` 作为 Git 的合并工具确实可能会让新手感到困惑，但它是一个功能强大的工具，一旦掌握了它，就可以非常高效地进行代码合并和比较

### Git配置

在开始之前，需要知道如何将vimdiff设置为Git的合并工具。具体步骤如下：

```bash
git config merge.tool vimdiff
git config merge.conflictstyle diff3
git config mergetool.prompt false
```

这将{% mark 把Git设置为默认的合并工具，在合并时显示共同祖先，并禁用打开vimdiff的提示 color:purple %}。

-   `git config merge.tool vimdiff`: 这会将 `vimdiff` 设置为默认的合并工具。
-   `git config merge.conflictstyle diff3`: 这会告诉 Git 在合并冲突时显示共同祖先的版本，这样就可以看到两个分支以及它们的共同起点的内容。
-   `git config mergetool.prompt false`: 这会禁用打开合并工具时的提示，Git 将自动打开 `vimdiff` 而不询问是否想要继续。

{% mark 完成这些设置后，当运行 `git mergetool` 命令来解决合并冲突时 color:purple %}，Git 将自动使用 `vimdiff` 来打开有冲突的文件。

### 创建冲突

下面用一个例子举例：

创建一个名为"zoo"的目录，并进入"zoo"目录，然后初始化Git仓库，最后新建一个`animals.txt`。

```shell
mkdir zoo  # 
cd zoo
git init
vi animals.txt
```

在文件中添加一些动物信息后并保存：

```auto
bash 代码解读复制代码cat
dog
octopus
octocat
```

之后提交该文件

```shell
git add animals.txt
git commit -m "Initial commit"
```

添加文件`animals.txt`到Git，提交文件，并附上消息"Initial commit"。

创建一个名为"octodog"的分支，并切换到"octodog"分支，并打开文件`animals.txt`，并将"octopus"改为"octodog"。

```shell
git branch octodog
git checkout octodog
vi animals.txt  # let's change octopus to octodog
```

添加文件`animals.txt`到Git，提交文件，并附上消息"Replace octopus with an octodog"。

```shellgit add animals.txt
git commit -m "Replace octopus with an octodog"
```

切换到"master"分支，打开文件`animals.txt`，并将"octopus"改为"octoman"。

```shell
git checkout master
vi animals.txt  # let's change octopus to octoman
```

添加文件`animals.txt`到Git，提交文件，并附上消息"Replace octopus with an octoman"。

```shell
git add animals.txt
git commit -m "Replace octopus with an octoman"
```

合并"octodog"分支到"master"分支。

```shell
git merge octodog  # merge octodog into master
```

此时，会得到一个合并错误：

```shell
Auto-merging animals.txt
CONFLICT (content): Merge conflict in animals.txt
Automatic merge failed; fix conflicts and then commit the result.
```

这表明在`animals.txt`文件中存在合并冲突。

### 解决冲突

解决这个冲突可以输入以下命令：

```shell
git mergetool
```

执行上述命令后，Git会尝试使用vimdiff作为合并工具来解决冲突。vimdiff会打开一个窗口，显示两个版本的文件，中间会有冲突标记。需要手动比较这两个版本，并选择一个解决方案来替换冲突的部分。使用 `hjkl` 键在窗口之间导航，使用 `:diffget LOCAL`、`:diffget REMOTE` 或 `:diffget BASE` 来将对应窗口的内容复制到 `MERGED` 窗口中。解决冲突后，保存并关闭文件，Git会提示你提交冲突的解决结果。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b14f62314a4a47abaeaa3d2c1f0f262c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=818&h=425&s=67475&e=png&b=05333f)

上述窗口看起来很迷糊，其实很好理解，下面解释一下都有什么。从左到右，从上到下：

1.  **`LOCAL`**:
    -   这是当前分支（通常是执行 `git merge` 命令时所在的分支）的文件内容。
    -   在合并过程中，这代表了您的最新更改。
2.  **`BASE`**:
    -   这是两个分支的共同祖先的文件内容。
    -   它显示了自从两个分支从共同点分开以来，发生了哪些变化。
3.  **`REMOTE`**:
    -   这是试图合并进来的分支的文件内容。
    -   在 `git merge` 命令中，\`\` 就是这里的 `REMOTE`。
4.  **`MERGED`**:
    -   这是合并后的文件内容将显示的地方。
    -   目标是将 `LOCAL` 和 `REMOTE` 的更改合并到这个窗口中，以解决所有冲突。

假设想要保留“octodog”的更改（来自REMOTE）。为此，将光标移动到MERGED文件（Ctrl + w, j），然后移动到合并冲突区域。接着，可以选择保留LOCAL版本、BASE版本或REMOTE版本中的哪一部分，或者合并这些内容。完成后，保存并关闭文件，Git会提示你提交冲突的解决结果。

```auto
vim 代码解读复制代码:diffget RE
```

这会将REMOTE中相应的更改添加到MERGED文件中，也可以：

```shell
:diffg RE` - 从REMOTE获取内容
:diffg BA` - 从BASE获取内容
:diffg LO` - 从LOCAL获取内容
```

这些命令允许快速地从一个特定的版本中获取内容，并将其应用于MERGED区域。一旦解决了所有的冲突，保存并关闭文件，Git会提示提交冲突的解决结果。

保存文件并退出（快速写入并退出多个文件的方法是：:wqa）。一旦解决了所有冲突并保存了文件后运行`git commit`，完成这些步骤后，就成功地解决了合并冲突，并将更改提交到了 Git 仓库。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/448c40a555f04168aeee82369f35c537~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=511&h=144&s=6438&e=png&b=282a36)

以下是一些其他的命令：

-   使用`:diffthis`命令来打开两个版本之间的差异，这样可以更清楚地看到差异。
-   使用`:nextdiffto`命令来切换到下一个差异，这样可以逐步解决多个冲突。
-   使用`:diffoff`命令来关闭差异显示，这样可以更专注于编辑。
-   使用`:diffmerge`命令来合并两个版本，这将覆盖当前的MERGED区域。
-   使用`:diffmergeoff`命令来关闭合并显示，这样可以回到正常的编辑模式。
