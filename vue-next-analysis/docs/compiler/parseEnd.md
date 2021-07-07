## 结束
```parseChildren```的部分到这就算结束了，整体来说```vue-next```的实现还算好懂的，前面对一些常见的解析都做了说明，到这里整个```parse```阶段到这也差不多就结束了。下一步为```transform```阶段，主要是对AST结构的代码去做更进一步的处理，如：

- v-model
- v-for
- v-if
- v-on
- v-once
- 其他
