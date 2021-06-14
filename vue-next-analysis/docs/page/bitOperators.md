## 位运算

MDN：[位运算](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators#%E4%BD%8D%E8%BF%90%E7%AE%97%E7%AC%A6)

JS对数字的存储是以```IEEE-754``` 64位格式进行存储的，但是位运算并不会直接操作64位的值，而是先将64位转成32位进行计算，最后在将结果转换为64位。
如果转成2进制不足32位，则会转成先转成32位进行计算，不足的部分用0进行填充。如果超过则丢弃不要，<span style="color: red">在计算机中，最左边为高位，最右边为低位</span>

<p style="color: red">本篇为了方便了解，全部采用32位进行标记</p>
<html>
    <table>
        <tr>
            <td>语法</td>
            <td width=100>例子</td>
            <td>描述</td>
        </tr>
        <tr>
            <td>按位与 AND</td>
            <td>a & b</td>
            <td>在a，b的位表示中，每一个对应的位都为1则返回1， 否则返回0</td>
        </tr>
       <tr>
            <td>按位或 OR</td>
            <td>a | b</td>
            <td>在a，b的位表示中，每一个对应的位，只要有一个为1则返回1， 否则返回0</td>
        </tr>
        <tr>
            <td>按位异或 XOR</td>
            <td>a ^ b</td>
            <td>在a，b的位表示中，每一个对应的位，两个不相同则返回1，相同则返回0</td>
        </tr>
        <tr>
            <td>按位非 NOT</td>
            <td>~a</td>
            <td>对每位进行取反</td>
        </tr>
        <tr>
            <td>左移</td>
            <td>a &lt;&lt; b</td>
            <td>
                <p>将a的二进制串向左移动b位，低位空缺补0，高位溢出不要</p>
                <p>左移不考虑正负数</p>
            </td>
        </tr>
        <tr>
            <td>右移</td>
            <td>a >> b</td>
            <td>
                <p>把a的二进制表示向右移动b位</p>
                <p>正数 右移的时候，最高位补0，低位舍去</p>
                <p>负数 右移的时候，最高位补1，低位舍去</p>
            </td>
        </tr>
        <tr>
            <td>
                <span>无符号右移</span>
                <p>(左边空出位用0填充)</p>
            </td>
            <td>a >>> b</td>
            <td>把a的二进制表示向右移动b位，溢出舍去，高位补0（不处理正负数，高位不0）</td>
        </tr>
    </table>
</html>


### 按位与 AND

- 每一位相同为1，不同为0

<html>
    <table class="bitOperators">
        <tr>
            <td>例子</td>
            <td width=100>二进制</td>
            <td>结果/对应的二进制</td>
        </tr>
        <tr>
            <td>5 & 5</td>
            <td>
                <p>0000 0000 0000 0000 0000 0000 0000 0101</p>
                <p>0000 0000 0000 0000 0000 0000 0000 0101</p>
            </td>
            <td>
                <p>5</p>
                <p>0000 0000 0000 0000 0000 0000 0000 0101</p>
            </td>
        </tr>
        <tr>
            <td>5 & 10</td>
            <td >
                <p>0000 0000 0000 0000 0000 0000 0000 0101</p>
                <p>0000 0000 0000 0000 0000 0000 0000 1010</p>
            </td>
            <td>
                <p>5</p>
                <p>0000 0000 0000 0000 0000 0000 0000 0000</p>
            </td>
        </tr>
    </table>
</html>

### 按位或 OR

- 只要每个对应的位有1个是1就为1，否则为0
<html>
    <table class="bitOperators">
        <tr>
            <td>例子</td>
            <td width=100 >二进制</td>
            <td>结果/对应的二进制</td>
        </tr>
        <tr>
            <td>10 | 22</td>
            <td >
                <p>0000 0000 0000 0000 0000 0000 0000 1010</p>
                <p>0000 0000 0000 0000 0000 0000 0001 0110</p>
            </td>
            <td>
                <p>30</p>
                <p>0000 0000 0000 0000 0000 0000 0001 1110</p>
            </td>
        </tr>
    </table>
</html>

### 按位异或 XOR

- 每个对应的位，不同为1，相同为0
<html>
    <table class="bitOperators">
        <tr>
            <td>例子</td>
            <td width=100 >二进制</td>
            <td>结果/对应的二进制</td>
        </tr>
        <tr>
            <td>10 ^ 22</td>
            <td >
                <p>0000 0000 0000 0000 0000 0000 0000 1010</p>
                <p>0000 0000 0000 0000 0000 0000 0001 0110</p>
            </td>
            <td>
                <p>28</p>
                <p>0000 0000 0000 0000 0000 0000 0001 1100</p>
            </td>
        </tr>
    </table>
</html>

### 按位非 NOT

- 对每个位进行取反

注意：
- 在进行按位非运算时，所有数字的计算结果都是```~(x + 1)```
- <p>由于对数字<code>~-1</code>和<code>~4294967295</code> (2<sup>32</sup>-1) 使用32位表示形式，结果均为0。</p>

<html>
    <table class="bitOperators">
        <tr>
            <td>例子</td>
            <td width=100 >二进制</td>
            <td>结果/对应的二进制</td>
        </tr>
        <tr>
            <td>~10</td>
            <td >
                <p>0000 0000 0000 0000 0000 0000 0000 1011</p>
            </td>
            <td>
                <p>-11</p>
                <p>0000 0000 0000 0000 0000 0000 0000 0100</p>
            </td>
        </tr>
    </table>
</html>

### 左移
- 向左移动n位，低位补0，高位不要

<html>
    <table class="bitOperators">
        <tr>
            <td>例子</td>
            <td width=100 >二进制</td>
            <td>结果/对应的二进制</td>
        </tr>
        <tr>
            <td>2 &lt;&lt; 2 </td>
            <td>
                <p>2</p>
                <p>0000 0000 0000 0000 0000 0000 0000 0010</p>
            </td>
            <td>
                <p>8</p>
                <p>0000 0000 0000 0000 0000 0000 0000 1000</p>
            </td>
        </tr>
    </table>
</html>

### 右移

- 向右移动n位

<html>
    <table class="bitOperators">
        <tr>
            <td>例子</td>
            <td >二进制</td>
            <td>结果/对应的二进制</td>
        </tr>
        <tr>
            <td>10 >> 2 </td>
            <td>
                <p>10</p>
                <p>0000 0000 0000 0000 0000 0000 0000 1010</p>
            </td>
            <td>
                <p>2</p>
                <p>0000 0000 0000 0000 0000 0000 0000 0010</p>
            </td>
        </tr>
    </table>
</html>

### 无符号右移

- 把a的二进制表示向右移动b位，溢出舍去，高位补0（不处理正负数，高位不0

<html>
    <table class="bitOperators">
        <tr>
            <td>例子</td>
            <td>二进制</td>
            <td>结果/对应的二进制</td>
        </tr>
        <tr>
            <td>54 >>>  2 </td>
            <td >
                <p>54</p>
                <p>0000 0000 0000 0000 0000 0000 0011 0110</p>
            </td>
            <td>
                <p>13</p>
                <p>0000 0000 0000 0000 0000 0000 0000 1101</p>
            </td>
        </tr>
    </table>
</html>

<ClientOnly>
<style scoped>
.bitOperators tr td:nth-of-type(1) {
    /* border: 2px solid red; */
    width: 105px;
}
.bitOperators tr td:nth-of-type(2) {
    /* border: 2px solid red; */
    width: 310px;
}
.bitOperators tr td:nth-of-type(3) {
    /* border: 2px solid red; */
    width: 310px;
}

</style>
</ClientOnly>

## vue-next对位运算的应用
在```vue-next```中，充满了大量对位运算的操作，主要是针对一些内容做的标记，如：

- patchFlags 编译优化相关
- shapFlags 标记当前元素类型
- slotFlags slot相关

### patchFlags
代码在```packages/shared/src/patchFlags.ts```

```ts
export const enum PatchFlags {
  TEXT = 1, // 动态文本
  CLASS = 1 << 1, // 2 动态class
  STYLE = 1 << 2, // 4 动态style
  PROPS = 1 << 3, // 8
  FULL_PROPS = 1 << 4, // 16
  HYDRATE_EVENTS = 1 << 5, // 32
  STABLE_FRAGMENT = 1 << 6, // 64
  KEYED_FRAGMENT = 1 << 7, // 128
  UNKEYED_FRAGMENT = 1 << 8, // 256
  NEED_PATCH = 1 << 9, // 512
  DYNAMIC_SLOTS = 1 << 10, // 1024
  DEV_ROOT_FRAGMENT = 1 << 11, // 2048
  HOISTED = -1,
  BAIL = -2
}

```

### shapFlags
代码在```packages/shared/src/shapeFlags.ts```

```ts
export const enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1, // 2
  STATEFUL_COMPONENT = 1 << 2, // 4
  TEXT_CHILDREN = 1 << 3, // 8
  ARRAY_CHILDREN = 1 << 4, // 16
  SLOTS_CHILDREN = 1 << 5, // 32
  TELEPORT = 1 << 6, // 64
  SUSPENSE = 1 << 7, // 128
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8, // 256
  COMPONENT_KEPT_ALIVE = 1 << 9, // 512
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT // 4 | 2
}

```
### slotFlags
代码在```packages/shared/src/slotFlags.ts```
```ts
export const enum SlotFlags {
  /**
   * Stable slots that only reference slot props or context state. The slot
   * can fully capture its own dependencies so when passed down the parent won't
   * need to force the child to update.
   */
  STABLE = 1,
  /**
   * Slots that reference scope variables (v-for or an outer slot prop), or
   * has conditional structure (v-if, v-for). The parent will need to force
   * the child to update because the slot does not fully capture its dependencies.
   */
  DYNAMIC = 2,
  /**
   * `<slot/>` being forwarded into a child component. Whether the parent needs
   * to update the child is dependent on what kind of slots the parent itself
   * received. This has to be refined at runtime, when the child's vnode
   * is being created (in `normalizeChildren`)
   */
  FORWARDED = 3
}
```