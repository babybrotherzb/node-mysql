# 原生 node + mysql + 模板引擎art-template ，服务端处理文件渲染，数据库增删demo

## 使用的包

- art-template 模板引擎
- mysql 数据库
- nodemon 监听node变化实时更新


## 本地需求配置

1.本地安装有node环境
（如果报错把node_modules删了，重新安装[art-template](http://aui.github.io/art-template/docs/installation.html#Npm),或者执行npm install art-template --save）

2.本地搞个mysql数据库，我用的是phpStudy自带的mysql, 用户名和密码设置为root

3.mysql里建一个test的库，目录下建一个first的表，里面一下字段

- Id 
- name 
- message 
- date


## 运行
 
 ```sh
 1. 开启数据库phpStudy

 2.npm install  #安装依赖

 3. npm run dev 或者 npm run nodemon

```


[github地址 https://github.com/babybrotherzb/node-mysql](https://github.com/babybrotherzb/node-mysql)

[CSDN博客地址 @baby张 https://blog.csdn.net/weixin_43648947](https://blog.csdn.net/weixin_43648947)

[掘金地址  @baby张 https://juejin.im/user/5d90295cf265da5b5c08f32d/posts](https://juejin.im/user/5d90295cf265da5b5c08f32d/posts)