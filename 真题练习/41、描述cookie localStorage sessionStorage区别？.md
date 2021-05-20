一、cookie
cookie的作用：
    本身用于浏览器和server通讯
    被"借用"到本地存储来
    可用document.cookie = '...' 来修改;相同的key会覆盖，不同的key会追加；
cookie的限制：
    存储大小；最大4kb；
    http请求时需要发送到服务端，增加请求数据量
    只能用document.cookie=''来修改，太过简陋

二、localStorage和sessionStorage
HTML5专门为存储而设计，每个域名最大可存储5M
API简单易用setItem getItem
不会随着http请求被发送出去

localStorage数据会永久存储，除非代码或手动删除
sessionStorage数据只存在于当前会话，浏览器关闭则清空


