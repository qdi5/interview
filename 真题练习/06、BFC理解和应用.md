BFC是块级格式化上下文；产生会计格式化上下文的方式，主要有以下几种：
1、position的值不为static
2、overflow的值为hidden或auto
3、float不为none的元素
4、display为inline-block、flex等

BFC的应用：
1、清除浮动
.clearfix:after {
    content: '';
    display: table;
    clear: both;
}
2、避免纵向margin外边距重叠