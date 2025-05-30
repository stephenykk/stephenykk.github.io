---
title: git快速入门教程
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2025-05-29 06:51:03
tags: git
---

> 转载自: [https://blog.csdn.net/qq\_16027093/article/details/130503317](https://blog.csdn.net/qq_16027093/article/details/130503317)

### Git简介

Git 是{% mark 一种分布式版本控制系统 color:purple %}，用于管理软件项目的源代码。它是由 Linux 之父 [Linus](https://so.csdn.net/so/search?q=Linus&spm=1001.2101.3001.7020) Torvalds 开发的，并已经成为了现代软件开发领域中最流行的版本控制系统之一。

使用 Git 可以追踪代码的历史修改记录，方便团队协作、代码共享和代码重构。Git 的基本工作流程如下：

1.  在开始编写代码之前，首先需要{% mark 创建一个 Git 仓库 color:purple %}（repository），用于存储代码和版本历史记录。
2.  在编写代码时，可以通过 `git add` 命令将更改的文件{% mark 添加到 Git 的暂存区 color:purple %}（staging area）中。
3.  通过 `git commit` 命令将暂存区中的更改{% mark 提交到本地 Git 仓库 color:purple %}中，并生成一个新的版本号（commit hash）。
4.  如果需要{% mark 撤销某个提交 color:purple %}，可以使用 `git revert` 命令来{% mark 创建一个新的提交，该提交将会抵消先前的提交效果 color:purple %}。
5.  如果需要{% mark 合并不同分支的代码 color:purple %}，可以使用 `git merge` 命令进行合并。
6.  如果需要{% mark 查看代码的历史提交记录 color:purple %}，可以使用 `git log` 命令来获取详细信息。
7.  如果需要将代码{% mark 推送到远程仓库 color:purple %}，可以使用 `git push` 命令将本地代码推送到远程仓库。
8.  如果需要{% mark 从远程仓库获取代码 color:purple %}，可以使用 `git pull` 命令将远程代码拉取到本地。

![](https://i-blog.csdnimg.cn/blog_migrate/32f09650551ca04922fa31418fb32ef0.png)

-   Workspace：工作区
-   Index / Stage：暂存区
-   Repository：仓库区（或本地仓库）
-   Remote：远程仓库

### SVN与Git的的区别

SVN和Git都是版本控制系统，但它们有以下区别：

1.  {% mark 分布式 vs 集中式 color:purple %}：Git 是一种分布式版本控制系统，而 SVN 是一种集中式版本控制系统。在 Git 中，每个开发者都拥有本地代码库的完整副本，可以离线工作并在不同的工作流程之间自由转换。而在 SVN 中，所有开发者共享同一个中央代码库，并且需要有网络连接才能进行版本控制操作。
2.  {% mark 分支管理 color:purple %}：Git 在分支管理方面比 SVN 更加强大和灵活。{% mark Git 的分支非常轻量级，创建和合并分支也很容易 color:purple %}，因此可以轻松实现多人协作和并行开发。而在 SVN 中，分支比较重量级（即创建和合并分支需要花费相对更多的时间和资源），因此往往只用于重要的版本分支。
3.  {% mark 版本号 color:purple %}：Git 使用 SHA-1 哈希值来标识每个提交，而 SVN 采用递增的数字版本号来标识每个提交。SHA-1 哈希值保证了每个提交的唯一性，而递增版本号则简化了版本控制过程。
4.  {% mark 安全性 color:purple %}：由于 SVN 是一种集中式版本控制系统，因此所有数据都存储在中央代码库中。如果中央代码库损坏或丢失，可能会导致数据丢失或无法恢复。而 Git 是一种分布式版本控制系统，每个开发者都拥有完整的代码库副本，保证了代码的整体性和可靠性。
5.  {% mark 性能 color:purple %}：Git 比 SVN 更快，特别是在处理大型仓库、分支合并以及比较代码差异时。{% mark Git 使用基于内容的哈希算法来检测文件是否修改 color:purple %}，而 SVN 则需要检查文件的元数据（如时间戳和文件大小）来确定是否修改。

总之，虽然 SVN 和 Git 都是版本控制系统，但它们的设计和实现方式存在较大差异，开发人员应根据自身需求选择最适合的版本控制系统。

### 常规操作

#### 创建版本库

首先，打开终端或命令行界面，进入要创建版本库的目录下。

接着，使用以下命令初始化一个空的 Git 仓库：

```csharp
git init
```

然后，将需要管理的文件添加到暂存区：

```bash
git add <file>
```

你也可以使用以下命令一次性将所有变更添加到暂存区：

```csharp
git add .
```

接下来，提交暂存区中的变更到本地仓库，并添加一个描述信息：

```sql
git commit -m "Initial commit"
```

现在，你已经成功地创建了一个版本库。你可以使用其他 Git 命令来管理它，例如：

-   `git status`：查看当前工作区和暂存区的状态。
-   `git log`：查看提交记录。
-   `git branch`：管理分支。
-   `git remote`：管理远程仓库。

#### 版本回退

要将Git存储库版本回退，请使用git reset命令。如果您想要撤消上次提交并返回到上一个提交，则可以使用以下命令：

```bash
# 将HEAD指针移动到上一个提交，本地仓库回退到上一个提交，暂存区和工作区不变
git reset HEAD~1
```

这将使HEAD指向上一个提交，但不会删除您最新的更改。如果您希望完全返回到以前的提交并放弃所有更改，则可以添加--hard选项：

```bash
# 把本地仓库，暂存区，工作区都回退到上一个提交
git reset --hard HEAD~1
```

请注意，此操作将永久删除您最新的更改，请谨慎使用。如果您已经将更改推送到远程存储库，则在执行此操作之前应先备份这些更改。

#### 理解工作区与暂存区的区别

Git有三个主要的工作区域：{% mark 工作区（working directory） color:purple %}、{% mark 暂存区（staging area） color:purple %}和{% mark 版本库（repository） color:purple %}。

工作区是指您电脑文件系统上用于修改文件的目录。在这里，您可以创建、编辑和删除文件。

暂存区是一个中间状态，它充当了您提交更改的缓冲区。在Git中，您必须明确地将文件添加到暂存区，然后才能将其提交到版本库中。这样做的好处是，您可以对每个更改进行精细控制，并确保只提交需要保存的更改。

版本库包含Git存储库的所有历史记录和元数据。它是Git存储库的核心组成部分，是由Git自动维护的。

简而言之，工作区是您正在处理的实际文件，而暂存区是下一次提交所需更改的文件列表。它们之间的区别在于，您可以对工作区中的任何文件进行修改，但只有将它们添加到暂存区并将其提交到版本库中，它们才会成为Git跟踪的部分。

#### Git撤销修改和删除文件操作

要撤销对文件的修改，可以使用git checkout命令：

```bash
# 将工作区中的文件还原为暂存区的状态
git checkout -- <filename>
```

此命令将覆盖工作树中指定文件的更改，还原为最近提交或上次检出的状态。

要删除文件并将此更改提交到Git存储库中，可以使用git [rm命令](https://so.csdn.net/so/search?q=rm%E5%91%BD%E4%BB%A4&spm=1001.2101.3001.7020)：

```bash
git rm <filename>
git commit -m "Remove file"

```

这将从工作树和版本历史记录中删除指定的文件。如果只是想从Git版本库中删除文件但保留在工作树中，则可以使用git rm命令的--cached选项：

```bash
git rm --cached <filename>
git commit -m "Remove file from repository"

```

这将从版本历史记录中删除指定的文件，但保留在工作树中。

### 远程仓库

#### 如何添加远程仓库

要将本地代码库连接到远程仓库，可以使用以下git命令：

1.  首先，将本地代码库初始化为Git仓库（如果尚未完成）：  
    `git init`
2.  添加远程仓库的URL，其中`<remote-name>`是自定义名称，`<remote-url>`是远程仓库的URL：  
    `git remote add <remote-name> <remote-url>`
3.  可以使用以下命令确认远程仓库是否已成功添加：  
    `git remote -v`

此后，您就可以使用`git push`命令将代码推送到远程仓库，或使用`git pull`命令从远程仓库拉取代码。

#### 如何从远程库克隆

要从远程仓库克隆代码到本地，可以使用以下git命令：

```bash
git clone <remote-url>
```

其中`<remote-url>`是远程仓库的URL。执行此命令后，Git将在当前目录下创建一个新目录，其中包含克隆的代码库副本。如果想指定不同的目录名，可以将目录名作为可选参数添加到命令中：

```bash
git clone <remote-url> <directory-name>
```

在执行`git clone`命令时，还可以通过添加其他标志来更改默认行为，例如指定要克隆的分支、禁用克隆时自动检查的文件等。有关详细信息，请参阅相应的文档。

### 创建与合并分支

创建一个新的分支可以使用以下命令：

```bash
git branch <branch_name>

```

这将在当前所在的提交上创建一个名为 `<branch_name>` 的新分支。

要切换到新创建的分支，可以使用以下命令：

```bash
git checkout <branch_name>
```

基于当前分支创建新分支并立即切换到新分支，可以使用以下命令：

```bash
git checkout -b <branch_name>

```

合并分支可以使用以下命令：

```bash
git merge <branch_name>
```

这将将 `<branch_name>` 分支中的更改合并到当前分支。

#### 处理冲突

当两个分支上的代码修改了同一部分，并且尝试将这两个分支合并时，就会发生代码冲突。Git提供了以下步骤来解决冲突：

1.  运行 `git status` 命令查看哪些文件包含冲突。
2.  编辑有冲突的文件，手动解决文件中的冲突。
3.  对编辑后的文件进行 `git add`，标记为已解决冲突的文件。
4.  使用 `git commit` 提交更改，Git 会自动生成一个合并提交，其中包含各自分支中的更改。

注意：在解决冲突前，最好先备份当前的代码状态，以免不小心破坏代码库。另外，在处理冲突之前，可以通过运行 `git diff` 命令来查看冲突的源代码，以便更好地理解要解决的问题。

#### 分支管理策略

在 Git 中，常见的分支管理策略包括以下几个方面：

1.  {% mark 主分支 color:purple %}：主分支通常是最稳定的分支，用于发布生产版本。在 Git 中，主分支通常是 master 分支或者 main 分支。
2.  {% mark 开发分支 color:purple %}：开发分支通常从主分支派生而来，在其上进行新功能或修复错误的开发。在 Git 中，通常使用 develop 分支作为开发分支。
3.  {% mark 特性分支 color:purple %}：特性分支是为了开发单独的功能而创建的分支。这些分支通常从开发分支派生而来，并在实现目标后被合并回开发分支。在 Git 中，通常使用 feature/ 分支命名约定来表示特性分支。
4.  {% mark 发布分支 color:purple %}：发布分支是用于准备发布版本的分支，通常从主分支派生而来。这些分支应该包含与发布相关的所有更改，并且应该经过全面测试和审核后再合并回主分支。在 Git 中，通常使用 release/ 分支命名约定来表示发布分支。
5.  {% mark 热修复分支 color:purple %}：热修复分支通常用于快速修复紧急问题，例如安全漏洞或崩溃。这些分支通常从主分支派生而来，并且只包含必要的更改。在 Git 中，通常使用 hotfix/ 分支命名约定来表示热修复分支。

通过采用合适的 Git 分支管理策略，可以帮助团队更好地组织和管理代码，提高团队的协作能力和生产效率。除了上述常见的分支管理策略，还可以根据团队的具体需求和工作流程定制适合自己的分支管理策略。

### bug分支

在 Git 中，通常使用 bug 分支用于修复代码中的错误或缺陷。当发现 bug 时，可以从当前开发分支（如 develop 分支）创建一个 bug 分支，在该分支上进行错误修复。修复完成后，可以将更改提交到 bug 分支，并将其合并回开发分支和主分支。

以下是一个典型的使用 Git bug 分支的流程：

1.  从当前开发分支（如 develop 分支）创建一个新的 bug 分支：

```bash
git checkout -b bug/fix-xxx

```

1.  在 bug 分支上进行错误修复，包括必要的测试和代码审查。
2.  提交更改并推送到远程仓库：

```bash
git add .
git commit -m "Fix xxx bug"
git push origin bug/fix-xxx

```

1.  将 bug 分支合并回开发分支（如 develop 分支）：

```sql
git checkout develop
git merge --no-ff bug/fix-xxx

```

1.  测试修复是否正确，如果一切正常，则将开发分支合并回主分支（如 master 分支）：

```sql
git checkout master
git merge --no-ff develop

```

通过使用 Git bug 分支，可以帮助团队更好地管理和修复代码中的错误和缺陷，同时保持代码库的稳定性和可靠性。

### 多人协作

Git 是一个优秀的多人协作工具，以下是 Git 多人协作的一些最佳实践：

1.  {% mark 使用分支 color:purple %}：使用分支可以帮助团队成员在不影响主分支的情况下进行开发和测试，避免代码冲突和错误。建议采用主分支、开发分支、特性分支、发布分支、热修复分支等分支管理策略。
2.  {% mark 提交规范 color:purple %}：每次提交代码时应该附加有意义的提交信息，描述本次提交的更改内容和目的。建议采用语义化版本号和提交信息模板等规范，以便更好地记录和追踪代码变更历史。
3.  {% mark 定期合并 color:purple %}：团队成员应该定期将自己的分支合并回主分支或者开发分支。这可以避免较大的代码冲突和错误，并且保持代码库的整洁和可维护性。
4.  {% mark 代码审查 color:purple %}：通过代码审查可以确保代码的质量和一致性，并且可以识别和纠正潜在的问题和错误。建议采用 pull request 和 code review 等工具和流程，以便团队成员对彼此的代码进行审查和反馈。
5.  {% mark 团队协作 color:purple %}：团队成员之间应该保持及时和有效的沟通，共享技术和经验，并尽可能避免个人行为和偏见对项目和团队产生不良影响。

通过采用上述最佳实践，可以帮助团队高效协作、保证代码质量和稳定性，并提高团队的生产力和创造力。

#### 推送分支

在 Git 中，推送分支指将本地的分支提交到远程仓库中，使得其他团队成员可以访问和获取该分支的代码。以下是在 Git 中推送分支的一些常用命令：

1.  推送当前分支到远程仓库，并与远程分支关联：

```bash
git push -u origin <branch-name>
```

1.  推送当前分支到远程仓库，并与远程分支合并：

```bash
git push origin <branch-name>
```

1.  强制推送当前分支到远程仓库：

```bash
git push -f origin <branch-name>
```

1.  删除远程分支：

```bash
git push origin :<branch-name>
或
git push --delete origin <branch-name>

```

在推送分支时，通常会遇到冲突等问题。如果发生冲突，需要先解决冲突，然后再进行推送。

另外，在多人协作项目中，建议采用 pull request 和 code review 等工具和流程来对分支进行审查和反馈，以确保代码质量和稳定性。同时，也应该避免直接向主分支（如 master 分支）提交代码，而是应该使用分支管理策略来组织和管理代码。

#### 抓取分支

在 Git 中，抓取分支指从远程仓库拉取最新的代码和分支信息，并在本地创建相应的分支。以下是在 Git 中抓取分支的一些常用命令：

1.  拉取所有远程分支并更新本地分支：

```sql
git fetch --all
```

1.  拉取一个特定的远程分支到本地：

```bash
git fetch origin <branch-name>

```

1.  在本地创建基于远程分支的新分支：

```bash
git checkout -b <new-branch-name> origin/<remote-branch-name>

```

1.  拉取远程分支并自动与本地分支关联：

```bash
git checkout --track origin/<remote-branch-name>
或
git checkout -t origin/<remote-branch-name>

```

抓取分支时，需要注意避免覆盖当前分支中未提交的更改。如果本地分支和远程分支存在冲突，需要解决冲突后才能将更改合并到本地分支中。

通过抓取分支可以使得开发者获取最新的代码和分支信息，在本地进行代码修改和测试，并将更改推送回远程仓库以进行协作开发。

### git可视化工具

Git 可视化工具可以帮助开发者更直观地查看和管理代码版本控制历史，以下是几个常用的 Git 可视化工具：

1.  {% mark GitKraken color:purple %}： GitKraken 是一款简单易用的 Git 可视化工具，支持 Windows、Mac 和 Linux 等多个平台。它提供了强大的图形界面，包括代码历史记录、分支管理、合并冲突解决等功能。
2.  {% mark Sourcetree color:purple %}：Sourcetree 是由 Atlassian 公司开发的一款免费 Git 可视化工具，支持 Windows 和 Mac 平台。它提供了友好的用户界面，可以轻松地进行代码提交、分支管理和冲突解决等操作。
3.  {% mark GitHub Desktop color:purple %}：GitHub Desktop 是 GitHub 公司出品的一款免费 Git 可视化工具，支持 Windows 和 Mac 平台。它提供了清晰明了的界面，可视化显示代码历史记录、分支管理、拉取请求（pull request）等功能，以及与 GitHub 网站的集成支持。
4.  {% mark Git GUI color:purple %}：Git GUI 是 Git 官方提供的一个图形化界面的工具，支持 Windows、Mac 和 Linux 等多个平台。它虽然不如前面提到的工具那样友好易用，但是对于习惯命令行操作的开发者来说，Git GUI 可以提供便捷的图形化界面。

使用 Git 可视化工具可以帮助开发者更直观地理解和管理 Git 中的代码版本控制历史，提高协作效率和代码质量。