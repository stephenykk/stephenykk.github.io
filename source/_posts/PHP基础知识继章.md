---
title: PHP基础知识继章
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2025-01-07 05:36:18
tags: PHP
category: PHP
---

温故而知新，继续上篇PHP基础知识，本文将补充一些应当了解的基础知识，形成相对完整的知识体系。  

内容都比较简单，希望读后能有所收获~

`common.php`包含Demo用到的自定义方法

```php
<?php
function clog($msg, $tag = 'p')
{
    // echo $msg, "\n";
    if (PHP_SAPI === 'cli') {
        echo "[$tag]: " . $msg . "\n";
    } else {
        echo "<$tag>", $msg, "</$tag>";
    }
}

function newline()
{
    echo "<br/>";
}

function clogList($arr)
{
    echo "<ol>";
    foreach ($arr as $val) {
        clog($val, 'li');
    }
    echo "</ol>";
}

function title($ttl, $level = 2)
{
    $tag = "h$level";
    clog($ttl, $tag);
}

function comment($con)
{
    clog(':: ' . $con, tag: 'blockquote');
}

?>
```

## 常用内置方法

### isset
判断变量是否已定义  
不确定变量是否存在，可以用`isset($varname)`先判断，代码更健壮。

```php
<?php
echo isset($done) ? 'y' : 'n' // n
echo $color; // 报错 因为变量$color未定义
?>
```

### unset
删除变量

```php
<?php
$like = true;
echo $like; // 1
unset($like);
echo $like; // 报错 变量已不存在
?>
```
### exit
一般用于提前退出程序，如下代码只输出1-9

```php
<?php

function printNum($i) {
	if ( $i !== 10 ) {
		echo $i , "\n";
	} else {
		exit();
	}
}

$n = 1;

while ($n < 20) {
	printNum($n);
	$n++;
}

```

### empty
判断是否为空  
原始数据类型都有自己预定义的空值，分别为: `0`, `空串`, `false`, `null`;   
复合数据类型(数组、对象)会转换为字符串再判断是否为空，若对象没有提供转换为string的方法，则会报错

```php
<?php
comment('判断变量为空');
class MyObj
{
}
$myObj = new MyObj;
$arr = array('', 0, false, null, array(), $myObj);
foreach ($arr as $val) {
	clog("$val is empty? " . (empty($val) ? 'yes' : 'no'));
}
?>
```

### eval
执行代码字符串，这个其实不常用 :)

```php
<?php
eval('echo "you are so nice";');
?>
```
## 预定义常量

- `PATH_SEPARATOR`  路径分隔符(Windows为分号，类Unix为冒号)
- `DIRECTORY_SEPARATOR` 目录分隔符
- `PHP_EOL` 当前系统的换行符
- `PHP_VERSION` PHP版本号
- `PHP_OS`  PHP服务所在的操作系统
- `PHP_SAPI` 用来判断是使用命令行还是浏览器执行的，如果 `PHP_SAPI=='cli'` 表示是在命令行下执行

## 大小写敏感
只有变量是区分大小写的，类和函数都忽略大小写

```php
<?php
class Animal {
    function show() {
        echo "this is an animal";
    }
}

$a = new animal; // ok 类和函数不区分大小写
$c = 'blue';
echo isset($C) ? 'y' : 'n'; // n 变量区分大小写
?>
```

## 可变标识符
前文讲到PHP支持十分动态的语法，其实质就是标识符的可变性，类名、函数名和变量名等不要求是直接字面量，可以是变量的值。

### 可变变量  
变量名是变量

> shell也支持类似的语法，熟悉shell的同学应该会似曾相识

```php
<?php
$color = 'pink'; 
$name = 'color'; 
echo $$name; // pink

$varname = "english";
$$varname = 90;
echo($english); // 90
?>
```
### 可变函数
函数名是变量

```php
<?php
function func() {
    echo 'hello!';
}
$funName = 'func'; 
$funName(); // hello
```
### 可变类名
类名是变量

```php
<?php
class Person{
    public $word = 'hello';
}
$className = 'Person'; 
$person = new $className; 
echo $person->word;
```

### 可变属性
对象的属性名是变量

```php
<?php
class Person{
    public $word = 'hello';
}
$className = 'Person'; 
$person = new $className; 
$prop = 'word';
echo $person->$prop;
```

### 可变方法
方法名是变量

```php
<?php
class Car{
    public function run() {
        echo "car is running...";
    }
}
$car = new Car;
$method = 'run';
$car->$method();
```

## 传址赋值
变量的赋值通常是传值赋值的，如 `$a = $b`, 其实是把`$b`保存的值存入变量`$a`.  

如下变量a,b的值都是10，但是两个10不是同一个，它们所在的内存地址不同。
```php
<?php
$b = 10;
$a = $b;

```

若采用传址赋值，其实是把b的内存地址传给a, 它们指向同一个10

```php
<?php
$b = 10;
$a = &$b;

```


