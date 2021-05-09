## 位运算

MDN：[位运算](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators#%E4%BD%8D%E8%BF%90%E7%AE%97%E7%AC%A6)

JS对数字的存储是以```IEEE-754``` 64位格式进行存储的，但是位运算并不会直接操作64位的值，而是先将64位转成32位进行计算，最后在将结果转换为64位。
如果转成2进制不足32位，则会转成先转成32位进行计算，不足的部分用0进行填充。如果超过则丢弃不要

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


### 按位与
<html>
    <table>
        <tr>
            <td>例子</td>
            <td width=100>二进制</td>
            <td>结果</td>
        </tr>
        <tr>
            <td>5 & 5</td>
            <td>
                <p>101</p>
                <p>101</p>
            </td>
            <td>5</td>
        </tr>
        <tr>
            <td>5 & 10</td>
            <td >
                <p>101</p>
                <p>1010</p>
            </td>
            <td>0</td>
        </tr>
    </table>
</html>

### 按位或
<html>
    <table>
        <tr>
            <td>例子</td>
            <td width=100 >二进制</td>
            <td>结果</td>
        </tr>
        <tr>
            <td>10 | 22</td>
            <td >
                <p>1010</p>
                <p>10110</p>
            </td>
            <td>
                <p>30</p>
                <p>11110</p>
            </td>
        </tr>
    </table>
</html>

### 按位异或

<html>
    <table>
        <tr>
            <td>例子</td>
            <td width=100 >二进制</td>
            <td>结果</td>
        </tr>
        <tr>
            <td>10 | 22</td>
            <td >
                <p>1010</p>
                <p>10110</p>
            </td>
            <td>
                <p>30</p>
                <p>11100</p>
            </td>
        </tr>
    </table>
</html>

### 按位非

注意：
- 在进行按位非运算时，所有数字的计算结果都是```~(x + 1)```
- <p>由于对数字<code>~-1</code>和<code>~4294967295</code> (2<sup>32</sup>-1) 使用32位表示形式，结果均为0。</p>

<html>
    <table>
        <tr>
            <td>例子</td>
            <td width=100 >二进制</td>
            <td>结果</td>
        </tr>
        <tr>
            <td>~10</td>
            <td >
                <p>1011</p>
            </td>
            <td>
                <p>-11</p>
                <p>0100</p>
            </td>
        </tr>
    </table>
</html>

### 左移

<html>
    <table>
        <tr>
            <td>例子</td>
            <td width=100 >二进制</td>
            <td>结果</td>
        </tr>
        <tr>
            <td>2 &lt;&lt; 2 </td>
            <td>
                <p>2</p>
                <p>00000000000000000000000000000010</p>
            </td>
            <td>
                <p>8</p>
                <p>00000000000000000000000000001000</p>
            </td>
        </tr>
    </table>
</html>

### 右移

<html>
    <table>
        <tr>
            <td>例子</td>
            <td width=100 >二进制</td>
            <td>结果</td>
        </tr>
        <tr>
            <td>10 >> 2 </td>
            <td>
                <p>10</p>
                <p>00000000000000000000000000001010</p>
            </td>
            <td>
                <p>2</p>
                <p>00000000000000000000000000000010</p>
            </td>
        </tr>
    </table>
</html>

### 无符号右移

<html>
    <table>
        <tr>
            <td>例子</td>
            <td width=100 >二进制</td>
            <td>结果</td>
        </tr>
        <tr>
            <td>54 >>>  2 </td>
            <td>
                <p>54</p>
                <p>00000000000000000000000000110110</p>
            </td>
            <td>
                <p>13</p>
                <p>00000000000000000000000000001101</p>
            </td>
        </tr>
    </table>
</html>