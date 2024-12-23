---
title: PHP基础知识总结
date: 2024-03-01 08:56:45
tags: PHP
category: PHP
---

## PHP是什么

PHP的全称是“PHP: Hypertext Preprocessor”，超文本预处理器的字母缩写  

PHP是一种创建动态交互性站点的服务器端脚本语言。  

PHP文件可包含HTML、JavaScript 代码和 PHP 代码，PHP 代码在服务器上执行，结果以纯 HTML 形式返回给浏览器。

> PHP 文件的默认文件扩展名是 ".php"

## PHP 能做什么

PHP它具有访问文件系统和数据库的能力，主要用于web开发，生成动态页面内容。早期很多的CMS（内容管理系统）都是基于PHP开发的，比如：WordPress、Discuz、phpcms等。

## 安装

PHP 是一种服务器端脚本语言，需要安装 PHP 服务器环境才能运行 PHP 脚本。PHP的服务器环境包括以下几个组成部分：

1. Web 服务器
2. PHP 解析器
3. DBMS 数据库管理系统，比如 MySQL

推荐安装 **集成开发环境推荐 WAMP：http://www.wampserver.com/** 或者 **XAMPP：https://www.apachefriends.org/zh_cn/index.html**

### 进入交互模式

在交互模式下，你可以输入 PHP 代码并立即看到结果，而不需要创建一个 PHP 文件。  

在命令行中输入 `php -a` 进入交互模式

> 交互模式是一个练习和测试 PHP 代码的环境

```php
php -a
```

## 基本语法

### 脚本位置

PHP脚本可放在文档的任何位置，PHP 脚本以 `<?php` 开始，以 `?>` 结束

> `<? ... ?>` 短标签，不推荐使用

```php
<!DOCTYPE html>
<html>
<body>

<h1>My first PHP page</h1>

<?php
echo "Hello World!";

//This is a PHP comment line

/*
This is
a PHP comment
block
*/

?>

</body>
</html>
```

### 语句结束符
 PHP中的每条语句都必须以分号(`;`)结束，否则会报错


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

- `echo` - 输出一个或多个字符串
- `print` - 输出一个字符串
- `print_r` - 以易读的格式打印变量
- `var_dump` - 打印变量的相关信息

输出字符串的话，用 `echo` 和 `print` 都可以，区别在于 `echo` 可以输出多个字符串，而 `print` 只能输出一个字符串。

```php
<?php
echo "Hello World!";
// 可用逗号分隔多个字符串，echo 会将它们连接起来
echo "good", "day" // goodday

// 可以命令或函数的形式调用 print
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

### 变量

变量以 `$` 符号开始，后面跟着变量的名称, 如: `$color`, `$color = red`    

PHP 没有声明变量的命令， 变量在您第一次赋值给它的时候被创建。

```php
<?php
// var_dump() 输出变量的相关信息
$msg = "hero";
echo "hello ", $msg;
?>
```


PHP 是一门弱类型语言, 会自动将变量转换为正确的数据类型。

> 在强类型的编程语言中，我们必须在使用变量前先声明（定义）变量的类型和名称。

## 作用域

PHP 有四种不同的变量作用域：

- 局部作用域
- 全局作用域
- 静态作用域
- 参数作用域

### 局部作用域

函数内部未局部作用域，在函数内部声明的变量为局部变量，只能在函数内部访问。

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

静态变量仅在局部函数域中存在，但当程序执行离开此作用域时，其值并不丢失。

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
?>
```

### 参数作用域

函数参数仅在函数内部起作用，是局部变量。

```php
<?php
function myTest($x) {
    $x++;
    echo $x;
}
?>
```

### 超全局变量
```

在函数内调用函数外定义的全局变量，我们需要在函数中的变量前加上 global 关键字：

```php
<?php
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

PHP 将所有全局变量存储在一个名为 $GLOBALS[index] 的数组中。 index 保存变量的名称。这个数组可以在函数内部访问，也可以直接用来更新全局变量。

```php
<?php
$x=5;
$y=10;

function myTest()
{
$GLOBALS['y']=$GLOBALS['x']+$GLOBALS['y'];
}

myTest();
echo $y;
?>
```

## **Static 作用域**

当一个函数完成时，它的所有变量通常都会被删除。然而，有时候您希望某个局部变量不要被删除,可以使用 **static**关键字

```php
<?php

function myTest()
{
static $x=0;
echo $x;
$x++;
}

myTest();
myTest();
myTest();

?>
```

## **参数作用域**

参数是通过调用代码将值传递给函数的局部变量。

参数是在参数列表中声明的，作为函数声明的一部分：

```php
<?php

function myTest($x)
{
echo $x;
}

myTest(5);

?>
```

### PHP echo 和 print 语句

-   echo - 可以输出一个或多个字符串
-   print - 只允许输出一个字符串，返回值总为 1

**提示：echo 输出的速度比 print 快， echo 没有返回值，print 有返回值 1。**
echo 和 print 都是一个语言结构，使用的时候可以不用加括号，也可以加上括号： echo 或 echo() print print()。

```php
<?php
echo "<h2>PHP is fun!</h2>";
echo "Hello world!<br>";
echo "I'm about to learn PHP!<br>";
echo "This", " string", " was", " made", " with multiple parameters.";

print "<h2>PHP is fun!</h2>";
print "Hello world!<br>";
print "I'm about to learn PHP!";

?>
```

下面的实例演示了如何使用 echo 命令输出变量和字符串：

```php
<?php
$txt1="Learn PHP";
$txt2="w3cschool.cc";
$cars=array("Volvo","BMW","Toyota");

echo $txt1;
echo "<br>";
echo "Study PHP at $txt2"; //php 双引号内部可包含变量
echo "My car is a {$cars[0]}"; //用大括号 显式的指定这是变量

$txt1="Learn PHP";
$txt2="w3cschool.cc";
$cars=array("Volvo","BMW","Toyota");

print $txt1;
print "<br>";
print "Study PHP at $txt2";
print "My car is a {$cars[0]}";

?>
```

### PHP5 数据类型

String（字符串）, Integer（整型）, Float（浮点型）, Boolean（布尔型）, Array（数组）, Object（对象）, NULL（空值）。

**字符串**
你可以将任何文本放在单引号和双引号中：

```php
<?php
$x = "Hello world!";
echo $x;
echo "<br>";
$x = 'Hello world!'; //单引号 包括字符串字面量 双引号包含的字符串 可包含变量
echo $x;
?>
```

**整型**
在以下实例中我们将测试不同的数字。 PHP **var_dump()** 函数返回变量的数据类型和值：

```php
<?php
$x = 5985;
var_dump($x);
echo "<br>";
$x = -345; // negative number
var_dump($x);
echo "<br>";
$x = 0x8C; // hexadecimal number
var_dump($x);
echo "<br>";
$x = 047; // octal number
var_dump($x);
?>
```

**浮点型**

```php
<?php
$x = 10.365;
var_dump($x);
echo "<br>";
$x = 2.4e3;
var_dump($x);
echo "<br>";
$x = 8E-5;
var_dump($x);
?>
```

**布尔型**

布尔型可以是 TRUE 或 FALSE。

**数组**

数组可以在一个变量中存储多个值

```php
<?php
$cars=array("Volvo","BMW","Toyota");
var_dump($cars);
?>
```

**对象**

在 PHP 中，对象必须声明。

首先，你必须使用 class 关键字声明类对象。类是可以包含属性和方法的结构。
然后我们在类中定义数据类型，然后在实例化的类中使用数据类型：

```php
<?php
class Car
{
    var $color;
    function Car($color="green") {
      $this->color = $color;
    }
    function what_color() {
      return $this->color;
    }
}

function print_vars($obj) {
   foreach (get_object_vars($obj) as $prop => $val) {
     echo "\t$prop = $val\n";
   }
}

// instantiate one object
$herbie = new Car("white");

// show herbie properties
echo "\herbie: Properties\n";
print_vars($herbie);

?>
```

**NULL 值**
NULL 值表示变量没有值。NULL 是数据类型为 NULL 的值。

```php
<?php
$x="Hello world!";
$x=null;
var_dump($x);
?>
```

**常量**

常量是一个简单值的标识符。该值在脚本中不能改变。 (常量名不需要加 $ 修饰符)。

_注意： 常量在整个脚本中都可以使用。_

设置常量，使用 define() 函数，函数语法如下：

define(string constant_name, mixed value, case_sensitive = true)
该函数有三个参数:

-   constant_name：必选参数，常量名称，即标志符。
-   value：必选参数，常量的值。
-   case_sensitive：可选参数，指定是否大小写敏感，设定为 true 表示不敏感。

以下实例我们创建一个 区分大小写的常量, 常量值为 "Welcome to W3CSchool.cc!"：

```php
<?php
define("GREETING", "Welcome to W3CSchool.cc!");
echo GREETING;
?>
```

**字符串函数和字符串连接**

```php
<?php
$txt1="Hello world!";
$txt2="What a nice day!";
echo $txt1 . " " . $txt2; // 字符串连接运算符 .

echo strlen("Hello world!"); //获取字符串长度
echo strpos("Hello world!","world"); //获取子串位置
//字符串中第一个字符的位置是 0
?>
```

### 运算符

```php
<?php
//其他运算符略..
//逻辑运算符 ! && || and or xor
//数组运算符 合并: + 比较：== != === !==
$x = array("a" => "red", "b" => "green");
$y = array("c" => "blue", "d" => "yellow");
$z = $x + $y; // $x 和 $y 数组合并
var_dump($z);
var_dump($x == $y);
var_dump($x === $y);
var_dump($x != $y);
var_dump($x <> $y);
var_dump($x !== $y);
?>
```

### 流程控制语句 同 js

```php
<?php

$t=date("H");
if ($t<"20")
{
echo "Have a good day!";
}



$t=date("H");
if ($t<"20")
{
echo "Have a good day!";
}
else
{
echo "Have a good night!";
}

$t=date("H");
if ($t<"10")
{
echo "Have a good morning!";
}
else if ($t<"20")
{
echo "Have a good day!";
}
else
{
echo "Have a good night!";
}

$favcolor="red";
switch ($favcolor)
{
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
echo "Your favorite color is neither red, blue, or green!";
}

//循环
$i=1;
while($i<=5)
{
echo "The number is " . $i . "<br>";
$i++;
}


$i=1;
do
{
$i++;
echo "The number is " . $i . "<br>";
}
while ($i<=5);

for ($i=1; $i<=5; $i++)
{
echo "The number is " . $i . "<br>";
}


$x=array("one","two","three");
foreach ($x as $value)
{
echo $value . "<br>";
}


?>
```

### 数组

```php
<?php
$cars=array("Volvo","BMW","Toyota"); //数组定义 数值数组
echo "I like " . $cars[0] . ", " . $cars[1] . " and " . $cars[2] . "."; //访问数组元素

//数组长度count()
$cars=array("Volvo","BMW","Toyota");
echo count($cars); //count() 函数用于返回数组的长度

//遍历数值数组
$cars=array("Volvo","BMW","Toyota");
$arrlength=count($cars);

for($x=0;$x<$arrlength;$x++)
{
echo $cars[$x];
echo "<br>";
}

$age=array("Peter"=>"35","Ben"=>"37","Joe"=>"43");//定义关联数组
echo "Peter is " . $age['Peter'] . " years old.";

//遍历关联数组
$age=array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
foreach($age as $x=>$x_value)
{
echo "Key=" . $x . ", Value=" . $x_value;
echo "<br>";
}
?>
```

#### 数组排序

PHP - 数组排序函数

-   sort() - 对数组进行升序排列
-   rsort() - 对数组进行降序排列
-   asort() - 根据关联数组的值，对数组进行升序排列
-   ksort() - 根据关联数组的键，对数组进行升序排列
-   arsort() - 根据关联数组的值，对数组进行降序排列
-   krsort() - 根据关联数组的键，对数组进行降序排列

```php
//sort()
$cars=array("Volvo","BMW","Toyota");
sort($cars);

$clength=count($cars);
for($x=0;$x<$clength;$x++)
   {
   echo $cars[$x];
   echo "<br>";
   }

//rsort()
$cars=array("Volvo","BMW","Toyota");
rsort($cars);

//asort() arsort() 关联数组排序 value
$age=array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
asort($age);
arsort($age);

//ksort() krsort() 关联数组排序 key
$age=array("Peter"=>"35","Ben"=>"37","Joe"=>"43");
ksort($age);
krsort($age);
?>
```

### 超级全局变量

PHP 中预定义了几个超级全局变量（superglobals） ，这意味着它们在一个脚本的全部作用域中都可用。

-   $GLOBALS
-   $\_SERVER
-   $\_REQUEST
-   $\_POST
-   $\_GET
-   $\_COOKIE
-   $\_FILES
-   $\_ENV
-   $\_SESSION

$GLOBAL 是一个包含了全部变量的全局组合数组。变量的名字就是数组的键。

```php
<?php
$x = 75;
$y = 25;

function addition()
{
$GLOBALS['z'] = $GLOBALS['x'] + $GLOBALS['y'];
}

addition();
echo $z;
?>
```

$\_SERVER 是一个包含了诸如头信息(header)、路径(path)、以及脚本位置(script locations)等等信息的数组。这个数组中的项目由 Web 服务器创建。不能保证每个服务器都提供全部项目；

```php
<?php
echo $_SERVER['PHP_SELF']; // /try/demo_source/demo_global_server.php
echo "<br>";
echo $_SERVER['SERVER_NAME']; // w3cschool.cc
echo "<br>";
echo $_SERVER['HTTP_HOST']; // www.w3cschool.cc
echo "<br>";
echo $_SERVER['HTTP_REFERER']; //来由
echo "<br>";
echo $_SERVER['HTTP_USER_AGENT']; //浏览器
echo "<br>";
echo $_SERVER['SCRIPT_NAME']; // /try/demo_source/demo_global_server.php

//另外$_SERVER对象还包括 SERVER_ADDR, SERVER_PROTOCOL ,REQUEST_METHOD..等属性

?>
```

$\_REQUEST 用于收集 HTML 表单提交的数据。

```php
<html>
<body>

<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
Name: <input type="text" name="fname">
<input type="submit">
</form>

<?php
$name = $_REQUEST['fname'];
echo $name;
?>

</body>
</html>
```

$\_POST 被广泛应用于收集表单数据，在 HTML form 标签的指定该属性："method="post"

```php
<html>
<body>
<!--页面post给自己-->
<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
Name: <input type="text" name="fname">
<input type="submit">
</form>

<?php
$name = $_POST['fname'];
echo $name;
?>

</body>
</html>
```

$\_GET 同样被广泛应用于收集表单数据，在 HTML form 标签的指定该属性："method="get"。

$\_GET 也可以收集 URL 中发送的数据。

```php
<html>
<body>

<a href="test_get.php?subject=PHP&web=w3cschool.cc">Test $GET</a>

</body>
</html>

//test_get.php

<html>
<body>

<?php
echo "Study " . $_GET['subject'] . " at " . $_GET['web'];
?>

</body>
</html>
```

### PHP 函数

PHP 的真正威力源自于它的函数。

在 PHP 中，提供了超过 1000 个内建的函数。

```php
<html>
<body>

<?php
function writeName()
{
echo "Kai Jim Refsnes";
}

echo "My name is ";
writeName();

//函数传参
function writeName($fname,$punctuation)
{
echo $fname . " Refsnes" . $punctuation . "<br>";
}

echo "My name is ";
writeName("Kai Jim",".");
echo "My sister's name is ";

//函数返回值
function add($x,$y)
{
$total=$x+$y;
return $total;
}

echo "1 + 16 = " . add(1,16);

?>

</body>
</html>
```

### 魔术变量

有八个魔术常量它们的值随着它们在代码中的位置改变而改变。

-   \_LINE\_\_
    文件中的当前行号。
-   **FILE**
    文件的完整路径和文件名。如果用在被包含文件中，则返回被包含的文件名。
-   **DIR**
    文件所在的目录。如果用在被包括文件中，则返回被包括的文件所在的目录。
-   **FUNCTION**
    函数名称（PHP 4.3.0 新加）。自 PHP 5 起本常量返回该函数被定义时的名字（区分大小写）。在 PHP 4 中该值总是小写字母的。

```php
<?php
function test() {
	echo  '函数名为：' . __FUNCTION__ ;
}
test();
?>
```

-   **CLASS** 类的名称（PHP 4.3.0 新加）。自 PHP 5 起本常量返回该类被定义时的名字（区分大小写）。

在 PHP 4 中该值总是小写字母的。类名包括其被声明的作用区域（例如 Foo\Bar）。注意自 PHP 5.4 起 **CLASS** 对 trait 也起作用。当用在 trait 方法中时，**CLASS** 是调用 trait 方法的类的名字。

```php
<?php
class test {
	function _print() {
		echo '类名为：'  . __CLASS__ . "<br>";
		echo  '函数名为：' . __FUNCTION__ ;
	}
}
$t = new test();
$t->_print();
?>
```

-   **TRAIT** Trait 的名字（PHP 5.4.0 新加）。自 PHP 5.4.0 起，PHP 实现了代码复用的一个方法，称为 traits。

Trait 名包括其被声明的作用区域（例如 Foo\Bar）。

从基类继承的成员被插入的 SayWorld Trait 中的 MyHelloWorld 方法所覆盖。其行为 MyHelloWorld 类中定义的方法一致。优先顺序是当前类中的方法会覆盖 trait 方法，而 trait 方法又覆盖了基类中的方法。

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

-   **METHOD** 类的方法名（PHP 5.0.0 新加）。返回该方法被定义时的名字（区分大小写）

```php
<?php
function test() {
	echo  '函数名为：' . __METHOD__ ;
}
test();
?>
```

-   **NAMESPACE** 当前命名空间的名称（区分大小写）。此常量是在编译时定义的（PHP 5.3.0 新增）。

```php
<?php
namespace MyProject;

echo '命名空间为："', __NAMESPACE__, '"'; // 输出 "MyProject"
?>
```

### 命名空间

PHP 命名空间(namespace)是在 PHP 5.3 中加入的，如果你学过 C#和 Java，那命名空间就不算什么新事物。 不过在 PHP 当中还是有着相当重要的意义。

PHP 命名空间可以解决以下两类问题：

-   用户代码与 PHP 内部的类/函数/常量之间的名字冲突。
-   创建别名（或简短）的名称，提高源代码的可读性。

默认情况下，所有常量、类和函数名都放在全局空间下，就和 PHP 支持命名空间之前一样。
如果一个文件中包含命名空间，它必须在其它所有代码之前声明命名空间

```php
< ?php
// 定义代码在 'MyProject' 命名空间中
namespace MyProject;

// ... 代码 ...

//也可以在同一个文件中定义不同的命名空间代码
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

在声明命名空间之前唯一合法的代码是用于定义源文件编码方式的 declare 语句。所有非 PHP 代码包括空白符都不能出现在命名空间的声明之前。

```php
<?php
declare(encoding='UTF-8'); //定义多个命名空间和不包含在命名空间中的代码
namespace MyProject {

const CONNECT_OK = 1;
class Connection { /* ... */ }
function connect() { /* ... */  }
}

namespace { // 全局代码
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
namespace MyProject; // 命名空间前出现了“<html>” 会致命错误 -　命名空间必须是程序脚本的第一条语句
?>
```

子命名空间

```php
<?php
namespace MyProject\Sub\Level;  //声明分层次的单个命名空间
//创建了常量 MyProject\Sub\Level\CONNECT_OK，
//类 MyProject\Sub\Level\Connection
//和函数 MyProject\Sub\Level\Connect。

const CONNECT_OK = 1;
class Connection { /* ... */ }
function Connect() { /* ... */  }

?>
```

**命名空间使用**
PHP 命名空间中的类名可以通过三种方式引用：

1. 非限定名称，或不包含前缀的类名称，例如 $a=new foo(); 或 foo::staticmethod();。如果当前命名空间是 currentnamespace，foo 将被解析为 currentnamespace\foo。如果使用 foo 的代码是全局的，不包含在任何命名空间中的代码，则 foo 会被解析为 foo。 警告：如果命名空间中的函数或常量未定义，则该非限定的函数名称或常量名称会被解析为全局函数名称或常量名称。**~~无命名空间前缀的引用，默认在当前命名空间查找，然后到全局命名空间找**

2. 限定名称,或包含前缀的名称，例如 $a = new subnamespace\foo(); 或 subnamespace\foo::staticmethod();。如果当前的命名空间是 currentnamespace，则 foo 会被解析为 currentnamespace\subnamespace\foo。如果使用 foo 的代码是全局的，不包含在任何命名空间中的代码，foo 会被解析为 subnamespace\foo。 **~~带相对命名空间前缀的(类似相对路径)引用，自动在开头添加调用代码所处的命名空间**

3. 完全限定名称，或包含了全局前缀操作符的名称，例如， $a = new \currentnamespace\foo(); 或 \currentnamespace\foo::staticmethod();。在这种情况下，foo 总是被解析为代码中的文字名(literal name)currentnamespace\foo。**~~带绝对命名空间前缀的引用(类似绝对路径) 引用路径已明确 不用查找**

file1.php

```php
<?php
namespace Foo\Bar\subnamespace;

const FOO = 1;
function foo() {}
class foo
{
    static function staticmethod() {}
}
?>
```

file2.php

```php
<?php
namespace Foo\Bar;
include 'file1.php';

const FOO = 2;
function foo() {}
class foo
{
    static function staticmethod() {}
}

/* 非限定名称 */
foo(); // 解析为函数 Foo\Bar\foo
foo::staticmethod(); // 解析为类 Foo\Bar\foo的静态方法staticmethod。
echo FOO; // resolves to constant Foo\Bar\FOO

/* 限定名称 */
subnamespace\foo(); // 解析为函数 Foo\Bar\subnamespace\foo
subnamespace\foo::staticmethod(); // 解析为类 Foo\Bar\subnamespace\foo,
                                  // 以及类的方法 staticmethod
echo subnamespace\FOO; // 解析为常量 Foo\Bar\subnamespace\FOO

/* 完全限定名称 */
\Foo\Bar\foo(); // 解析为函数 Foo\Bar\foo
\Foo\Bar\foo::staticmethod(); // 解析为类 Foo\Bar\foo, 以及类的方法 staticmethod
echo \Foo\Bar\FOO; // 解析为常量 Foo\Bar\FOO
?>
```

在命名空间内部访问全局类、函数和常量：

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

**命名空间和动态语言特征**

PHP 命名空间的实现受到其语言自身的动态特征的影响。因此，如果要将下面的代码转换到命名空间中，动态访问元素。

```php
//example.php

<?php
class classname
{
    function __construct()
    {
        echo __METHOD__,"\n";
    }
}
function funcname()
{
    echo __FUNCTION__,"\n";
}
const constname = "global";

$a = 'classname';
$obj = new $a; // prints classname::__construct
$b = 'funcname';
$b(); // prints funcname
echo constant('constname'), "\n"; // prints global
?>
```

```php
<?php
namespace namespacename;
class classname
{
    function __construct()
    {
        echo __METHOD__,"\n";
    }
}
function funcname()
{
    echo __FUNCTION__,"\n";
}
const constname = "namespaced";

include 'example1.php';//全局命名空间和某个命名空间有相同类 函数 和 常量 分别区别访问

$a = 'classname';
$obj = new $a; // prints classname::__construct
$b = 'funcname';
$b(); // prints funcname
echo constant('constname'), "\n"; // prints global

/* note that if using double quotes, "\\namespacename\\classname" must be used */
$a = '\namespacename\classname';
$obj = new $a; // prints namespacename\classname::__construct
$a = 'namespacename\classname';
$obj = new $a; // also prints namespacename\classname::__construct
$b = 'namespacename\funcname';
$b(); // prints namespacename\funcname
$b = '\namespacename\funcname';
$b(); // also prints namespacename\funcname
echo constant('\namespacename\constname'), "\n"; // prints namespaced
echo constant('namespacename\constname'), "\n"; // also prints namespaced
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
