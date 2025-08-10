---
title: '炼气技术栈Shell脚本: linux命令筑基'
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2025-08-10 12:04:08
tags:
---

Shell 脚本程序就是用一条条的 Shell 命令，完成复杂的任务，掌握常见 Shell 命令是编写 Shell 脚本的前提。

从本质上来说，Shell 命令就是系统提供的一个个成熟的程序，而且有的命令非常强大，比如 `find`、`grep`、`awk`、`sed` 等。

本文总结了一些常用的 Shell 命令，包括文件操作、文本处理和查看系统信息等方面，希望大家能从中有所收获 :)

## 文件操作

在 Linux 系统中，一切皆文件，因而文件操作是 Shell 脚本最基础的操作，包括文件创建、删除、复制、移动、重命名等。

### 创建文件和文件夹

`touch`命令主要功能是修改文件的访问时间，如果文件不存在，则创建一个空文件；但是大家都习惯用它来创建文件。

```bash
touch data.txt # 创建文件

# 创建多个文件
touch data1.txt data2.txt

```

支持大括号扩展，让 Shell 命令可以做很 cool 的事情，比如：一下子创建 100 个文件

```bash
touch data{1..100}.txt
```

`touch` 命令的其他选项

-   `-a` 只更新访问时间, 用 `ls -lt -u` 查看新的访问时间`atime`
-   `-m` 只更新修改时间, 用 `ls -lt` 查看新的修改时间`mtime`
-   `-r` 用指定文件的时间替代当前时间
-   `-t` 更新为指定时间
-   `-c` 不创建文件

```bash
# 修改 hello.js 的atime为当前时间
touch -a hello.js
# 修改 hello.js 的mtime为当前时间
touch -m hello.js
# 把 b.js 的mtime改为和 a.js 的mtime一样
touch -r a.js b.js

# 长列表格式，时间字段默认是文件的修改时间 mtime
ls -l .
# 长列表格式，时间字段显示文件的访问时间 atime
ls -lt -u .

# 更新为2025年6月7日11点20分
# 时间格式: [[CC]YY]MMDDhhmm[.ss].
touch -t 202506071120 hello.txt
```

创建目录

```bash
# 创建目录
mkdir images
# 创建多个目录
mkdir images styles
# 递归创建目录层级
mkdir -p src/static/images

# 指定目录的权限
mkdir -p -m 777 backup/code
mkdir -p -m a=rwx backup/code # 同上
```

### 删除文件和文件夹

`rm`命令用于删除文件或目录，`-r`参数表示递归删除，即删除目录及其内容，`-f`参数表示强制删除，直接删除不会提示确认。

语法:

-   `rm file1 file2..`
-   `rm -r dir`

```bash
# 删除文件
rm data.txt
# 删除目录及其内容
rm -r dir
# 删除空目录, 如果目录非空，则无法删除
rmdir dir
```

`rm`命令比较危险，因为一旦删除文件或目录，就无法恢复。为了避免误删，可以使用`-i`参数，即交互模式，删除文件或目录之前会提示确认。

网上流传删库跑路的段子，就是指用 `rm -rf /` 彻底删除服务器系统所有文件。如果不太确定的话就把 `-f` 换成 `-i` 参数。

`rm`命令支持文件名通配符，如 `*`、`?`、`[...]`等，用于匹配多个文件，同时还支持大括号扩展 `{}`, 十分灵活。

```bash
# 创建a.jpg、b.jpg、c.jpg
touch {a..c}.jpg
# 删除jpg图片文件
rm *.jpg

# 创建a.png、b.png、c.png
touch {a..c}.png
# 文件名扩展 + 大括号扩展，删除jpg、png文件
rm *.{jpg,png}
# 注意：[a,b,c] 文件名扩展，元素只能是单字符，所以大括号扩展更好用一点
rm *.[jpg,png] # error

# 注意：区分大括号扩展和文件名扩展
touch data{K,Q}.txt
rm data[K,Q].txt
rm data{K,Q}.txt # 同上


# 强制删除目录所有内容
rm -rf dir

# 使用文件名扩展进行删除
rm *.log
# 删除前提示
rm -i  *.js
# 文件名只有3个字符
rm ???
rm *.??
rm a*
# 删除a.js b.js
rm [ab].js
```

### 复制文件和文件夹

`cp`命令用于复制文件或目录，`-r`参数表示递归复制，即复制目录及其内容，`-i`参数表示存在同名文件时提示确认，因为`cp`默认会覆盖已有同名文件。

多种语法：

-   `cp <srcFile> <dstFile>`
-   `cp <file1> <file2>... <dstFolder>`
-   `cp -t <dstFolder> <file1> <file2>...`
-   `cp -r <srcFolder> <dstFolder>`

```bash
# 复制文件
cp a.jpg a2.jpg
# 复制文件夹
cp -r codes codes_bk

# 复制多文件
cp a.js b.js src
cp -t src a.js b.js

# 复制当前目录下所有文件到tmp
cp * /tmp
# 保留所有文件属性(所有者 权限 访问时间等)
cp -p server.js /codes/test/server.js

```

存在同名文件的提示确认

```bash
# 复制文件，如果lufy.txt已存在，则提示确认
cp -i data.txt lufy.txt
```

如果被复制的对象是文件夹，那么有两种可能: 复制源文件夹为新的目标文件夹，或者将源文件夹复制到目标文件夹中。这取决于目标文件夹是否已经存在。

```bash
# 列出以folder开头的目录 folder1 folder2
ls -d folder*

# 因为 folder2 已存在，结果是将 folder1 复制到 folder2 内
cp -r folder1 folder2

# 因为 folder_back 不存在，结果是把 folder1 复制为 folder_back
cp -r folder1 folder_back

```

`cp`命令支持文件名通配符，如 `*`、`?`、`[...]`等，用于匹配多个文件。

```bash
# 复制jpg图片文件到images目录
cp *.jpg images
```

### 移动和重命名

`mv`命令用于移动文件或目录，`-r`参数表示递归移动，即移动目录及其内容。如果把文件或文件夹移动到当前目录下，则相当于重命名；所以移动和重命名都用 `mv`命令。

语法:

-   `mv <oldName> <newName>`
-   `mv file1 file2... dest`

```bash
# 重命名
mv a.jpg b.jpg
# 移动
mv a.jpg images/
mv a.jpg b.jpg images/

# 若目标文件夹已有同名文件，则提示
mv -i a.jpg images

# 仅仅将dstDir没有的文件，移动进去
mv -u dirSrc/*  dstDir
```

如果被移动的对象是文件夹，那么有和`cp`命令相同的特性。

```bash
# 列出所有以f开头的文件夹  folder1  folder2
ls -d folder*

# folder1 移入 folder2 文件夹
mv folder1  folder2
# 因为 folder_bk 不存在, 结果是把 folder1 重命名为 folder_bk
mv folder1  folder_bk
```

### 查看文件夹内容

`ls`是最最最常用的命令，用于查看文件夹。个人觉得`ls`很强大，可以满足我们绝大部分的需求。

```bash
# 长列表显示，默认按文件名排序
ls -l
# 显示隐藏文件
ls -a
# 显示文件大小（以KB,MB等人类易读的方式）
ls -lh
# 按文件修改时间倒序显示(最新的在前面)
ls -lt
#  按文件大小倒序显示(最大的在前面)
ls -lS
# 反序显示
ls -r
# 按文件修改时间顺序显示
ls -ltr
# 显示所有文件夹
ls -F | grep "/$"
# 显示dir开头的目录自身（不加 -d 显示dir开头的目录内的文件)
ls -d dir*
# 递归地显示目录下的所有内容
ls -R my_project
# 显示文件或目录的inode编号
ls -li
# 所有者和组用id表示
ls -ln
```

长列表显示的时间默认是文件的修改时间 mtime, 可以通过 `--time` 参数指定时间类型，如 `atime`、`ctime`、`mtime`等。

### 查看文件内容

`cat` 命令是 `concatenate` 的简写(意思为：连接)，当然我们也可以理解它为“猫”，要查看文件内容，就用“猫”抓一下 :)

语法: `cat [option] [file]...`

`cat` 的主要功能是把多个文件的内容合并输出到标准输出。如果我们只提供一个文件，那么其实就是把该文件的内容输出到标准输出。

```bash
#  合并输出多个文件
cat file1 file2
# 把多个文件的内容合并到 file3
cat file1 file2 > file3
# 输出文件内容
cat file1
```

`cat` 命令可以带行号输出内容

```bash
# 显示行号
cat -n file1
# 仅非空行加行号
cat -b file1
```

`cat`命令查看的数据源可以是文件，也可以是键盘输入，比如我们想创建一个文件，但是文件内容比较长，我们就可以使用 `cat` 命令，从键盘输入内容，然后输出到文件中。

> 按 ctrl + d 结束输入

```bash
# 从键盘输入内容保存到指定文件中
cat > daily.txt
```

`cat` 的反序词就是 `tac`, `tac` 也是一个命令(_Linux 有很多类似有意思的地方_)，它的作用就是反序序输出文件内容，即从最后一行开始输出。

```bash
# 倒序显示文件内容
tac file
```

`less` 是一个查看文件内容的强大命令，打开文件后默认也是命令模式(_同 vim_), 具体用法，可以按 `h` 查看帮助。

> `u` 向上翻页， `d` 向下翻页 ，`/`或`?` 搜索 ，`gg` 跳到顶部， `G` 跳到底部

```bash
less file
```

less 打开多个文件

-   `:e` 然后输入新文件名
-   `:p` 上一个文件
-   `:n` 下一个文件

less 书签功能

-   `m` 然后按任意字母，标记当前位置
-   单引号 + 之前字母，定位到对应标签

less 可以实时显示文件新增加的内容

```bash
ls -1 . > files.txt
less -F files.txt

# 新开终端
echo new content >> files.txt
```

`more` 命令和 `less` 命令类似，但是 `more` 命令只能向下翻页，不能向上翻页，所以 `more` 命令的功能没有 `less` 命令强大。

> 有句戏言： more is less, less is more 是不是充满哲学的意味? :)

`more` 命令主要是分块显示文件内容， `-5` 表示显示前 5 行；因为当输出内容很长，有时回滚也很麻烦。

```bash
more file
more -5 index.html
cat order.tsx | more -5
```

head 显示文件顶部开始的若干行/字符， `-n` 参数用于指定末行的位置，支持负数，表示倒数第几行。

```bash
# 从开头到第10行
head -n 10 file
# 同上
head -10 file
# 从开头到倒数第3行(首行总是从第1行开始，末行用负数，则表示倒数第几行)
head -n -3 file
# 显示前5个字符
head -c 5 file

```

tail 显示文件末尾的若干行/字符，`-n` 参数用于指定首行的位置，支持负数，表示顺数第几行。

```bash
tail -n 3 file
tail -3 file
# 监听文件中新写入的行
tail -f file
# 进程结束时终止tail
tail -f file --pid 3012
# 持续尝试打开目前还不存在的文件
tail -f notExistFile --retry

```

## 查看文件类型

语法: `file <filename>`

```bash
file hello.txt
# MIME格式的文件类型信息
file -i hello.txt
# 键值对格式的输出 file --help 查看说明
file -N *.txt
```

## 统计文件信息

`wc` 命令用于统计文件中的行数、单词数、字符数等。

语法: `wc [options] [file...]`

```bash
# 统计行数 单词数和字符数
wc hello.txt
# 行数
wc -l hello.txt
# 单词数
wc -w hello.txt
# 字符数
wc -c hello.txt
# 最长行的长度
wc -L hello.txt
```

## 查找文件和目录

`find` 是 linux 系统中最常用和重要的命令之一,可以根据文件名、文件大小、修改时间、权限等属性进行查找。

```bash
find /etc -name init-tab
# 支持文件名扩展
find /etc -name "*.conf"
# 不区分文件名大小写
find . -iname server.js
# 查找当前目录下名称为 tmp 目录
find . -type d -name tmp
# 查找当前目录下的所有php文件
find . -type f -name "*.php"
# 限制搜索深度
find . -maxdepth 2 -type f -name "*.js"
# 找 dotfile
find . -type f -name ".*"

# 查找文件后默认执行的命令是 echo, 可以通过 -exec 指定要执行的命令, {} 表示匹配到的文件名
# 查找log文件并删除
find /tmp -type f -name "*.log" -exec rm -f {} \;

# ! 在条件选项前，表示取反
# 查找当前目录下非 txt 文件
find . -type f ! -name "*.txt"

# () 进行条件组合
# 找 txt 和 sh 文件
find . -type f \( -name "*.txt" -o -name "*.sh" \)

# 查找当前目录下权限不是 777 的文件
find . -type f ! -perm 777
# 查找只读文件
find . -type f ! -perm /a+w
# 查找可执行文件
find . -type f -perm /a+x

# 找空文件
find . -type f -empty
# 找空文件夹
find . -type d -empty

# 所有者为root的文件
find /tmp -user root
# 所属组为sudo的文件
find /tmp -group sudo

# 3天前修改的文件
find ~ -type f -mtime 3
# [-5, -3] 3天前5天内修改过的文件
# +3 -> 3+ 3表示过去的3天， + 表示大于
# -5 -> 5- 5表示过去的5天， - 减表示小于
find ~ -type f -mtime +3 -mtime -5

# 1小时内修改过的文件
find . -type f -cmin -60
# 1小时内访问过的文件
find . -type f -amin -60

# 大小是50M的文件
find . -type f -size 50M
# 大于50M小于100M的文件
find . -type f -size +50M -size -100M

```

## 创建软链接和硬链接

ln 命令用于创建软链接或硬链接

-   软链接
    又称 符号链接，可以指向文件或目录, 对符号文件的读写，系统会转换为对源文件或目录的操
    作, 但是删除时，仅仅删除链接文件, 链接文件和源文件由各自的 inode, 是不同的文件
-   硬链接
    多个文件路径指向同一个文件(inode 相同), 其实是创建另一个文件路径，指向同一个 inode, 硬链接只能指向文件，硬链接数为 0，文件才真正被删除

语法:

-   `ln <src> <dstLink>`
-   `ln -s <src> <dstLink>`

```bash
# 默认创建的是硬链接
ln hello.txt /tmp/hello.txt
# -s 指定创建软链接
ln -s images /tmp/images

```

## 文件和目录权限

三种角色的权限

-   所有者 `u`
-   所属用户组 `g`
-   其他用户 `o`

文件夹的执行权限(x) 控制用户能否打开文件夹

语法：
`chmod [ugoa] [+-=][rwxug] file...`

```bash
chmod a+x hi.js
chmod a=rx hi.js
chmod o-x hi.js
chmod 777 hi.js

# 设置所有者权限同用户组的权限
chmod u=g hi.js
# 设置所有者权限同其他用户的权限
chmod u=o hi.js
# 递归地修改目录下所有文件的权限
chmod -R 664 dir
# 修改所有子目录的权限
find . -type d -exec chmod -R 775 {} \;

```

修改文件/目录的所有者/所有组

语法:

-   `chown <user> dir`
-   `chgrp <group> dir`

```bash
# 同时修改所有者和所属组
chown alice:pan codes

# 递归地修改所有文件的所有者
chown -R alice src

chgrp pan codes
# 只修改用户组
chown :lucy images

# 修改软连接的所有者等，其实修改的是源文件的
chown alice:lucy images_symlink
# 修改软链接的所有者等
chown -h alice:lucy images_symlink

# 从所有者alice,修改到新的所有者
chown --from=alice lucy:lucy images
```

设置用户和组的权限位

-   `setuid` 设置用户标识 允许用户以所有者权限执行文件
-   `setgid` 设置组标识 允许用户以所属组的权限执行文件

> 注意: 若对文件设置 `setuid` 权限位，且文件所有者是 root, 则任意用户都可以用 root 权限执行该文件

> `stat` 命令十分有用，可以查看文件完整的信息，包括权限和修改时间等

查看是否设置 `setuid`, `setgid` 权限位

-   `ls -l`
-   `stat filename`

```bash
ls -l /usr/bin/passwd
stat /usr/bin/passwd

# 设置uid
chmod u+s hello.sh
# 4代表设置uid 同上
chmod 4775 hello.sh
# 设置gid
chmod g+s hello.sh
# 2代表设置gid 同上
chmod 2775 hello.sh
# 移除uid/gid权限位
chmod 0775 hello.sh

```

## 文本处理

### 文本排序

`sort` 将文本的行排序，字母顺序

```bash
# 按字母顺序，对文件内的行进行排序
sort filename
# 按数字顺序，对文件内的行进行排序
sort -n filename
# 按数字倒序，对文件内的行进行排序
sort -nr filename

# 移除重复的行
sort -u filename

# 可对多个文件的内容排序
sort -u data data2

# 逗号分割为多个字段，按第2个字段排序
sort -t ',' -k2 data
sort -t ',' -k2 -n -r data
```

### 文本去重

`uniq` 去除重复的行，必须和 `sort` 命令一起使用

语法:  
`uniq [options] [input_file]`

```bash
sort data | uniq
# 重复行计数
sort data | uniq -c
# 只显示重复的行 去重只显示一次
sort data | uniq -d
# 显示重复行，并且不去重
sort data | uniq -D
sort data | uniq -d -c
# 只显示不重复的行 与 -d 相反
sort data | uniq -u
# 只通过前面2个字符判断是否重复
sort data | uniq -w 2
# 显示重复的行
sort data | uniq -w 2 -D
# 跳过比较前3个字符，与 -w 相反
sort data | uniq -s 3
# 空格分割成多列，跳过第1列
uniq -f 1 text
```

### 删除和替换字符

语法: `tr [OPTION]... SET1 [SET2]` 
`tr` 命令用于转换、删除和压缩重复字符  
`tr set1 set2` set1 对应位置的字符被替换为 set2 对应位置的字符

```bash
# 小写转换为大写
echo linuxShell | tr lin LIN  
# 所有字符转换为大写
echo how are you | tr a-z A-Z 

# {} 转换为 ()
echo {linuxShell} > source.txt
# 同时重定向输入和输出
tr '{}' '()' < source.txt > result.txt 
cat result.txt

# 空格转换为tab
echo "it is a long time" | tr [:space:] "\t"

# 压缩重复字符
echo "hello----world" | tr -s "-" " " # hello world

# 删除指定字符

# 删除小写字母
echo "LongTimeAgo" | tr -d a-z  
# 删除数字
echo "hello123" | tr -d 0-9
echo "it is time 2:30" | tr -d [:digit:] 
# 删除数字以外的字符
echo "it is time 2:30" | tr -c -d [:digit:] 
```

### 文本搜索

`grep`是非常强大的文本查询命令, 可以用来查询文本或者文件, 只显示匹配的行

语法: `grep [OPTIONS] PATTERN [FILE...]`

- `grep pattern file`
- `grep -e pattern -f file`

```bash
grep alice /etc/passwd

# 忽略大小写
grep -i one content.txt 

# 搜索目录, 递归地查找包含指定内容的文件
grep -r console  src/utils 

# 只显示包含指定内容文件的名称
grep -r -l console src/utils 

# 单词匹配 不匹配 gone
grep -w one content.txt 

# 匹配计数
grep -c one content.txt 

# 显示行号
grep -n one content.txt 

# 反转 显示不匹配的行
grep -v one content.txt 
```

### 文件比较

`diff` 比较两个文件的差异

语法: `diff [option] file1 file2`

```bash
# 忽略空格差异，比较文件
diff -w file1 file2 
# 并排的格式，显示差异
diff -y file1 file2 
# -w 忽略空格
diff -y -w file1 file2 
# -W 指定列宽
diff -y -W 100 file1 file2 
# 上下对比的格式显示差异
diff -cw file1 file2 
```

## 其他常用命令

### 查看主机名

`hostname` 查看/修改系统的主机名

```bash
# 查看系统主机名
hostname 
# 修改主机名, 只是临时修改，重启将恢复
sudo hostname my-notebook 
# 从文件读取主机名
sudo hostname -F host.txt 

```

### 查看登录用户

`w` `who` 命令

```bash
# 比较详细
w  
# 信息较少
who 
# 系统启动时间
who -b 
# 显示系统登录进程
who -l 
# 显示与当前标准输入关联的用户
who -m 
# 显示系统的运行级别
who -r 

```

显示系统运行时间

语法：`uptime [option]`

### 查看系统信息

语法: `uname [option]`

```bash
# 所有信息
uname -a 
# 显示内核名称
uname 
# 显示主机名 同 hostname
uname -n 
# 内核发行版本
uname -r 
# 系统硬件名称
uname -m 
# 处理器信息
uname -p 
# 硬件平台
uname -i 
uname --help
```

### 显示和设置日期

语法: `date [option] [+format]`

```bash
# 以默认格式显示当前日期
date 

# 以默认格式显示指定日期
date --date '20/2/2012' 
date --date='1 Oct 2012'
date --date='next week'
date --date='last month'
date --date='2 months ago'
date --date='last day'

# 从文件读取多个日期按默认格式显示
date -f date.txt 

# 修改系统日期/时间 并没有设置日期的效果
sudo date --set 'last day' 

# utc时间
date -u 
stat host.txt

# 打印文件最近修改时间
date -r host.txt 

# 指定格式
date +%Y-%m-%d 

```

### 查看用户id

语法: `id [options] [username]`

```bash
# 显示当前用户 uid gid 用户名 组名 属于哪些组
id 
id -u

# 查看指定用户的uid
id -u root 

# 显示用户名
id -un 

# 查看用户所属组的gid
id -g
# 查看用户所属组的组名
id -gn 

# 查看用户属于哪些组
id -G 
id -Gn
id -Gn alice
```

## 总结
作为一个开发者，我发现掌握Linux命令真的能让我事半功倍。

当我需要处理一大堆日志文件时，用 grep 快速搜索关键字比手动查找快了不知道多少倍。有时候需要重命名几十个文件，用 mv 配合通配符一下子就能搞定，再也不用手动一个个改名了。

最让我印象深刻的是，当我需要分析服务器上的问题时，用 tail -f 实时查看日志，用 find 快速定位问题文件，这些命令组合起来就像我的"问题排查工具箱"，帮我快速定位和解决问题。

特别是在云服务器上部署项目时，没有图形界面，全靠命令行操作。如果不懂这些命令，我根本没法完成部署工作。

说实话，刚开始觉得命令行很枯燥，但用习惯了才发现它真的很强大。现在我每天都会用到这些命令，它们已经成为我工作中不可缺少的工具了。学会这些命令，我觉得是每个想在技术路上走得更远的人必须要做的事情。