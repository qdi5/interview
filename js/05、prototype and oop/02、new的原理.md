当我们用new去创建一个实例时，它做了这四件事：    

1. 为这个新的对象开辟一块属于它的内存空间
2. **把函数体内的this指到1中开辟的内存空间去**
3. **将新对象的__proto__这个属性指向对应构造函数的prototype属性，把实例和原型对象关联起来**
4. 执行函数体内的逻辑，最后即便你没有手动return，构造函数也会帮你把创建的这个新对象return出来