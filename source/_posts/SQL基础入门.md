---
title: SQL基础入门
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2024-12-10 21:28:17
tags: SQL
categories: SQL

---

> 转载自: [https://segmentfault.com/a/1190000045376785](https://segmentfault.com/a/1190000045376785)
  
## MySQL是什么

Mysql是一个数据管理系统，管理的是数据库，mysql下可以管理多个数据库。

关系数据库中用表存储信息。

支持连接数100个用户

## MySQL基本指令

### DDL

#### 查看数据库：

```sql
show databases;
```

#### 进入数据库：

```sql
use 数据库名;
```

#### 查看数据库的表：

```sql
show tables;
```

#### 新建数据库：

```sql
create database 数据库名;
```

#### 删除数据表：

```sql
dorp table 表名
```

### sql

#### 插入数据：

```sql
insert into 表名（字段，字段）value（数据，数据）;
# 如果要插入所有列的数据，可以不标明列名，但是插入的值，必须按照列的顺序。
insert into 表名 value（数据，数据，数据）；
# 可以一行sql，使用values插入多条数据。
insert into 表名 value（数据，数据，数据），（数据，数据，数据）;
```

#### 删除数据：

```sql
delete from student where name='王刚';
```

#### 修改数据：

```sql
update student set age=20 where name=’李白‘;
```

### DQL（查询）

#### 查询语句：

```sql
select * from student； 查询student表中的所有数据。
select student_id,student_name from student; 查询指定的列名。
```

#### 注意事项：

在工作环境中不要（尽量避免）使用 \* 查询 数据安全 IO 网络三方面。

可以使用as对列名起别名。对结果集的列命名

as name name是蓝色的 关键字 有些关键字会改变语法语义可以使用着重号\`\`

#### 条件查询：

根据指定的条件，检索数据，返回执行结果。

```sql
select student_id,student_name,birthday,gender from student 
where student_name='李四';
```

#### 多条件查询：

```sql
select student_id,student_name,birthday,gender from student 
where student_name='李四' and student_id = 9;
select student_id,student_name,birthday,gender from student 
where student_name='李四' or gender = '女';
```

#### 使用in 关键字匹配多个值

```sql
SELECT * FROM student WHERE student_id IN (1,3,8,10,12);
```

也可以使用not in 排除匹配项

```sql
SELECT * FROM student WHERE student_id NOT IN (1,3,8,10,12);
```

#### 模糊查询：

查询学生表中姓名姓张的学生：

```sql
SELECT * FROM student WHERE student_name LIKE '张%'
```

查询学生表中姓名三个字的学生：

```sql
SELECT * FROM student where student_name LIKE '___';
```

查询学生表中姓名姓张两个字的学生：

```sql
SELECT * FROM student WHERE student_name LIKE '张_';
```

查询学生表中姓名带张的学生：

```sql
SELECT * FROM student WHERE student_name LIKE '%张%';
```

### 排序：

排序方式 order by

正序（升序） ASC （默认）

倒序 （倒叙）DESC

```sql
SELECT * FROM student ORDER BY student_id DESC;
```

也可以使用多列进行排序 当第一列的值相同时再通过第二列的内容进行排序

```sql
SELECT * FROM student ORDER BY student_name,student_id DESC;
```

以上的sql语句order by 之后按照student\_name 正序排列，student\_id倒序排序

每一列都有自己的排序方式，不写就是默认 ASC

### 部分查询：(LIMIT)从零开始

部分查询 比如查询前三名

查询前三个数据 LIMIT

```sql
select * FROM student LIMIT 3;
```

查询4-7

```sql
select * from student limit 3,4;
```

前三名就是

```sql
select * from student limit 0,3;
```

#### 合并查询：

union 和union all 都有合并多个sql语句的作用

union 会将结果一样的数据合并一个（去重）（整体去重）

union 前后关联的结果集的列数必须一样和类型无关

```sql
select student_id from student union select * from student;
```

结果去重：（DISTINCT）

```sql
SELECT DISTINCT name FROM student;
```

注意：以上SQL语句DISTINCT是对结果集去重，并不是对name去重

### 嵌套查询和关联查询

#### 嵌套查询

一个查询语言中嵌套这另一个查询

实例 有不及格成绩的学生的信息

\-- 成绩表中不及格的信息

```sql
SELECT * FROM score WHERE score < 60;
```

\-- 有不及格成绩的学生的信息

方式一

```sql
SELECT DISTINCT * FROM student,score WHERE 
score.score < 60 and student.student_id = score.student_id;
```

方式二

```sql
SELECT student_name FROM student WHERE student_id in
 (SELECT DISTINCT student_id FROM score WHERE score < 60);
```

将子查询当做一个表进行二次查询

\-- 总成绩最高的学生id

```sql
 SELECT * FROM( SELECT student_id,SUM(score) as sumscore FROM score GROUP BY student_id )
 as a ORDER BY sumscore DESC LIMIT 1;
```

\-- 当将子查询当做表进行二次查询 需要给子查询起别名

#### 关联查询

\-- 当我们所需要的查询结果在两张表或者多张表中，这是就需要关联查询。

\-- 查询 学生的名字和成绩 学生名字在student 成绩 score

\-- 将多个表的数据按照一定的条件 关联在一器

\-- 左连接 右连接

\-- left join 以左表为主表 结果集中包含主表的所有数据,结果集中显示副表中和主表有关联的数据

```sql
SELECT a.*,b.* FROM student a left JOIN score b on a.student_id = b.student_id;
```

\-- 内链接 只显示两个有关联的数据

```sql
SELECT a.*,b.* FROM student a INNER JOIN score b ON a.student_id = b.student_id;
```

\-- mysql不支持全外链接 full join Oracle 支持

\-- mysql 借助union实现全外链接

```sql
SELECT a.*,b.* FROM student a left JOIN score b on a.student_id = b.student_id;
 UNION
 SELECT a.*,b.* FROM student a RIGHT JOIN score b on a.student_id = b.student_id;
```

注意事项：  
NULL值 sql中对空值的判断 不能用= 使用is,非空验证用 not null

## 数据库的常用类型

整数类型 tinyint（0-255）1字节 int 4字节 

文本 char（定长） varchar（变长） text 

浮点型 double（7，2） decimal（10，2）

时间


double是双精度的，而decimal是精确的我们建议使用decimal保存金融、汇率、税率、价格等

数据库是需要优化的,其中之一是选择合适的数据类型

1. start transaction 开始一个事务

2. savepoint 保存点名--设置保存点

3. rollback to 保存点名--回退事务

4. rollback 回退全部事务

5. commit 提交事务，所以的操作生效， 不能回退

```sql
create table TEXT(
  id int,
  name VARCHAR(32)
);
-- 开启事务
start TRANSACTION

--设置保存点
SAVEPOINT a

-- 执行dml操作
INSERT INTO TEXT values(100,'tom');

--设置保存点b
SAVEPOINT b

-- 执行dml操作
INSERT INTO TEXT values(200,'jack');

select * from TEXT;

-- 回退到b
rollback to b
-- 回退到a
rollback to a
```

## 事务管理

### 回退事务

在介绍回退事务前，先介绍一下保存点（savepoint）保存点是事务中的点，用于取消部分事务，当结束事务时（commit），会自动的删除该事务所定义的所有保存点，当执行回退事务时，通过指定保存点可以回退到指定的点。

### 提交事务

使用comit语句可以提交事务，当执行了commit语句后，会确认事务的变化、结束事务、删除保存点、释放锁，数据生效。当使用commit语句结束事务之后，其他会话将可以查看到事务变化后的新数据。

tips：如果不开始事务，默认情况下，DML操作是自动提交的，不能回滚。mysql 的事务需要存储引擎为innodb ，而myisam 不支持。

### savepoint（保存点）

SAVEPOINT 通过自定义的名称设置一个存储点，如果当前事务已经有了一个同名的 SAVEPOINT ，那么旧的将会被替代。

ROLLBACK TO SAVEPOINT 子句可以将当前事务回退到自定义的存储点位置，而不会结束事务，InnoDB 不会释放内存中的行锁（对于新插入的行，锁信息是由存储在行中的事务ID携带，而不会单独存储在内存中，那么对于这类锁，是会被释放的），存储点之后语句都会撤销执行，包括新设置的存储点，也同样会被删除。

RELEASE SAVEPOINT 子句，会从当前的事务 SAVEPOINT 集合中，移除指定名称的 SAVEPOINT 。

## 隔离级别

### 事务隔离级别介绍

多个连接开启各自事务操作数据库中数据时，数据库系统要负责隔离操作，以保证各个连接在获取数据时的准确性。

### 脏读（dirty tead）

当一个事务读取另一个事务尚未提交的修改时，产生脏读。

### 不可重复读（nonrepeatable read）

同一查询在同一事务中多次进行，由于其他提交事务所做的修改或删除，每次返回不同的结果集，此时发生不可重复读。

### 幻读（phantom read）

同一查询在同一事务中多次进行，由于其他提交事务所做的插入操作，每次返回不同的结果集，此时发生幻读。

### 查看当前会话隔离级别 select @@transaction\_isolation;

### 查看系统当前级别 select @@global.tranction\_isolation;

### 设置隔离级别 set session transaction isolation level read uncommitted

### 设置系统隔离级别 set global transaction isolation level read uncommitted

## ACID

### 事务acid特性

1.  原子性： 原子性是指事务是一个不可分割的工作单位，事务中的操作要么都发生，要么都不发生。
2.  一致性： 事务必须使数据库从一个一致性状态变换到另外一个一致性状态。
3.  隔离性： 事务的隔离性是多个用户并发访问数据库时，数据库为每一个用户开启的事务，不能被其他事务的操作数据所干扰，多个并发事务之间要相互隔离。
4.  持久性： 持久性是指一个事务一旦被提交，它对数据库中数据的改变就是永久性的，接下来即使数据库发生故障也不应该对其有任何影响。
    
## 数据库面试问题
    
### mb3和mb4有什么区别
    
```sql
  首先m表示max，b表示byte，mb3表示一个字符最多占用三个byte同理mb4占用4个，最大的不同在于mb4比mb3多出来的一字节可以表示表情文字。英文占用一个字节、中东地区的阿拉伯语占2字节，东亚地区语言占3字节。
```
    

### 数据库连接命令是什么

```sql
    mysql -u root -p；

    -u：代表用户

    root是超级用户

    -p： 是密码
```

### varchar和char的区别

```sql
    varchar是可变的文本类型更加灵活，节省空间，但是char类型的性能更好特别是查询数据时。
```