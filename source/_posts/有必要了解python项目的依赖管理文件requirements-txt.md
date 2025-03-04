---
title: 有必要了解python项目的依赖管理文件requirements.txt
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2025-02-21 06:36:24
tags: Python
categories: Python
---
  
  > 转载自: [https://blog.csdn.net/pearl8899/article/details/113877334](https://blog.csdn.net/pearl8899/article/details/113877334)
  
  ### 1.作用
任何应用程序通常需要安装它的外部依赖库/包。`requirements.txt`包含了项目的外部依赖和具体的版本号，这样在部署的时候，可以自动安装这些依赖，保证环境的一致性。

requirements.txt文件格式：

```cobol
requests==1.2.0 
Flask==0.10.1requests==1.2.0 
Flask==0.10.1
```

这样我们就可以安装requirements.txt依赖

```shell
pip install -r requirements.txt
```

### 2.生成方法

**方法一：整个环境下的安装包都保存到requirements.txt中**

```cobol
pip freeze > requirements.txt
```

作用范围：pip的freeze命令保存了保存当前Python环境下所有类库包，包括那些你没有在当前项目中使用的类库。 （如果你没有的virtualenv)

生成的requirements.txt：速度非常快，不到1s

```cobol
absl-py==0.11.0
aiohttp==3.7.3
async-timeout==3.0.1
attrs==20.3.0
boto3==1.16.41
botocore==1.19.41
cachetools==4.2.0
certifi==2020.12.5
chardet==3.0.4
click==7.1.2
dataclasses==0.8
docopt==0.6.2
filelock==3.0.12
Flask==1.1.2
fsspec==0.8.5
future==0.18.2
```

**方法二：只生成单个项目中的使用到的安装包**

```erlang
pip install pipreqs
pipreqs .
```

作用范围：当前项目使用的类库导出生成为requirements.txt。

使用方法：pipreqs 加上当前路径即可。在导出当前项目使用的类库时，先定位到项目根目录，然后调用 pipreqs ./ --encoding=utf8 命令，该命令避免编码错误，并自动在根目录生成 requirements.txt 文件。

生成的requirements.txt：有点慢，耗时1m多

```cobol
xlwt==1.3.0
tqdm==4.54.1
prefetch_generator==1.0.1
nltk==3.5
transformers==3.4.0
xlrd==1.2.0
torch==1.7.1
XlsxWriter==1.3.7
numpy==1.19.4
requests==2.25.1
scikit_learn==0.24.1
```

### 3.一键安装各种包

最好先用conda建一个新环境，做好环境隔离，不然很有可能会污染你原来的环境，会出现以前跑通的代码，现在跑不通了。

```cobol
pip install -r requirements.txt -i https://pypi.douban.com/simple
```

参考：  
1.https://blog.csdn.net/Irving\_zhang/article/details/79087569  
2.https://blog.csdn.net/orangleliu/article/details/60958525
