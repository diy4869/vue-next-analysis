## 基本知识

注：
- 标 ☆ 的是已有内容的
- 本文并不算完成，更新看个人心情
- 由于```vue-next```源码比较复杂（之前统计了下8w多行，算测试用例等一些其他），部分细节不会写的很细，毕竟我也不会，一些东西会标上注释
- 本文版权所有，版权归属于```last order```
- <span style="color: red;">如果有所帮助，不介意来个star</span>
- github：[vue-next源码解析](https://github.com/diy4869/vue-next-analysis)

## 观看本文所需要具备的知识

- Typescript（不会建议放弃，或者[ Typescript官网 ](https://www.typescriptlang.org/)学习，本文并不会特别说明，虽然写了目录（看心情））
- 位运算（我也是现学的，```vue-next```对这部分用的比较多，主要用于优化和标记）
- Rollup（看心情写，我也不会，不看这个也没啥关系，这块也就只负责构建相关）

## 本人目前阅读进度

本人目前也就看到初始化创建```vnode```的阶段，后面更新的话，大概是到初次渲染结束大概，具体时间不知道，可能中间也会更点其他的内容。

## 测试代码

后续可能会加```keepAlive、v-show``` 等一些其他相关例子
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .red {
            color: red;
        }
        .blue {
            color: blue
        }
        span {
            font-size: 20px;
        }
    </style>
</head>
<body>
    <div id="app">
        <span :class="count % 2 === 0 ? 'red' : 'blue'">{{ count }}</span>
        
        <button @click="add">增加</button>
        <test :count="count"></test>
        <ul>
            <li v-for="item in 10">{{ item }}</li>
        </ul>
        <suspense>
            <div id="suspense">supense组件</div>
        </suspense>
        <teleport to="body #suspense">
            <div>telport组件</div>
        </teleport>
    </div>

</body>
<script src="../packages/vue/dist/vue.global.js"></script>
<script>
    const { createApp, reactive, ref } = Vue

    const children = {
        props: {
            count: String,
            test: {
                type: Boolean
            }
        },
        template: `
            <div>这是子组件</div>
            <div>这是父组件接受的count：{{count}}</div>
        `
    }
    const app = createApp({
        components: {
            test: children
        },
        setup () {
            const count = ref(0)
            const add = () => {
                console.log(count)
                count.value++
            }
            return {
                count,
                add
            }
        }
    }).mount('#app')

</script>
</html>
```
