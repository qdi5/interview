## DOM
DOM实则是把HTML中各个标签定义出的元素以对象的形式包装起来。这样做的目的，就是确保开发者可以通过JS脚本来操作HTML。

## DOM树的解析
**DOM结构以树的形态存在。**    

在DOM中，每个元素都是一个节点。常见的4中节点有`Document`、`Element`、`Text`、`Attribute`。 

### Document
Document就是指这份文件，也就是这份HTML文档的开端。当浏览器载入HTML文档，它就会成为`Document对象`。

### Element
Element就是指HTML文件内的各个标签，像是`<div>`、`<span>`这样的各种HTML标签定义的元素都属于Element类型。    

### Text    
Text就是指被各个标签包起来的文字，举个例子：    
```html
<span>哈哈哈</span>
```    
这里的"哈哈哈"就是span元素的Text    

### Attribute    
Attribute类型表示元素的特性。从技术角度讲，这里的特性就是说各个标签里的属性。  

## DOM节点间关系
- **父子节点**表示节点间的嵌套关系
- **兄弟节点**表示节点层级的平行关系，兄弟节点共享一个父节点

## 常考操作
### 查：DOM节点的获取
```js
- getElementById // 按照id查询
- getElementByTagName // 按照标签名查询
- getElementByClassName // 按照类名查询
- querySelectorAll // 按照css选择器查询
```
具体使用：    

```js
// 按照 id 查询
var imooc = document.getElementById('imooc') // 查询到 id 为 imooc 的元素

// 按照标签名查询
var pList = document.getElementsByTagName('p')  // 查询到标签为 p 的集合
console.log(divList.length)
console.log(divList[0])

// 按照类名查询
var moocList = document.getElementsByClassName('mooc') // 查询到类名为 mooc 的集合

// 按照 css 选择器查询
var pList = document.querySelectorAll('.mooc') // 查询到类名为 mooc 的集合
```

