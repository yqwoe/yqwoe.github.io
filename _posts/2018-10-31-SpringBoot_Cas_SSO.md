---
title: Cas Server 本地部署
tags:
  - spring boot
  - cas client
  - cas server
  - sso
---



# Cas

> **[Cas](https://github.com/apereo/cas)** 中心认证服务。Cas是一种面向Web的企业级、多语言单点登录解决方案，它是满足身份验证和授权管理的综合平台

<!--more-->

> Cas是一种开放优秀的身份验证协议。



<p align="center">
<img src="https://user-images.githubusercontent.com/1205228/30969994-e2fe6bf0-a470-11e7-80f9-d54d1e4d348e.png">
</p>



我在本地部署的是**[cas-overlay-template](https://github.com/apereo/cas-overlay-template)** 分支5.2

## 部署Cas Server

```powershell
git clone https://github.com/apereo/cas-overlay-template.git
cd cas-overlay-template
git checkout 5.2
mvn package //因为本地jdk1.8 5.2版本支持

mkdir -p src/main/resources 
mkdir -p src/main/resources/services
cp /target/cas/WEB-INF/classes/application.prpperties src/main/resources/application.prpperties
cp /target/cas/WEB-INF/classes/services/HTTPSandIMAPS-10000001.json src/main/resources/services/HTTPSandIMAPS-10000001.json
```

#### application.properties

```powershell
##
# CAS Server Context Configuration
#
server.context-path=/cas
server.port=8443

cas.tgc.secure=false  
cas.serviceRegistry.initFromJson=true
server.ssl.enabled=false #禁用https访问
#...省略
cas.authn.accept.users=admin::admin #静态访问用户名密码 admin/admin
```

#### services/HTTPSandIMAPS-10000001.json

```json
{
  "@class" : "org.apereo.cas.services.RegexRegisteredService",
  "serviceId" : "^(https|imaps|http)://.*", //增加http访问规则
  "name" : "HTTPS and IMAPS",
  "id" : 10000001,
  "description" : "This service definition authorizes all application urls that support HTTPS and IMAPS protocols.",
  "evaluationOrder" : 10000
}

```

以上操作按照顺序执行

```
./build.sh run
```

打开浏览器访问**[http://cas.simple.org:8443/cas](http://cas.simple.org:8443/cas)** 

Cas Server已经setup起来了。

明天继续更新 Cas Client与Spring boot集成，并实现Cas Server的用户存储数据库。



