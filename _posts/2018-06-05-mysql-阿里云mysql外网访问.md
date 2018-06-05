---
title: 阿里云mysql外网访问
tags:
  - aliyun
  - 阿里云
  - mysql
  - ubuntu 14.04
---
转载原文评论: [阿里云ecs上安装了mysql但是外网访问不了](https://segmentfault.com/q/1010000009603559?sort=created)

<!--more-->

1.阿里云ECS有安全组防火墙.默认只开了ICMP,22,3389. 在服务器控制台找到 安全组-配置规则-添加安全组规则


<div class="card mb-3">
    <img src="{{site.baseurl}}/static/image/1528173055341.jpg" width="100%" height="100%" />
</div>

2.如果是用root登录MySQL,在登陆后use mysql, user表root对应的localhost改为%

3.mysql默认只能自本机访问 

```
/etc/mysql/mysql.conf.d/mysqld.cnf
#bind-address = 127.0.0.1

service mysql restart
```

4.检查是不是在监听状态

```
netstat -ntpl |grep 3306 
```


5.防火墙是否对 mysql 端口限制,设置防火墙



