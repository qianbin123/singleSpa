# single-spa 缺点
* 样式不分离，应用和应用之间样式会受影响
* 没有js沙箱的机制，用的都是同一个window，有可能会覆盖，比如：A应用window.name=A，B应用window.name=A
* 不够灵活，不能动态加载js，比如这次的动态加载是我们自己实现loadScript

> 不过可以用其他方式弥补：

# CSS隔离方案

## 子应用之间的样式隔离
> Dynamic Stylesheet 动态样式表，当应用切换时，移除老应用样式，添加新应用样式

## 主应用和子应用之间的样式隔离
* BEM (Block Element Modifier) 约定项目前缀
* CSS-Modules 打包时生成不冲突的选择器名
* Shadow DOM 真正意义上的隔离  <=  qiankun里用的
* css in js (不推荐)