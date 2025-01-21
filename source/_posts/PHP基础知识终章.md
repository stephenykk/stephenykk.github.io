---
title: PHP基础知识终章
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2025-01-07 05:36:18
tags: PHP
category: PHP
---

常言道：温故而知新，本文会接着介绍一些PHP基础知识，对上篇PHP基础进行补充，形成相对完整的知识体系。  

尽可能保持内容简单易懂，希望读后能有所收获 :)

本文例子会常用到一些自定义方法，它们定义在 `common.php`, 内容如下

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
不确定变量是否存在，可以用`isset($varName)`先判断，代码更健壮。

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

`die($msg)`也可以终止程序 

```php
<?php

function printNum($i) {
	if ( $i !== 10 ) {
		echo $i , "\n";
	} else {
		exit(0);
	}
}

$n = 1;

while ($n < 20) {
	printNum($n);
	$n++;
}

```

### var_export
导出变量以代码形式表示的字符串，如: `var_export(false)`

### sleep
`sleep($seconds)`让程序休眠/暂停若干秒

`usleep($milsec)`休眠指定的毫秒值
```php
<?php
include 'inc/header.php';

clog(date('H:i:s'));
sleep(5);
clog(date('H:i:s'));
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
    // array() -> string throw warning
    // $myObj -> string throw error
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

### list
`list()`把数组中的值赋给一些变量。`list()`是语言结构，不是函数。

```php
<?php
    /* 可用于交换多个变量的值 */ 
    list($a, $b) = array($b, $a);
    list($drink, , $power) = array('coffee', 'brown', 'caffeine');
```
## 预定义常量

- `PATH_SEPARATOR`  路径分隔符(Windows为分号`;`，类Unix为冒号`:`)
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

## 常量
### 常量定义
定义常量有 `define()` 和 `const` 两种方式  

语法: `define(常量名, 常量值, [isIgnoreCase])`
```php
<?php
define('MAX_TIME', 5);
const MAX_WIDTH = 200;

?>
```

### 常量访问
访问常量不需要加`$`前缀，直接访问; 还可以用 `constant()` 动态访问常量

```php
<?php
const HOST = 'pzj.fun';
echo HOST;
$name = 'HOST';
echo constant($name);
```
### 常量方法
常量相关的方法:
- `defined($name)` 判断常量是否定义
- `get_defined_constants()` 获取常量数组

```php
<?php
const HOST = 'pzj.fun';
echo defined('HOST') ? 'yes' : 'no';
print_r(get_defined_constants());

?>
```

## 进制转换
十六进制、八进制、二进制和十进制之间的转换

> 十进制 decimal, hexdec -> hex to decimal

- `hexdec()` 十六进制转十进制
- `dechex()` 十进制转十六进制

- `bindec()` 二进制转十进制
- `decbin()` 十进制转二进制

- `octdec()` 八进制转十进制
- `decoct()` 十进制转八进制

## heredoc

所见即所得地输出大段文本，支持变量解析

```php
<?php
$puntuation = '!!';
$con = <<<EOF
一壶浊酒喜相逢
古今多少事
都付笑谈中$puntuation
EOF;

echo $con;
```

## nowdoc
所见即所得地输出大段文本，不支持变量解析, `$puntuation`不会被解析

```php
<?php

$puntuation = '!!';

$poem = <<<'EOF'
秦时明月汉时关，
万里长征人未还$puntuation
EOF;

echo $poem;
```

## 数据类型

### 获取数据类型

`gettype($name)` 返回类型的名称

```php
<?php
echo gettype('hi');
```

### 判断数据类型

- `is_int()`
- `is_float()`
- `is_string()`
- `is_bool()`
- `is_null()`
- `is_array()`
- `is_object()`     
- `is_resource()`

### 类型转换

专用类型转换函数
- `boolval()`
- `floatval()`
- `intval()`
- `strval()`

通用类型转换函数 `settype($var, $typename)`

```php
<?php
$n = '10';
echo gettype($n);
settype($n, 'int');
echo gettype($n);
```
强制类型转换 `(typeName)`

- `(int)`
- `(float)`
- `(string)`
- `(bool)`
- `(array)`
- `(object)`
- `(unset)` 转换为null

```php
<?php
$a = '12';
$v = (int)$a;
var_dump($v); // int
```

## 文件加载
- `require`
- `require_once`
- `include`
- `include_once`

`require`和`include`都是加载目标脚本，并执行它的代码；`require`比较严格，遇到失败时，会终止脚本，

### include查找路径
`set_include_path($path)` 可以设置`include`命令在哪些地方查找文件(*类似`PATH`环境变量的设置*)

`get_include_path()` 获取当前include查找路径的设置
```php
<?php

set_include_path('./inc');
include 'common.php';

comment('设置include的查找路径');
clog('set_include_path() 可以简化加载路径的书写');

var_dump(get_include_path()); // './inc'

```

## 函数

### 参数传递
形参和实参之间可按值传递，也可按引用传递，默认按值传递。

```php
<?php
include 'inc/header.php';

comment('参数传递');
$colors = array('red', 'blue', 'green');
function update($colorArr)
{
    $colorArr[0] = 'pink';
    print_r($colorArr);
}

comment('默认按值传递，不会修改到实参$colors');
update($colors);
newline();
print_r($colors);

comment('按引用传递,会修改到实参$colors');
function change(&$colorList)
{
    $colorList[0] = 'purple';
    print_r($colorList);
}

change($colors);
newline();
print_r($colors);



include 'inc/footer.php';
```

### 不定参函数
可接受任意多个参数的函数，用下来方法获取实参的信息：

- `func_get_args()` 调用函数传入实参组成的数组
- `func_num_args()` 获取实参个数
- `func_get_arg($n)` 获取第n个实参

```php
<?php
function mySum()
{
    $count = func_num_args();
    $args = func_get_args();
    $first = func_get_arg(0);
    print_r(array($count, $args, $first));
    $result = 0;
    foreach ($args as $arg) {
        $result += $arg;
    }
    return $result;
}

$result = mySum(1, 10, 7);
clog("mySum result:" . $result);
```

### 返回值传递
函数的返回值也分按值传递和按引用传递，默认是按值传递  

因为返回值默认按值传递，所以 `$outFavs` 和 `$innerFavs` 是不同的数组，修改`$outFavs`并不会影响`$innerFav`

```php
<?php

function getFavs()
{
    $arr = array('coding', 'reading');
    $GLOBALS['innerFavs'] = $arr;
    return $arr;
}

$outFavs = getFavs();
array_push($outFavs, 'sleeping');
clog("outFavs::" . implode(', ', $outFavs));
newline();
clog("innerFavs::" . implode(', ', $GLOBALS['innerFavs']));
newline();
```
返回值按引用传递，所以 `$outMyArr` 和 `$innerMyArr` 是同一个数组，修改`$outMyArr`并会影响`$innerMyArr`

```php


// 函数名前加 &, 表示函数可以返回引用
function &getMyFavs()
{
    $myArr = array('coding', 'reading');
    // $GLOBALS['innerMyArr'] = $myArr; // 两者并非指向同一数组
    $GLOBALS['innerMyArr'] = &$myArr; // 让两者指向同一数组
    return $myArr;
}

$outMyArr = &getMyFavs();
array_push($outMyArr, 'sleeping');
clog("outMyArr is:" . implode(', ', $outMyArr));
newline();
clog("innerMyArr is:" . implode(', ', $GLOBALS['innerMyArr']));
newline();
```

### 匿名函数
可以使用函数作为函数的参数和返回值，声明函数时可以使用 `use($param)` 来向函数中传入函数外的变量，结合变量引用来实现闭包。

定义匿名函数 
```php
$func = function ($msg) {
    echo $msg;
};
$func('nice to meet you');
```

返回闭包，闭包使用外部变量
```php
function getSumFunc()
{
    $num1 = 10;
    $sumFunc = function ($num2) use ($num1) {
        return $num1 + $num2;
    };
    return $sumFunc;
}
$sum = getSumFunc();
clog($sum(20)); //30
```

## 模板语法输出html
php支持用特定的模板语法输出html，解决了用echo输出大段html内容的麻烦

```php
<?php

include 'inc/header.php';

?>

<?php if (isset($_GET['admin'])): ?>
    <h1>admin user</h1>
<?php else: ?>
    <h2>normal user</h2>

<?php endif ?>

<?php
include 'inc/footer.php';
?>
```

## 作用域

作用域包括全局作用域和局部作用域.  
作用域只针对变量，常量没有作用域，可以在所有地方被访问到。  
通过`include './some.php'`载入文件, 被载入文件(`some.php`)中定义的变量作用域取决于`include './some.php'`语句所在的位置。 函数外载入就是全局，函数内载入就是局部！

## 数据库相关函数
- `mysql_connect` 连接数据库
- `mysql_query`  发送SQL语句，接收执行结果  
    仅对select, show, explain, describe语句执行成功返回一个资源标识符，其他语句成功返回true;失败均返回false。
- `mysql_fetch_assoc` 从结果集中取得一行作为关联数组
- `mysql_fetch_row` 从结果集中取得一行作为普通数组
- `mysql_fetch_array` 从结果集中取得一行作为关联数组，或普通数组，或二者兼有  
    `array mysql_fetch_array ( resource $result [, int $ result_type  ] )`
    可选参数 result_type 可选值为：MYSQL_ASSOC，MYSQL_NUM 和 MYSQL_BOTH(默认)
- `mysql_free_result` 释放结果内存
- `mysql_close` 关闭连接

## 面向对象
类成员：类常量、类属性/静态属性、类方法/静态方法  
对象成员：实例属性、实例方法  
对象成员访问用`->`(如: `$this->name`)，类成员访问用`::`(如: `Animal::count`， `self::count`)


类名、方法名、属性名均不区分大小写    
`$this`代表本对象，`self`代表本类，`parent`代表父类

### 访问控制
- `public` 公有的（继承链、本类、外部均可访问）
- `protected` 保护的（仅继承链、本类可访问）
- `private` 私有的（仅本类可访问）

兼容性问题  
- 声明属性时，var关键字声明的默认为public权限
- 声明方法时，省略访问修饰符，默认为public权限

### 重写 override
继承时，父类的成员方法不满足需求时，子类可重写同名方法覆盖父类的方法。

重写限制  
- 访问权限限制： 子类的成员的访问控制必须相等或弱于父类 (*儿子必须比父亲更开放*)。
- 方法参数限制： 参数数量必须相同，参数名可不同。

### final方法
如果父类中的方法被声明为final，则子类无法覆盖（重写）该方法。

### 构造方法
类通过构造方法创建实例对象。  
语法: `void __construct([ mixed $args [, $... ]] )`

### 析构方法
析构函数会在到某个对象的所有引用都被删除, 或者当对象被显式销毁时执行。  
语法: `void __destruct( void )`

### 静态成员(static关键字)
- 用`static`声明类成员/类方法，它们可通过类直接访问。
- 静态成员（属性或方法）均属于类，故不能通过`$this`或`->`访问。
- 静态成员是所有对象共享，属于类。
- 静态成员用类调用，非静态成员用对象调用。
- 当在类的外部访问静态成员、方法和常量时，必须使用类的名字。 
- `self` 和 `parent` 用于在类内部对类属性或类方法进行访问

### 类常量
- 常量的值将始终保持不变。
- 在定义和使用常量的时候不需要使用`$`符号。
- 常量的值必须是一个定值，不能是变量.
- 定义类常量：`const 常量名 = 常量值`;
- 不需要加public等访问修饰限定符
- 类常量属于类，使用类访问，类名::类常量 或 self::类常量

### 抽象类
关键字：abstract  
抽象类不能直接被实例化，必须先继承该抽象类，然后再实例化子类。  
抽象类中至少要包含一个抽象方法。非抽象类不能包含抽象方法。


### 接口
关键字：interface  
使用接口可以指定某个类必须实现哪些方法，但不需要定义这些方法的具体内容。

定义接口
```php
interface Runnable {
    public function show($info);
}
```
实现接口
```php
class Dog implements Runnable {
    public function show($info) {
        echo "Hi," . $info;
    }
}
```

> 类与抽象类之间是继承关系，类与接口之间是实现关系。
> 类与抽象类是单继承，类与接口是多实现。


### 类与对象相关函数
- `class_exists($class [,$autoload])`   检查类是否已定义
- `interface_exists($interface [,$autoload])`   检查接口是否已被定义
- `method_exists($obj, $method)`  检查类的方法是否存在
- `property_exists($class, $property)`  检查对象或类是否具有该属性

- `get_declared_classes(void)`  返回由已定义类的名字所组成的数组
- `get_declared_interfaces(void)`   返回一个数组包含所有已声明的接口

- `get_class([$obj])    `   返回对象的类名
- `get_parent_class([$obj])  `  返回对象或类的父类名
- `get_class_methods($class)`   返回由类的方法名组成的数组
- `get_object_vars($obj)`   返回由对象属性组成的关联数组
- `get_class_vars($class)`  返回由类的默认属性组成的数组
- `is_subclass_of($obj, $class)  `  如果此对象是该类的子类，则返回TRUE

## 自动加载类
在试图使用尚未被定义的类时自动调用 `__autoload` 函数
```php
function __autoload($class_name) {
    // $_SERVER["DOCUMENT_ROOT"] 当前运行脚本所在的文档根目录
    require_once $_SERVER["DOCUMENT_ROOT"] . "/class/$class_name.php";
}
```

`spl_autoload_register` 可以注册多个自动加载函数，先注册的先执行; `一旦注册自动加载函数，__autoload` 就失效。  
语法: `bool spl_autoload_register ([ callback $autoload_function ] )`

## 序列化
数据通过网络传输或保存到硬盘前，需要先进行序列化；  
序列化在存放数据时，也会存放数据类型。  
语法: `string   serialize ( mixed $value )`

反序列化  
`unserialize` 从已存储的表示中创建PHP的值  
语法: `mixed unserialize ( string $str [, string $callback ] )`



## 反射机制 Reflection
反射的主要作用：
1. 获取结构信息        
2. 代理执行

- ReflectionClass 报告一个类的有关信息
- ReflectionMethod 报告一个方法的有关信息
- ReflectionClass::export 输出类结构报告

### 代理执行
实例化 ReflectionFunction 类的对象
```php
<?php
function sayHi($msg)
{
    echo "hello ", $msg;
}

$refFunc = new ReflectionFunction('sayHi');
$refFunc->invoke('alice');
```

## 文件系统访问
### 文件的读写操作
- `file_put_contents` 将一个字符串写入文件  
    语法: `int file_put_contents($file, $data [,$flags])`  
- `file_get_contents` 将整个文件读入一个字符串  
    语法：`string file_get_contents($file [, bool $use_include_path [,int $offset [,int $maxlen]]])`

## HTTP相关方法
### 设置响应头
```php
<?php
header('Location: http://demo.com/login.php');
header('Content-Type: application/json');
```

### 设置cookie
语法: `setcookie($name [,$value [,$expire [,$path [,$domain [,$secure [,$httponly]]]]]])`  

通过超全局变量 `$_COOKIE` 读取cookie数据

> 注意：setcookie()函数前不能有输出, 除非开启ob缓存！

### 设置session
开启session机制, `session_start()`  
通过超全局变量 `$_SESSION` 读取session数据  

`session_destroy()` 销毁保存session数据的文件

> 注意：session_start()函数前不能有输出！除非开启ob缓存。


## 正则

- `preg_replace($pattern, $replace, $subject [,$limit [,&$count]])` 执行正则替换
- `preg_grep($pattern, $input [,$flags])`   返回匹配模式的数组条目
- `preg_match($pattern, $subject [,&$matches [,$flags [,$offset]]])` 执行正则匹配
- `preg_split($pattern, $subject [,$limit [,$flags]])`  通过正则分隔字符串

## 数据库抽象层
PDO: PHP Data Objects  
PHO抽象层默认被加载，但需加载相应数据库的驱动。  

PDO是OOP语法，提供三个类：
- `PDO`：PDO自身
- `PDOStatement`：PDO语句类，提供对语句的后续处理
- `PDOException`：PDO异常类，提供对错误的异常处理

预处理式执行SQL, 防止sql注入风险
1. `PDOStatement PDO::prepare(string $statement)`
2. `bool PDOStatement::bindParam ( mixed $parameter , mixed &$variable )`
3. `bool PDOStatement::execute ([ array $input_parameters ] )`


## 日期时间函数

- `time()` 返回当前的Unix时间戳(秒)
- `date($format [,$timestamp])` 格式化一个本地时间／日期，`$timestamp`默认为`time()`
- `microtime([$get_as_float])` 返回当前Unix时间戳和微秒数
- `strtotime($time [,$now])` 将日期字符串解析为Unix时间戳
- `mktime()` 获取指定日期的时间戳
- `strftime($format [,$timestamp])` 根据区域设置格式化本地时间／日期
- `date_default_timezone_get($timezone)` 获取默认时区
- `date_default_timezone_set($timezone)` 设置默认时区

## 数组函数

- `array_chunk`  将一个数组分割成多个
- `array_filter` 用回调函数过滤数组中的元素
- `array_slice`  数组中取一个片段
- `array_keys`   返回数组中所有的键名
- `array_values` 返回数组中所有的值，并建立数字索引
- `array_merge`  合并一个或多个数组

- `in_array`  检查数组中是否存在某个值
- `array_reverse` 返回一个单元顺序相反的数组
- `array_splice`  把数组中的一部分去掉并用其它值取代
- `array_unique`  移除数组中重复的值

- `implode`  将数组元素值用某个字符串连接成字符串
- `explode`  使用一个字符串分割另一个字符串

- `array_map`   将回调函数作用到给定数组的单元上，只能处理元素值，可以处理多个数组
- `array_walk`  对数组中的每个成员应用指定函数，与foreach功能相同
- `array_push`  在末尾添加元素(入栈)
- `array_pop`   把末尾元素弹出(出栈)
- `array_unshift`  在开头添加元素
- `array_shift`    将数组开头的元素移除

## 总结
PHP确实是一门比较全面的程序语言，支持面向对象、模块化、命名空间和闭包等特性，至于它是否是最好的语言，这个问题就见仁见智了。  

通过这两篇PHP基础知识的讲解，相信要看懂PHP代码应该没什么问题；如果有用到 CMS , Wordpress 和免费虚拟机的话，我们要做一些功能修改时会更加得心应手。
