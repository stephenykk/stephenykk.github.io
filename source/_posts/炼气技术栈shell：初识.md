---
title: 炼气技术栈shell 初识
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2025-06-03 22:40:45
tags: shell
---

## 简介
简单来说，Shell脚本就是一系列命令的集合，这些命令被保存在一个文本文件中，然后通过Shell（*一个解释执行命令的程序*）来运行这个文件。就像你有一串指令，比如“先开门，再开灯，最后坐下”，Shell脚本就是把这些指令写下来，然后让电脑自动帮你完成这一系列动作。

## 应用领域
- **自动化** 重复的任务可以自动化完成，节省时间。
- **批量处理** 对大量文件或数据进行统一操作。
- **系统管理** 管理员常用Shell脚本进行系统配置、监控和维护。
- **学习编程** Shell脚本是学习编程的入门语言之一，简单易懂。

## 基本结构
一个基本的Shell脚本通常包含以下几个部分 

**Shebang（#!）** 告诉系统这个脚本应该用哪个解释器来执行，比如`#!/bin/bash`表示使用Bash Shell。
**注释** 以`#`开头，用于说明脚本的功能、作者等信息，不会被执行。
**命令** 实际要执行的命令。

## 第一个脚本

1. **创建文件** 用文本编辑器（如nano、vim、gedit等）创建一个新文件，比如hello.sh。
    ```bash
    #!/bin/bash
    # 这是我的第一个Shell脚本
    echo "Hello, World!"
    ```
2. **保存并退出** 根据编辑器的不同，保存并退出编辑器。
3. **赋予执行权限** 在终端中，使用`chmod +x hello.sh`命令给脚本添加执行权限。
4. **运行脚本** 在终端中，输入`./hello.sh`来运行你的脚本，又或者用bash执行脚本 `bash hello.sh`。你应该会看到输出Hello, World!。

## 变量
变量是存储数据的容器。在Shell脚本中，变量不需要声明类型，直接赋值即可使用。

> 赋值符号 `=` 两边不能有空格，否则会报错。
```bash
#!/bin/bash
name="Alice"
echo "Hello, $name!"
```

运行这个脚本，你会看到输出Hello, Alice!。

## 条件判断
Shell脚本支持条件判断，比如`if`语句。

```bash
#!/bin/bash
age=20 # 注意=左右不能有空格
if [ $age -ge 18 ]; then
    echo "You are an adult."
else
    echo "You are a minor."
fi
```
这个脚本会检查变量age的值，如果大于等于18，就输出“You are an adult.”，否则输出“You are a minor.”。

## 循环
Shell脚本也支持循环，比如for循环。

```bash
#!/bin/bash
for i in {1..5}; do
    echo "Number: $i"
done
```
这个脚本会输出数字1到5。

## 学习建议
- **多实践** 理论结合实践，多写脚本，多尝试不同的命令和结构。
- **阅读文档** 利用`man`命令查看命令的帮助文档，比如`man echo`。
- **参考示例** 网上有很多Shell脚本的示例，可以参考学习。

## 总结
Shell脚本是一个强大而灵活的工具，掌握它能让你的Linux/Unix系统操作更加高效。希望这篇文章能帮让你对Shell脚本有个基本了解。