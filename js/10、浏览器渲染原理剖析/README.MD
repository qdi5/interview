# 浏览器渲染原理剖析
## 1、从输入URL到页面加载完成，发生了什么？
域名解析-dns查询-服务器响应-浏览器接收资源-解析资源-渲染页面

## 浏览器渲染过程
资源文件（DOM树） —— HTML解析（CSSOM树） —— CSS解析（渲染树） —— 样式结构和并（盒模型） —— 布局（目标界面） —— 绘制

## 重排与重绘
### 1、重排    
当我们的操作引发了DOM几何尺寸的变化（比如修改元素的宽、高或隐藏元素等）时，浏览器需要重新计算元素的几何属性（其他元素的几何属性和位置也会因此受到影响），然后再将计算的结果绘制出来。这个过程就是重排（也叫回流）。    
简而言之，重排多数情况下是由**对元素几何属性的修改引发的。当重排发生时，"重新来过"的流程如下所示：    
修改CSSOM —— 更新渲染树 —— 重布局 —— 重绘制；

### 还有什么动作会触发重排？
#### 1.1、改变DOM树的结构
这里主要指的是节点的增减、移动等操作。
#### 1.2、获取一些特定属性的值（重要）
如 `offsetTop`、`offsetLeft`、`offsetWidth`、`offsetHeight`、`scrollTop`、`scrollLeft`、`scrollWidth`、`scrollHeight`、`clientTop`、`clientLeft`、`clientWidth`、`clientHeight`等属性.    
这些属性有一个共性，就是需要通过**即时计算**得到。因此浏览器为了获取这些值，也会进行回流。    

当我们调用了**getComputedStyle**方法，或者IE里的**currentStyle**时，也会触发回流。原理是一样的，都为求一个"及时性"和"准确性"。   

```js
var targetDom = document.getElementById('target')
targetDom.style.width = '200px'
```    


## 2、什么是重绘
当我们对DOM的修改导致了样式的变化、却并未影响其几何属性（比如修改了颜色或背景色）时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式（跳过了上图所示的回流环节）。这个过程叫做重绘。    

简而言之，重绘是由对元素绘制属性的修改引发的。

```js
var targetDom = document.getElementById('targetText')
targetDom.style.color = 'red'
```    
浏览器想要改变文字的颜色，只需要去变更像素点的色值即可，不涉及任何布局计算。因此，这是一个典型的重绘过程。    


