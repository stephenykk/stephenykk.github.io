---
title: 值得了解的Python虚拟环境
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2025-02-21 06:54:40
tags: Python
categories: Python
---
  
  > 转载自: [https://blog.csdn.net/peanutwang/article/details/144555317](https://blog.csdn.net/peanutwang/article/details/144555317)
  
  #### 1\. **安装虚拟环境工具**

从 Python 3.3 开始，Python 自带了 `venv` 模块，{% mark 无需额外安装 color:purple %}。你可以直接使用它来[创建虚拟环境](https://so.csdn.net/so/search?q=%E5%88%9B%E5%BB%BA%E8%99%9A%E6%8B%9F%E7%8E%AF%E5%A2%83&spm=1001.2101.3001.7020)。

#### 2\. **创建虚拟环境**

##### 2.1 使用 `venv` 创建虚拟环境

使用以下命令创建虚拟环境。这里我使用了 `venv` 来创建虚拟环境，并且命名为 `myvenv`，你也可以选择任何其他名称。

`python -m venv myvenv`

-   `python -m venv myvenv`：这条命令会在当前目录下创建一个名为 myvenv 的虚拟环境和文件夹。
-   如果你有多个 Python 版本，你可能需要指定 Python 版本，如 `python3.8` 或 `python3`，以确保使用正确的版本。

##### 2.2 查看虚拟环境文件

[虚拟环境创建](https://so.csdn.net/so/search?q=%E8%99%9A%E6%8B%9F%E7%8E%AF%E5%A2%83%E5%88%9B%E5%BB%BA&spm=1001.2101.3001.7020)后，会在当前目录下生成一个 myvenv 文件夹。里面包含了虚拟环境所需的文件和目录结构：

-   **bin**：包含虚拟环境的可执行文件（如 `python`）。
-   **lib**：包含虚拟环境的库文件。
-   **include**：包含用于编译 C 扩展模块的头文件。
-   **Scripts**（Windows）：包含 `activate.bat` 等脚本。

{% note "linux下安装，没有Scripts文件夹，执行 source bin/activate 激活虚拟环境" color:yellow %}
* * *

#### 3\. 激活虚拟环境

-   `.\myvenv\Scripts\activate`
    
    执行后，你会看到命令行前面出现虚拟环境的名称 `(myvenv)`，表示虚拟环境已经被激活。
    
-   激活后，你会看到命令行前面加上 `(myvenv)`，这表示当前已经进入虚拟环境。
    
-   或者进入myvenv目录，运行`Scripts\activate`
    

* * *

#### 4\. **使用虚拟环境**

当虚拟环境激活后，你可以在虚拟环境中安装和管理 Python 包。所有通过 `pip` 安装的包只会影响当前虚拟环境，而不会影响全局的 Python 安装。

##### 4.1 安装依赖包

你可以在虚拟环境中使用 `pip` 来安装你需要的依赖包：

```cobol
pip install <package_name> 
```

##### 4.2 查看安装的包

你可以使用 `pip list` 查看虚拟环境中安装的所有包：

```undefined
pip list 
```

##### 4.3 卸载包

如果你不再需要某个包，可以使用 `pip uninstall` 卸载它：

`pip uninstall <package_name>`

#### 5\. **生成 `requirements.txt`**

`requirements.txt` 文件是记录项目依赖包的常见方式，通常用于分享和复现环境。

##### 5.1 创建 `requirements.txt`

你可以使用 `pip freeze` 命令生成当前虚拟环境的依赖包列表，并将其保存到 `requirements.txt` 文件中：

`pip freeze > requirements.txt`

该命令会将虚拟环境中所有已安装的包及其版本记录到 `requirements.txt` 文件中。

##### 5.2 用 `requirements.txt` 安装依赖

当其他人获取到你的项目代码时，他们可以使用 `requirements.txt` 安装项目所需的所有依赖：

```undefined
pip install -r requirements.txt 
```

#### 6\. **退出虚拟环境**

当你完成工作后，可以通过以下命令退出虚拟环境：

`deactivate`

退出后，你的命令行会回到系统的默认 Python 环境。

{% note "linux下也是执行 deactivate" %}

#### 7\. **删除虚拟环境**

如果你不再需要某个虚拟环境，可以删除它。只需要删除包含虚拟环境的文件夹即可（如上例的 `myvenv` 文件夹）。

#### 8\. **使用虚拟环境的好处**

-   **隔离依赖**：每个项目都有自己的依赖包，避免版本冲突。
-   **干净的工作环境**：不同项目之间的库版本不会互相影响。
-   **便于部署**：通过 `requirements.txt` 文件，你可以轻松地为其他开发者或生产环境部署项目。

#### 9\.IDLE 使用虚拟环境

Python IDLE Shell 可以使用虚拟环境，但设置起来稍微有点不同，因为 {% mark IDLE 默认启动的是系统 Python 环境。要在 IDLE 中使用虚拟环境，你需要手动指定虚拟环境中的 Python 解释器 color:purple %}。

```shell
myenv\\Scripts\\python.exe -m idlelib.idle
```

这样，IDLE 将会启动，并使用虚拟环境中的 Python 解释器。你可以在 IDLE 中执行代码，并确保它使用的是虚拟环境中安装的依赖，而不是全局 Python 环境中的库。

注意：在IDLE没有关闭之前，不能安装其他包。因为显示IDLE的时候，命令还在执行。

#### 10\.检查是否虚拟环境

在 IDLE 中，你可以通过运行以下命令来{% mark 检查当前 Python 环境是否是虚拟环境 color:purple %}：

```scss
import sys 
print(sys.executable)
```