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

PHP基本语法相关的练习，可参考代码库(https://gitee.com/stephenykk/php-starter)   

以下示例中的自定义方法定义在`common.php`中, 内容如下:

```php
<?php
function clog($msg, $tag = 'p')
{
    // echo $msg, "\n";
    echo "<$tag>", $msg, "</$tag>";
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

### $GLOBALS

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

### $_SERVER

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

### $_REQUEST

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
### $_POST

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
### $_GET

`$_GET` 用于收集GET方式提交的表单数据/URL中发送的数据

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

整型数值有多种进制表示形式，进制转换函数 `base_convert()`

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

### null

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


定义常量，使用 `define()` 函数：

`define(string constant_name, mixed value, case_sensitive = true)`

该函数有三个参数:

- constant_name：必选参数，常量名称，即标志符。
- value：必选参数，常量的值。
- case_sensitive：可选参数，指定是否大小写敏感，设定为 true 表示不敏感。

```php
<?php

define("GREETING", "Welcome to Hero College!");
echo GREETING;

?>
```

## 运算符

- 逻辑运算符： `!`, `&&`, `||`, `and`, `or`, `xor`
- 关系运算符： `==`, `!=`, `<>`, `===`, `!==`

> `===` 检查类型和值是否都相等，`!==` 检查类型和值是否不完全相等

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

分支和循环流程的控制语法和JAVA等语言一样

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
    class Car {
        function printInfo() {
            echo '类名为：'  . __CLASS__ . "<br>";
            echo  '函数名为：' . __FUNCTION__ ;
        }
    }
    $t = new Car();
    $t->printInfo();
    ?>
    ```

-  `__TRAIT__` Trait 的名字, 自 PHP 5.4.0 起，PHP 实现了代码复用的一个方法，称为 traits。

    Trait 名包括其被声明的作用区域（例如 Foo\Bar）。

    从基类继承的成员sayHello被插入的 SayWorld Trait 中的 sayHello 方法所覆盖。     
    优先顺序是： 
    1. 当前类中的方法会覆盖 trait 方法，
    2. trait 方法又覆盖了基类中的方法。

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

## 动态语言特征

PHP支持动态访问类、函数和常量

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

在声明命名空间之前，唯一合法的代码是用于定义源文件编码方式的 declare 语句。  
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
    $a = new Foo(); 
    Foo::staticmethod();
    ?>
    ```

    如果当前命名空间是 MyBlog, 则 `Foo` 将被解析为 `MyBlog\Foo`。非限定名称的引用默认在当前命名空间查找，找不到的话就会到全局命名空间找

2. 限定名称  
    限定名称即包含前缀的类名称。  

    ```php
    $a = new BlogCommon\Foo(); 
    BlogCommon\Foo::staticmethod();
    ?>
    ```    
    如果当前的命名空间是 `MyBlog` 则 `Foo` 会被解析为 `MyBlog\BlogCommon\Foo`。带相对命名空间前缀的引用，自动在开头添加调用代码所处的命名空间 (*类似相对路径*)

3. 完全限定名称  
    包含了全局前缀操作符的名称
    ```php
    $a = new \MyBlog\Foo();
    \MyBlog\Foo::staticmethod();
    ?>
    ```
    `Foo` 总是被解析为 `\MyBlog\Foo`。带绝对命名空间前缀的引用,引用路径已明确，不会添加任何前缀。(*类似绝对路径*)

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
    echo "hi, everyone! we are a team!";
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

### 动态访问命名空间

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
$obj = new $a(); // OnePiece\MyClass::__construct

$b = 'OnePiece\myFunction';
$b(); // OnePiece\myFunction

echo constant('OnePiece\MY_CODE'), "\n"; // TIDY
?>
```

### 命名空间魔术变量

命名空间魔术变量 `__NAMESPACE__`的值是当前命名空间名称，在全局命名空间中的，它的值为空字符串

```php
<?php
namespace MyProject;

echo '"', __NAMESPACE__, '"'; // 输出 "MyProject"
?>
```


使用`__NAMESPACE__`动态访问类，并创建实例。

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
### `namespace`关键字

关键字 `namespace` 的作用有两个  
- 声明一个命名空间
- 用来显式访问当前命名空间或子命名空间中的元素。它等价于类中的 `self` 操作符。

```php
<?php
namespace OnePiece;

function sayHi() {
    echo "Hi, everybody~~";
}

class Ability {
    static function learn($name) {
        echo "I can learn ", $name, "\n";
    }
}

const LIKE_COLOR = 'SKY-BLUE';

namespace\sayHi(); 
namespace\Ability::learn('PHP'); 
echo namespace\LIKE_COLOR; 

?>
```

### 命名空间别名
PHP支持为命名空间和命名空间内部类定义别名  

> 注意：PHP不支持为导入命名空间内的函数或常量定义别名。


使用 `use` 关键字定义别名

`captain-lufy.php`代码如下:

```php
<?php
namespace Cartoon\OnePiece\Lufy;

include 'inc/header.php';

function sayHi()
{
	clog("hi, I am lufy");
}

class Hobby
{
	var $likings;

	function add($name)
	{
		$this->likings[] = $name;
	}

	function show()
	{
		print_r($this->likings);
	}
}


// $lufyHobby = new Hobby();
// $lufyHobby->add('eating');
// $lufyHobby->add('sleeping');
// $lufyHobby->show();

include 'inc/footer.php';
```

`use-namespace.php`用于测试命名空间别名，代码如下

```php
<?php

include 'captain-lufy.php';

// 直接用完整命名空间路径引用里面的方法
Cartoon\OnePiece\Lufy\sayHi();

// 同 use Cartoon\OnePiece\Lufy as Lufy;
use Cartoon\OnePiece\Lufy;
Lufy\sayHi();

use Cartoon\OnePiece\Lufy as Lu;
Lu\sayHi();

// 可以给命名空间内的类起别名
use Cartoon\OnePiece\Lufy\Hobby as Hob;
$hob = new Hob();
$hob->add('running');
$hob->show();
```

一行中包含多个 use 语句

```php
<?php
use My\Full\Classname as MyClass, My\Full\NSname;

$obj = new MyClass; // 实例化 My\Full\Classname 对象
NSname\subns\func(); // 调用函数 My\Full\NSname\subns\func
?>
```

导入操作是在编译执行的，但动态的类名称、函数名称或常量名称则不是。

```php
<?php
use My\Full\Classname as Another, My\Full\NSname;

$obj = new Another; // 实例化一个 My\Full\Classname 对象
$a = 'Another';
$obj = new $a;      // 实例化一个 Another 对象
?>
```

另外，导入操作只影响非限定名称和限定名称。完全限定名称由于是确定的，故不受导入的影响。

```php
<?php
use My\Full\Classname as Another, My\Full\NSname;

$obj = new Another; // instantiates object of class My\Full\Classname
$obj = new \Another; // instantiates object of class Another
$obj = new Another\thing; // instantiates object of class My\Full\Classname\thing
$obj = new \Another\thing; // instantiates object of class Another\thing
?>
```
### 命名空间查找
在一个命名空间中，当 PHP 遇到一个非限定的类、函数或常量名称时，它使用不同的优先策略来解析该名称。

- 类名总是解析到当前命名空间(找不到就会报错)。因此在访问系统内部或不包含在命名空间中的类名称时，必须使用完全限定名称
- 函数和常量来说，如果当前命名空间中不存在该函数或常量，PHP 会退而使用全局空间中的函数或常量。

```php
<?php
namespace A\B\C;
class Exception extends \Exception {}

$a = new Exception('hi'); // $a 是类 A\B\C\Exception 的一个对象
$b = new \Exception('hi'); // $b 是类 Exception 的一个对象

$c = new ArrayObject; // 致命错误, 找不到 A\B\C\ArrayObject 类
?>
```

### 全局命名空间
如果没有定义任何命名空间，所有的类与函数的定义都是在全局空间，与 PHP 引入命名空间概念前一样。在名称前加上前缀 `\` 表示该名称是全局空间中的名称。

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

## 文件处理

### 打开文件

打开文件用函数`fopen()`

```php
<?php
$file = fopen($fname, mode) //文件的名称, 打开模式
```
文件打开模式

- `r` 只读。在文件的开头开始。
- `r+` 读/写。在文件的开头开始。
- `w` 只写。打开并清空文件的内容；如果文件不存在，则创建新文件。
- `w+` 读/写。打开并清空文件的内容；如果文件不存在，则创建新文件。
- `a` 追加。打开并向文件末尾进行写操作，如果文件不存在，则创建新文件。
- `a+` 读/追加。通过向文件末尾写内容，来保持文件内容。
- `x` 只写。创建新文件。如果文件已存在，则返回 FALSE 和一个错误。
- `x+` 读/写。创建新文件。如果文件已存在，则返回 FALSE 和一个错误。

如果 `fopen()` 函数无法打开指定文件，则返回 0 (false)。

```php
<?php
//打开文件
$file = fopen("welcome.txt", "r") or exit("Unable to open file!");
// Output a line of the file until the end is reached

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

文件系统相关的函数

- `basename()` 返回路径中的文件名部分。
- `dirname()` 返回路径中的目录名称部分。
- `realpath()` 返回绝对路径名。
- `pathinfo()` 返回关于文件路径的信息。

- `copy()` 复制文件。
- `delete()` 参见 unlink() 或 unset()
- `rename()` 重命名文件或目录。
- `mkdir()` 创建目录。
- `rmdir()` 删除空的目录。
- `unlink()` 删除文件。
- `is_dir()` 判断文件是否是一个目录。
- `is_file()` 判断文件是否是常规的文件。
- `fstat()` 返回关于一个打开的文件的信息。

- `fclose()` 关闭打开的文件。
- `feof()` 测试文件指针是否到了文件末尾。
- `fgetc()` 从打开的文件中返回字符。
- `fgets()` 从打开的文件中返回一行。
- `fgetss()` 从打开的文件中返回一行，并过滤掉 HTML 和 PHP 标签。
- `file()` 把文件读入一个数组中。
- `file_exists()` 检查文件或目录是否存在。
- `file_get_contents()` 把文件读入字符串。~~获取文件内容
- `file_put_contents()` 把字符串写入文件。~~写入文件内容

- `fgetcsv()` 从打开的文件中解析一行，校验 CSV 字段。
- `fputcsv()` 把行格式化为 CSV 并写入一个打开的文件中。

- `filesize()` 返回文件大小。
- `filetype()` 返回文件类型。
- `fopen()` 打开一个文件或 URL。
- `fread()` 读取打开的文件。
- `readfile()` 读取一个文件，并写入到输出缓冲。
- `fputs()` fwrite() 的别名。
- `ftruncate()` 把打开文件截断到指定的长度。
- `fwrite()` 写入打开的文件。
- `fscanf()` 根据指定的格式对输入进行解析。

- `fseek()` 在打开的文件中定位。
- `ftell()` 返回在打开文件中的当前位置。
- `rewind()` 倒回文件指针的位置。

- `glob()` 返回一个包含匹配指定模式的文件名/目录的数组。
- `move_uploaded_file()` 把上传的文件移动到新位置。
- `stat()` 返回关于文件的信息。

## JSON处理

- `json_encode()` 对变量进行 JSON 编码
- `json_decode()` 对 JSON 格式的字符串进行解码，转换为 PHP 变量

```php
<?php
   $arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);
   echo json_encode($arr);
?>
```
json字符串解码为php关联数组

```php
<?php
   $json = '{"a":1,"b":2,"c":3,"d":4,"e":5}';
   var_dump(json_decode($json));
   var_dump(json_decode($json, true));
?>
```

## 面向对象

PHP面向对象的基本用法

```php
<?php
include "./inc/header.php";

class Animal
{
	var $name;

	public function hi()
	{
		echo 'hi, ', $this->name, "\n";
	}

	public static function ho()
	{
		// 单引号内的特殊序列不会被转义 eg: '\n'
		echo 'ho func called', "\n";
	}

	function move()
	{
		echo "animal is running";
	}
}

title('面向对象');


comment('访问属性和方法');
$dog = new Animal();
$dog->name = 'husky';
$dog->hi();

comment('可添加任意属性');
$dog->like = 'running';
clog($dog->like);

$prop = 'name';
$arr = array('name', 'like');

function getProp()
{
	global $arr;
	return $arr[1];
}


comment('访问动态属性(属性由变量或方法返回值决定)');
clog(getProp() . '<==');
clog($dog->$prop);
clog($dog->{$prop});
clog($dog->{$arr[1]});
clog($dog->{getProp()});

comment('打印声明的类');
print_r(get_declared_classes());
//var_dump(Animal); // error
//print_r(Animal);
comment('打印类的方法');
print_r(get_class_methods($dog));

comment('打印对象');
print_r($dog);


comment('访问静态方法');
Animal::ho();

comment('查看对象有哪些属性 (即自省)');
print_r(get_object_vars($dog));

comment('三元运算符');
clog('1' == 1 ? 'yes' : 'n');
clog('1' == 10 ? 'y' : 'n');

include 'inc/footer.php';
```

## 模块化
php可以通过 `include` , `require`, `require_once`等语句引入其他php模块。

`header.php`的代码如下

```php
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Learning</title>
    <style>
        body {
            padding: 20px;
            font-weight: 200;
        }

        h1,
        h2,
        h3,
        h4 {
            font-weight: 500;
            text-align: center;
        }

        blockquote {
            margin: 0;
            margin-top: 30px;
            background: #eee;
            padding: 10px;
            border-radius: 4px;
            font-weight: 500;
            color: cadetblue;
        }

        ul,
        ol {
            margin: 30px 0;
            padding: 10px 30px;
            background: #f3fafa;
        }

        li {
            margin: 10px;
            font-size: 20px;
            font-style: italic;
        }
    </style>
</head>

<body>
    <?php
    require_once 'common.php';
    ?>
```

`module.php`用于测试导入其他php模块

```php
<?php
include 'inc/header.php';
// require('captain-lufy.php');
require 'captain-lufy.php';
use Cartoon\OnePiece\Lufy;

Lufy\sayHi();


include 'inc/footer.php';

```

## 总结
本文从初学者的角度对php做了个全面的介绍，但是没有详细介绍比较常用的数组和面向对象等部分。如果本文的内容基本都掌握，看懂基础的php代码应该不成问题。  

php曾经很流行，现在有些免费的虚拟机(如: infinityfree)多数提供的是php集成环境，可以让我们托管一些简单的个人应用，因而对php进行学习了解还是有点必要的。