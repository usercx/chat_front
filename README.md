# angular脚手架
## 项目说明
> 保证本机安装node环境，执行npm install（cnpm install） 和bower install。bower在linux机器上需要加上--allow-root参数

## 目录说明

* src目录为主要的页面源码文件
* .serve目录为启动本地服务的临时文件夹
* dist目录为构建后的压缩文件
* gulp目录为gulp任务的建立
* 其余的应该没什么太大的问题了吧。。。

## src源码目录说明

* assets目录存放静态文件
* directives为自定义的指令存放处
* less为自己写的样式文件(使用less而并非是sass)
* modules目录为主要的页面布局等（本人理解的可能是业务代码？）
* services目录为angular的服务存放目录
* fonts为字体文件（需注意如果使用bootstrap或者是fontawesome需要将他们的字体文件复制到此目录下）

## 命令说明
* gulp serve： 启动本地服务，访问http://localhost:3005即可看到页面
* gulp build： 构建项目，执行完毕dist目录为打包好的静态文件