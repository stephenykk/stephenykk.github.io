---
title: PHP基础知识总结
date: 2024-03-01 08:56:45
tags: PHP
category: PHP
---

## PHP是什么

PHP全称“PHP: Hypertext Preprocessor”，是超文本预处理器的字母缩写  

PHP是一种创建动态交互性站点的服务器端脚本语言。  

PHP文件可包含HTML、JavaScript代码和PHP代码，PHP代码在服务器上执行，结果以纯HTML形式返回给浏览器。

> PHP文件的默认文件扩展名是 ".php"

## PHP 能做什么

PHP具有访问文件系统和数据库的能力，主要用于web开发，生成动态页面内容。早期很多的CMS（内容管理系统）都是基于PHP开发的，比如：WordPress、Discuz、phpcms等。

## 安装

PHP是一种服务器端脚本语言，需要安装PHP服务器环境才能运行PHP脚本。PHP的服务器环境由以下几个部分组成：

1. Web 服务器
2. PHP 解析器
3. DBMS 数据库管理系统，比如 MySQL

推荐安装集成开发环境 [WAMP](http://www.wampserver.com/) 或者 [XAMPP](https://www.apachefriends.org/zh_cn/index.html)

### 进入交互模式

在交互模式下，你可以输入PHP代码并立即看到结果，而不需要创建一个PHP文件。  

在命令行中输入 `php -a` 进入交互模式

> 交互模式是一个练习和测试PHP代码的环境

```php
php -a
```

## 基本语法

### 脚本位置

PHP脚本可放在文档的任何位置，PHP脚本以 `<?php` 开始，以 `?>` 结束

> 还支持短标签 `<? ... ?>`，但是不推荐使用

```php
<!DOCTYPE html>
<html>
<body>

<h1>My first PHP page</h1>

<?php
echo "Hello World!";
?>

</body>
</html>
```

### 语句结束符

 每条PHP语句都必须以分号(`;`)结束，否则会报错


```php
<h1>My first PHP page</h1>

<?php
$a = 10;
$b = 20;
echo "Hello 10 + 20 = " . ($a + $b);

?>
```

### 注释方式

和大多数程序语言一样，用 `//` 表示单行注释，`/* */` 表示多行注释

```php
<h1>My first PHP page</h1>

<?php

//This is a PHP comment line

/*
This is
a PHP comment
block
*/

?>
```

### 输出语句

PHP 有四种基本的输出方式：

- `echo` 输出一个或多个字符串
- `print` 输出一个字符串
- `print_r` 以易读的格式打印关联数组/对象变量
- `var_dump` 打印变量的相关信息

输出字符串的话，用 `echo` 和 `print` 都可以，区别在于 `echo` 可以输出多个字符串，而 `print` 只能输出一个字符串。

> echo 输出的速度比 print 快， echo 没有返回值，print 有返回值 1

```php
<?php
echo "Hello World!";
// 可用逗号分隔多个字符串，echo 会将它们连接起来
echo "good", "day" // goodday

// 以命令/函数的形式调用 print
print "Hello World!";
print('Hello world');
// print只能传入一个字符串参数。
print("Hello", "Alice"); // 报错
print "hello", "Alice"; // 报错

// print_r() 输出对象/关联数组变量
$colors = array("red", "green", "blue");
print_r($colors);

// var_dump() 输出变量的相关信息
$msg = "hero";
var_dump($msg);
?>
```


输出变量和字符串

```php
<?php
$msg="Learn PHP";
// 直接输出变量
echo $msg;

// 双引号字符串内部可插入变量，单引号不支持变量插值
echo "today, let us $txt2"; 
// 用大括号 显式的指定这是变量
echo "My car is a {$cars[0]}"; 

?>
```

### 变量

变量以 `$` 符号开始，后面跟着变量的名称, 如: `$color`, `$color = red`    

PHP 没有声明变量的命令， 变量在您第一次赋值给它的时候被创建。

```php
<?php
$msg = "hero";
echo "hello ", $msg;
?>
```


PHP 是一门弱类型语言, 会自动将变量做类型转换。

> 在强类型的编程语言中，我们必须在使用变量前先声明（定义）变量的类型和名称。

## 作用域

PHP 有四种不同的变量作用域：

- 局部作用域
- 全局作用域
- 静态作用域
- 参数作用域

### 局部作用域

函数内部为局部作用域，在函数内部声明的变量为局部变量，只能在函数内部访问。

```php
<?php

function mySum($n) {
    $m = 10; // 局部变量
    return $n + $m;
}
?>
```

### 全局作用域

函数外部为全局作用域，函数外部声明的变量称为全局变量  

**函数内部访问全局变量，需要加 `global` 声明**

> PHP不会自动沿着作用域链去查找变量。

```php
<?php
$user = 'Alice';

function outputUser() {
    global $user; // global声明
    echo $user;
}
?>
```

### 静态作用域

静态变量仅在局部作用域中存在，当程序执行离开此作用域时，其值并不丢失。

> 静态变量在函数调用之间保持其值，类似的特性在其他语言中很少见。

```php
<?php
function countUp() {
    static $x = 0;
    $x++;   
    echo '$x is: ' , $x , "\n";
}
countUp();
countUp();
countUp();

// -------
$x=5;
$y=10;

function myTest()
{
global $x,$y;
$y=$x+$y;
}

myTest();
echo $y; // 输出 15
?>
```

### 参数作用域
参数是通过调用代码将值传递给函数的局部变量, 参数是在参数列表中声明的，作为函数声明的一部分

```php
<?php
function myTest($x) {
    $x++;
    echo $x;
}
?>
```

## 超全局变量


PHP将所有全局变量存储在一个名为 `$GLOBALS` 的数组中。 这个数组可以在函数内部访问，可直接用来更新全局变量。

> 超全局变量 `$GLOBALS` 可直接访问，不需要加 `global` 声明

```php
<?php
$x=5;
$y=10;

function myTest()
{
    $GLOBALS['y'] = $GLOBALS['x']+$GLOBALS['y'];
}

myTest();
echo $y;
?>
```

PHP 中预定义了不少超级全局变量（*superglobals*）, 它们在全部作用域中都可直接使用。

- `$GLOBALS`
- `$_SERVER`
- `$_REQUEST`
- `$_POST`
- `$_GET`
- `$_COOKIE`
- `$_FILES`
- `$_ENV`
- `$_SESSION`

`$_SERVER`是一个包含服务端信息的关联数组

```php
<?php

echo $_SERVER['SERVER_NAME'];
echo $_SERVER['SERVER_PROTOCOL'];
echo $_SERVER['REQUEST_METHOD'];
echo $_SERVER['HTTP_HOST'];
echo $_SERVER['HTTP_REFERER']; 
echo $_SERVER['HTTP_USER_AGENT']; 

// /try/demo_source/demo_global_server.php
echo $_SERVER['PHP_SELF']; 
// /try/demo_source/demo_global_server.php
echo $_SERVER['SCRIPT_NAME']; 

?>
```

`$_REQUEST` 用于收集 HTML 表单提交的数据。

```php

<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
    Name: <input type="text" name="fname">
    <input type="submit">
</form>

<?php
    $name = $_REQUEST['fname'];
    echo $name;
?>

```

`$_POST` 用于收集POST方式提交的表单数据

```php
<!--页面post给自己-->
<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
Name: <input type="text" name="fname">
<input type="submit">
</form>

<?php
    $name = $_POST['fname'];
    echo $name;
?>
```

`$_GET` 用于收集GET方式提交的表单数据/URL 中发送的数据


```php

<a href="test_get.php?subject=PHP&web=w3cschool.cc">Test $GET</a>
<?php
    echo "Study " . $_GET['subject'] . " at " . $_GET['web'];
?>

```

## 数据类型

PHP的数据类型包括: string, integer, float, boolean, array, object, null  

> `var_dump()` 可查看变量的数据类型

### 字符串

可以将任何文本放在单引号和双引号中


```php
<?php
// 双引号 包含的字符串可插入变量
$name = 'Alice';
$x = "Hello $name!";

// 单引号 包括字符串字面量 
$x = 'Hello world!'; 

?>
```

和其他语言很不同的是，字符串连接用 `.` 操作符   

转义序列在双引号中才有效

```php
<?php
// 字符串连接
$x = "Hello" . " world!";

// 字符串转义
$x = "Hello world!\n";

?>
```

字符串函数

```php
<?php

//获取字符串长度
echo strlen("Hello world!"); 

//获取子串位置
echo strpos("Hello world!","world"); 
?>
```

### 整型

整型数值有多种进制表示形式

```php
<?php
// 十进制
$x = 5985;
$x = -345; // negative number

// 十六进制 0x开头
$x = 0x8C;

// 八进制 0开头
$x = 047;
?>
```

### 浮点型

浮点数即小数，可用科学计数法表示

```php
<?php

$x = 10.365;

// 科学计数法
$x = 2.4e3;
$x = 8E-5;

?>
```

### 布尔型

布尔型只有两个值: true 和 false

```php
<?php
$isLike = false;
if ($color == "blue") {
    $isLike = true;
}

?>
```

### 数组

一个数组变量可以存储多个值  
数组是很常用的数据结构，分为：普通数组和关联数组

> 用序号做索引的叫普通数组，用字符串做索引的叫关联数组

```php
<?php
// 普通数组
$cars = array("Volvo","BMW","Toyota");
print_r($cars);
echo $cars[0];

// 关联数组
$captain = array("name" => "Lufy", "age" => 18);
echo $captain["name"];
?>
```

数组的使用

```php
<?php
$cars = array("Volvo", "BMW", "Toyota"); 
// 访问元素
echo "I like " . $cars[0] . ", " . $cars[1]; 

// 获取长度
echo count($cars);

// 遍历
$len = count($cars);
for ($i = 0; $i < $len; $i++) {
    echo $cars[$i];
}

// 遍历关联数组
$lufy = array("name" => "Lufy", "skill" => "stretch", "age" => 11);
foreach ($lufy as $key => $value) {
    echo "Key=" . $key . ", Value=" . $value;
}

?>
```

数组排序

- `sort()` 对数组进行升序排列
- `rsort()` 对数组进行降序排列
- `asort()` 根据关联数组的值，对数组进行升序排列
- `arsort()` 根据关联数组的值，对数组进行降序排列
- `ksort()` 根据关联数组的键，对数组进行升序排列
- `krsort()` 根据关联数组的键，对数组进行降序排列

```php
<?php
// sort()
$cars = array("Volvo", "BMW", "Toyota");
sort($cars);

$len = count($cars);
for ($x = 0; $x < $len; $x++) {
    echo $cars[$x];
}

// rsort()
rsort($cars);

//asort() arsort() 关联数组排序 value
$friendAges = array("Peter" => 33, "Ben" => 36, "Joe" => 24);
asort($friendAges);
arsort($friendAges);

//ksort() krsort() 关联数组排序 key
ksort($friendAges);
krsort($friendAges);
```

### 对象

先用 `class` 关键字创建自定义类，然后使用 `new` 关键字创建对象

PHP用箭头 `->` 访问对象的属性和方法

```php
<?php
class Car
{
    var $color;

    function Car($color="green") {
      $this->color = $color;
    }

    function getcolor() {
      return $this->color;
    }
}

function print_vars($obj) {
    // 遍历关联数组
   foreach (get_object_vars($obj) as $prop => $val) {
     echo "\t$prop = $val\n";
   }
}

$myCar = new Car("white");

// show myCar properties
print_vars($myCar);

?>
```

### null类型

null值表示变量没有值   
null类型只有一个值，就是 `null`

```php
<?php

$x = "Hello world!";
$x = null;
var_dump($x);

?>
```

## 常量

常量是一个简单值的标识符，常量在脚本中不能改变，并且在整个脚本中都可以使用

> 常量名不需要加 `$` 修饰符


设置常量，使用 `define()` 函数：

`define(string constant_name, mixed value, case_sensitive = true)`

该函数有三个参数:

- constant_name：必选参数，常量名称，即标志符。
- value：必选参数，常量的值。
- case_sensitive：可选参数，指定是否大小写敏感，设定为 true 表示不敏感。

```php
<?php

define("GREETING", "Welcome to W3CSchool.cc!");
echo GREETING;

?>
```

## 运算符

- 逻辑运算符： `!`, `&&`, `||`, `and`, `or`, `xor`
- 关系运算符： `==`, `!=`, `<>`, `===`, `!==`

> `===` 检查类型和值是否都相等，`!==` 检查类型和值是否不相等

```php
<?php
//数组运算符 合并: + 
$x = array("a" => "red", "b" => "green");
$y = array("c" => "blue", "d" => "yellow");
$z = $x + $y; // $x 和 $y 数组合并
var_dump($z);


// 绝对相等: ===
$n = 10;
$s = '10'
var_dump($n == $s); // true
var_dump($n === $s); // false

// 数组绝对相等，要求对应位置的键值绝对相等(值和类型都相等)
$a = array(10, '20')
$b = array('10', 20)
var_dump($a == $b); // true
var_dump($a === $b); // false

?>
```

## 流程控制

分支和循环流程控制方式和其他语言一致

```php
<?php

$t = date("H");
// 单分支
if ($t < "20") {
    echo "Have a good day!";
}



$t = date("H");
// 双分支
if ($t < "20") {
    echo "Have a good day!";
} else {
    echo "Have a good night!";
}

$t = date("H");
// 多分支
if ($t < "10") {
    echo "good morning!";
} else if ($t < "20") {
    echo "good day!";
} else {
    echo "good night!";
}

$favcolor = "red";
// 多分支
switch ($favcolor) {
    case "red":
        echo "Your favorite color is red!";
        break;
    case "blue":
        echo "Your favorite color is blue!";
        break;
    case "green":
        echo "Your favorite color is green!";
        break;
    default:
        echo "Your favorite color is others";
}

// 条件循环
$i = 1;
while ($i <= 5) {
    echo "The number is " . $i . "<br>";
    $i++;
}


$i = 1;
do {
    $i++;
    echo "The number is " . $i . "<br>";
}
while ($i <= 5);

// 固定次数循环
for ($i = 1; $i <= 5; $i++) {
    echo "The number is " . $i . "<br>";
}

// 循环遍历
$x = array("one", "two", "three");
foreach ($x as $value) {
    echo $value . "<br>";
}
?>
```


## 函数

PHP 的真正威力源自于它的函数, 在 PHP 中，提供了超过 1000 个内建的函数。

```php
<?php
// 函数传参
function outputMessage($fname, $punctuation)
{
    echo $fname . " laugh" . $punctuation . "<br>";
}
outputMessage("Nami", "!!");

// 函数返回值
function add($x, $y)
{
    $total = $x + $y;
    return $total;
}

echo "1 + 16 = " . add(1, 16);

?>
```

## 魔术变量

魔术常量的值跟它们在代码中的位置相关，不同位置会返回不同的值

- `__LINE__` 文件中的当前行号。
- `__FILE__` 文件的完整路径和文件名。如果用在被包含文件中，则返回被包含的文件名。
- `__DIR__` 文件所在的目录。如果用在被包括文件中，则返回被包括的文件所在的目录。
- `__FUNCTION__` 返回该函数被定义时的名字

    ```php
    <?php
    function test() {
        echo  '函数名为：' . __FUNCTION__ ;
    }
    test();
    ?>
    ```

- `__CLASS__` 返回该类被定义时的名字  
   类名包括其被声明的作用区域（例如 `Foo\Bar`）`__CLASS__` 对 trait 也起作用。当用在 trait 方法中时，`__CLASS__` 是调用 trait 方法的类的名字。

    ```php
    <?php
    class test {
        function printInfo() {
            echo '类名为：'  . __CLASS__ . "<br>";
            echo  '函数名为：' . __FUNCTION__ ;
        }
    }
    $t = new test();
    $t->printInfo();
    ?>
    ```

-  `__TRAIT__` Trait 的名字, 自 PHP 5.4.0 起，PHP 实现了代码复用的一个方法，称为 traits。

    Trait 名包括其被声明的作用区域（例如 Foo\Bar）。

    从基类继承的成员sayHello被插入的 SayWorld Trait 中的 sayHello 方法所覆盖。优先顺序是当前类中的方法会覆盖 trait 方法，而 trait 方法又覆盖了基类中的方法。

    ```php
    <?php
    class Base {
        public function sayHello() {
            echo 'Hello ';
        }
    }

    trait SayWorld {
        public function sayHello() {
            parent::sayHello();
            echo 'World!';
        }
    }

    class MyHelloWorld extends Base {
        use SayWorld;
    }

    $o = new MyHelloWorld();
    $o->sayHello();
    ?>
    ```

- `__METHOD__` 返回方法名/函数名

    ```php
    <?php
    function test() {
        echo  '函数名为：' . __METHOD__ ;
    }
    test();
    ?>
    ```

- `__NAMESPACE__` 返回当前命名空间的名称

    ```php
    <?php
    namespace MyProject;

    echo '命名空间为："', __NAMESPACE__, '"'; // 输出 "MyProject"
    ?>
    ```

## 命名空间

PHP 命名空间(namespace)是在 PHP 5.3 中加入的，如果你学过 C#和 Java，那命名空间就不算什么新事物。 不过在 PHP 当中还是有着相当重要的意义。

PHP 命名空间可以解决以下两类问题：

- 用户代码与 PHP 内部的类/函数/常量之间的名字冲突。
- 创建别名，提高源代码的可读性。

默认情况下，所有常量、类和函数名都放在全局空间下，就和 PHP 支持命名空间之前一样。
如果一个文件中包含命名空间，它必须在其它所有代码之前声明命名空间  

声明 `MyProject` 命名空间
```php
< ?php
namespace MyProject;

// ... 代码 ...

```

也可以在同一个php文件中定义不同的命名空间代码
```php
namespace MyProject1;
// MyProject1 命名空间中的PHP代码

namespace MyProject2;
// MyProject2 命名空间中的PHP代码

// 另一种语法
namespace MyProject3 {
 // MyProject3 命名空间中的PHP代码
}

?>
```

在声明命名空间之前唯一合法的代码是用于定义源文件编码方式的 declare 语句。  
所有非 PHP 代码包括空白符都不能出现在命名空间的声明之前。

```php
<?php
declare(encoding='UTF-8');
namespace MyProject {
    const CONNECT_OK = 1;
    class Connection { /* ... */ }
    function connect() { /* ... */  }
}

// namespace不带名称，则表示全局命名空间
namespace { 
    session_start();
    $a = MyProject\connect();
    echo MyProject\Connection::start();
}
?>
```

以下代码会出现语法错误：

```php
<html>
<?php
namespace MyProject; 
// 命名空间前出现了“<html>” 会致命错误
?>
```

### 子命名空间

类似父文件夹包含子文件夹，命名空间下还可以划分子命名空间。子命名空间同样可以包含类、函数和常量等。

```php
<?php
namespace MyProject\Sub\Level;

const CONNECT_OK = 1;

class Connection { /* ... */ }

function Connect() { /* ... */  }

?>
```

### 命名空间的使用

PHP命名空间里的类可以通过三种方式引用：非限定名称，限定名称，完全限定名称。

1. 非限定名称  

    非限定名称即不包含前缀的类名称。  

    用非限定名称访问类和类的静态方法
    ```php
    $a = new foo(); 
    foo::staticmethod();
    ?>
    ```

    如果当前命名空间是 MyBlog, 则 `foo` 将被解析为 `MyBlog\foo`。非限定名称的引用默认在当前命名空间查找，找不到的话就会到全局命名空间找

2. 限定名称  
    限定名称即包含前缀的类名称。  

    ```php
    $a = new BlogCommon\foo(); 
    BlogCommon\foo::staticmethod();
    ?>
    ```    
    如果当前的命名空间是 `MyBlog` 则 `foo` 会被解析为 `MyBlog\BlogCommon\foo`。带相对命名空间前缀的引用，自动在开头添加调用代码所处的命名空间 (*类似相对路径*)

3. 完全限定名称  
    包含了全局前缀操作符的名称
    ```php
    $a = new \MyBlog\foo();
    \MyBlog\foo::staticmethod();
    ?>
    ```
    `foo` 总是被解析为 `\MyBlog\foo`。带绝对命名空间前缀的引用,引用路径已明确，不会添加任何前缀。(*类似绝对路径*)

### 命名空间综合示例

假设现在有两个文件：`lufy.php` 和 `onePiece.php`，它们分别属于两个不同的命名空间 `OnePiece\Lufy` 和 `OnePiece`   

lufy.php 代码如下

```php
<?php
namespace OnePiece\Lufy;

const FAV = 'Eating';
function sayHi() {
    echo "hello everyone";
}
class Ability {
    static function learn($name) {
        echo "Lufy is learning ability $name!";
    }
}
?>
```

onePiece.php 代码如下

```php
<?php
namespace OnePiece;
include 'lufy.php';

const FAV = 'Opening Party';
function sayHi() {
    echo "hihi everyone";
}
class Ability {
    static function learn($name) {
        echo "Zoro and others are learning ability $name!";
    }
}

// 非限定名称

// 解析为 \OnePiece\sayHi
sayHi();

// 解析为 \OnePiece\Ability::learn
Ability::learn('php'); 

// 限定名称

// 解析为 \OnePiece\Lufy\sayHi
Lufy\sayHi(); 

// 解析为类 \OnePiece\Lufy\Ability, 以及类的方法 learn
Lufy\Ability::learn('php'); 

// 完全限定名称

\OnePiece\Lufy\sayHi(); 
\OnePiece\Lufy\Ability::learn('php');

?>
```

### 命名空间内访问全局空间

在命名空间内部访问全局类、函数和常量, 用 `\` 前缀即可：

```php
<?php
namespace Foo;

function strlen() {}
const INI_ALL = 3;
class Exception {}

$a = \strlen('hi'); // 调用全局函数strlen
$b = \INI_ALL; // 访问全局常量 INI_ALL
$c = new \Exception('error'); // 实例化全局类 Exception
?>
```

## 动态语言特征

PHP动态访问类、函数和常量

> 类和函数的名称存在变量中，然后用该变量动态调用类和函数，这种极其动态的访问方式很强大，但是不常用

```php
//example.php

<?php
class MyClass {
    function __construct() {
        echo __METHOD__, "\n";
    }
}

function myFunction(){
    echo __FUNCTION__, "\n";
}

const MY_FAV = "LEARNING";

$a = 'MyClass';
$obj = new $a; // MyClass::__construct

$b = 'myFunction';
$b(); // myFunction

echo constant('MY_FAV'), "\n"; // LEARNING
?>
```

动态访问命名空间下的类、函数和常量

```php
<?php
namespace OnePiece;
class MyClass {
    function __construct() {
        echo __METHOD__, "\n";
    }
}
function myFunction() {
    echo __FUNCTION__, "\n";
}
const MY_CODE = "TIDY";

$a = 'OnePiece\MyClass';
$obj = new $a; // prints OnePiece\MyClass::__construct

$b = 'OnePiece\myFunction';
$b(); // OnePiece\myFunction

echo constant('OnePiece\MY_CODE'), "\n"; // prints namespaced
?>
```

**namespace 关键字和**NAMESPACE**常量**

常量**NAMESPACE**的值是包含当前命名空间名称的字符串。在全局的，不包括在任何命名空间中的代码，它包含一个空的字符串

```php
<?php
namespace MyProject;

echo '"', __NAMESPACE__, '"'; // 输出 "MyProject"
?>
```

```php
<?php

echo '"', __NAMESPACE__, '"'; // 输出 ""
?>
```

使用**NAMESPACE**动态创建名称

```php
<?php
namespace MyProject;

function get($classname)
{
    $a = __NAMESPACE__ . '\\' . $classname;
    return new $a;
}
?>
```

关键字 namespace 可用来显式访问当前命名空间或子命名空间中的元素。它等价于类中的 self 操作符。

```php
<?php
namespace MyProject;

use blah\blah as mine; // see "Using namespaces: importing/aliasing"

blah\mine(); // calls function blah\blah\mine()
namespace\blah\mine(); // calls function MyProject\blah\mine()

namespace\func(); // calls function MyProject\func()
namespace\sub\func(); // calls function MyProject\sub\func()
namespace\cname::method(); // calls static method "method" of class MyProject\cname
$a = new namespace\sub\cname(); // instantiates object of class MyProject\sub\cname
$b = namespace\CONSTANT; // assigns value of constant MyProject\CONSTANT to $b
?>
```

**使用命名空间：别名/导入**
PHP 命名空间支持 有两种使用别名或导入方式：为类名称使用别名，或为命名空间名称使用别名。注意 PHP 不支持导入函数或常量。

在 PHP 中，别名是通过操作符 use 来实现的. 下面是一个使用所有可能的三种导入方式的例子：

1. 使用 use 操作符导入/使用别名

```php
<?php
namespace foo;
use My\Full\Classname as Another;

// 下面的例子与 use My\Full\NSname as NSname 相同
use My\Full\NSname;

// 导入一个全局类
use \ArrayObject;

$obj = new namespace\Another; // 实例化 foo\Another 对象
$obj = new Another; // 实例化 My\Full\Classname　对象
NSname\subns\func(); // 调用函数 My\Full\NSname\subns\func
$a = new ArrayObject(array(1)); // 实例化 ArrayObject 对象
// 如果不使用 "use \ArrayObject" ，则实例化一个 foo\ArrayObject 对象
?>
```

2. 一行中包含多个 use 语句

```php
<?php
use My\Full\Classname as Another, My\Full\NSname;

$obj = new Another; // 实例化 My\Full\Classname 对象
NSname\subns\func(); // 调用函数 My\Full\NSname\subns\func
?>
```

导入操作是在编译执行的，但动态的类名称、函数名称或常量名称则不是。

3. 导入和动态名称

```php
<?php
use My\Full\Classname as Another, My\Full\NSname;

$obj = new Another; // 实例化一个 My\Full\Classname 对象
$a = 'Another';
$obj = new $a;      // 实际化一个 Another 对象
?>
```

另外，导入操作只影响非限定名称和限定名称。完全限定名称由于是确定的，故不受导入的影响。

4. 导入和完全限定名称

```php
<?php
use My\Full\Classname as Another, My\Full\NSname;

$obj = new Another; // instantiates object of class My\Full\Classname
$obj = new \Another; // instantiates object of class Another
$obj = new Another\thing; // instantiates object of class My\Full\Classname\thing
$obj = new \Another\thing; // instantiates object of class Another\thing
?>
```

**使用命名空间：后备全局函数/常量**

在一个命名空间中，当 PHP 遇到一个非限定的类、函数或常量名称时，它使用不同的优先策略来解析该名称。

-   **类名称总是解析到当前命名空间中的名称(找不到就报错咯)**。因此在访问系统内部或不包含在命名空间中的类名称时，必须使用完全限定名称
-   函数和常量来说，如果当前命名空间中不存在该函数或常量，PHP 会退而使用全局空间中的函数或常量。

```php
<?php
namespace A\B\C;
class Exception extends \Exception {}

$a = new Exception('hi'); // $a 是类 A\B\C\Exception 的一个对象
$b = new \Exception('hi'); // $b 是类 Exception 的一个对象

$c = new ArrayObject; // 致命错误, 找不到 A\B\C\ArrayObject 类
?>
```

**全局空间**
如果没有定义任何命名空间，所有的类与函数的定义都是在全局空间，与 PHP 引入命名空间概念前一样。在名称前加上前缀 \ 表示该名称是全局空间中的名称，即使该名称位于其它的命名空间中时也是如此。

```php
<?php
namespace A\B\C;

/* 这个函数是 A\B\C\fopen */
function fopen() {
     /* ... */
     $f = \fopen(...); // 调用全局的fopen函数
     return $f;
}
?>
```

**命名空间的顺序 略..**

## PHP 文件处理

**打开文件**

$file = fopen($fname, mode) //文件的名称, 打开模式

-   r 只读。在文件的开头开始。
-   r+ 读/写。在文件的开头开始。
-   w 只写。打开并清空文件的内容；如果文件不存在，则创建新文件。
-   w+ 读/写。打开并清空文件的内容；如果文件不存在，则创建新文件。
-   a 追加。打开并向文件末尾进行写操作，如果文件不存在，则创建新文件。
-   a+ 读/追加。通过向文件末尾写内容，来保持文件内容。
-   x 只写。创建新文件。如果文件已存在，则返回 FALSE 和一个错误。
-   x+ 读/写。创建新文件。如果文件已存在，则返回 FALSE 和一个错误。

注释：如果 fopen() 函数无法打开指定文件，则返回 0 (false)。

```php
<?php
//打开文件
$file = fopen("welcome.txt", "r") or exit("Unable to open file!");
//Output a line of the file until the end is reached

//是否到达文件末尾
while(!feof($file))
{
echo fgets($file). "<br>"; //逐行读取文件
//echo fgetc($file); //逐字符读取

}
//关闭文件
fclose($file);
?>
```

**Filesystem 函数**

-   basename() 返回路径中的文件名部分。
-   chgrp() 改变文件组。
-   chmod() 改变文件模式。
-   chown() 改变文件所有者。
-   clearstatcache() 清除文件状态缓存。
-   copy() 复制文件。
-   delete() 参见 unlink() 或 unset()
-   dirname() 返回路径中的目录名称部分。
-   disk_free_space() 返回目录的可用空间。
-   disk_total_space() 返回一个目录的磁盘总容量。
-   diskfreespace() disk_free_space() 的别名。
-   fclose() 关闭打开的文件。
-   feof() 测试文件指针是否到了文件末尾。
-   fflush() 向打开的文件刷新缓冲输出。
-   fgetc() 从打开的文件中返回字符。
-   fgetcsv() 从打开的文件中解析一行，校验 CSV 字段。
-   fgets() 从打开的文件中返回一行。
-   fgetss() 从打开的文件中返回一行，并过滤掉 HTML 和 PHP 标签。
-   file() 把文件读入一个数组中。
-   file_exists() 检查文件或目录是否存在。
-   file_get_contents() 把文件读入字符串。~~获取文件内容
-   file_put_contents() 把字符串写入文件。~~写入文件内容
-   fileatime() 返回文件的上次访问时间。
-   filectime() 返回文件的上次修改时间。
-   filegroup() 返回文件的组 ID。
-   fileinode() 返回文件的 inode 编号。
-   filemtime() 返回文件内容的上次修改时间。
-   fileowner() 返回文件的用户 ID （所有者）。
-   fileperms() 返回文件的权限。
-   filesize() 返回文件大小。
-   filetype() 返回文件类型。
-   flock() 锁定或释放文件。
-   fnmatch() 根据指定的模式来匹配文件名或字符串。
-   fopen() 打开一个文件或 URL。
-   fpassthru() 从打开的文件中读数据，直到文件末尾（EOF），并向输出缓冲写结果。
-   fputcsv() 把行格式化为 CSV 并写入一个打开的文件中。
-   fputs() fwrite() 的别名。
-   fread() 读取打开的文件。
-   fscanf() 根据指定的格式对输入进行解析。
-   fseek() 在打开的文件中定位。
-   fstat() 返回关于一个打开的文件的信息。
-   ftell() 返回在打开文件中的当前位置。
-   ftruncate() 把打开文件截断到指定的长度。
-   fwrite() 写入打开的文件。
-   glob() 返回一个包含匹配指定模式的文件名/目录的数组。
-   is_dir() 判断文件是否是一个目录。
-   is_executable() 判断文件是否可执行。
-   is_file() 判断文件是否是常规的文件。
-   is_link() 判断文件是否是连接。
-   is_readable() 判断文件是否可读。
-   is_uploaded_file() 判断文件是否是通过 HTTP POST 上传的。
-   is_writable() 判断文件是否可写。
-   is_writeable() is_writable() 的别名。
-   lchgrp() 改变符号连接的组所有权。
-   lchown() 改变符号连接的用户所有权。
-   link() 创建一个硬连接。
-   linkinfo() 返回有关一个硬连接的信息。
-   lstat() 返回关于文件或符号连接的信息。
-   mkdir() 创建目录。
-   move_uploaded_file() 把上传的文件移动到新位置。
-   parse_ini_file() 解析一个配置文件。
-   parse_ini_string() 解析一个配置字符串。
-   pathinfo() 返回关于文件路径的信息。
-   pclose() 关闭由 popen() 打开的进程。
-   popen() 打开一个进程。
-   readfile() 读取一个文件，并写入到输出缓冲。
-   readlink() 返回符号连接的目标。
-   realpath() 返回绝对路径名。
-   realpath_cache_get() 返回高速缓存条目。
-   realpath_cache_size() 返回高速缓存大小。
-   rename() 重命名文件或目录。
-   rewind() 倒回文件指针的位置。
-   rmdir() 删除空的目录。
-   set_file_buffer() 设置已打开文件的缓冲大小。
-   stat() 返回关于文件的信息。
-   symlink() 创建符号连接。
-   tempnam() 创建唯一的临时文件。
-   tmpfile() 创建唯一的临时文件。
-   touch() 设置文件的访问和修改时间。
-   umask() 改变文件的文件权限。
-   unlink() 删除文件。

## PHP JSON

-   json_encode 对变量进行 JSON 编码
-   json_decode 对 JSON 格式的字符串进行解码，转换为 PHP 变量
-   json_last_error 返回最后发生的错误

**string json_encode ( $value [, $options = 0 ] )**
参数

value: 要编码的值。该函数只对 UTF-8 编码的数据有效。
options:由以下常量组成的二进制掩码：JSON_HEX_QUOT, JSON_HEX_TAG, JSON_HEX_AMP, JSON_HEX_APOS, JSON_NUMERIC_CHECK,JSON_PRETTY_PRINT, JSON_UNESCAPED_SLASHES, JSON_FORCE_OBJECT

```php
<?php
   $arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);
   echo json_encode($arr);


    class Emp {
       public $name = "";
       public $hobbies  = "";
       public $birthdate = "";
   }
   $e = new Emp();
   $e->name = "sachin";
   $e->hobbies  = "sports";
   $e->birthdate = date('m/d/Y h:i:s a', "8/5/1974 12:20:03 p");
   $e->birthdate = date('m/d/Y h:i:s a', strtotime("8/5/1974 12:20:03"));

   echo json_encode($e);
?>
```

**mixed json_decode ($json [,$assoc = false [, $depth = 512 [, $options = 0 ]]])**
参数

json_string: 待解码的 JSON 字符串，必须是 UTF-8 编码数据

assoc: 当该参数为 TRUE 时，将返回数组，FALSE 时返回对象。

depth: 整数类型的参数，它指定递归深度

options: 二进制掩码，目前只支持 JSON_BIGINT_AS_STRING 。

```php
<?php
   $json = '{"a":1,"b":2,"c":3,"d":4,"e":5}';

   var_dump(json_decode($json));
   var_dump(json_decode($json, true));
?>
```
