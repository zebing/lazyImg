# lazyImg
一个图片懒加载插件
 
### 参数 
**placeholder**    用图片提前占位  默认  无<br/> 
**effect**   载入效果<br/> 
**show**   （直接显示 fadeIn 淡入 slideDown 下拉 默认 show<br/> 
**threshold**   提前加载 离目标200px 默认0<br/> 
**event**  事件触发加载 click mouseover 默认 click<br/> 
**container**  指定加载容器中的图片 默认document

### 使用
带参数
``` javascript
<script src="lazyImg.js"></script>
lazyImg({
      container: 'container',
      placeholder: './image/0.jpg',
      event:'click',
      effect:'scale'
 });
 ```
 
 默认参数
 ``` javascript
 <script src="lazyImg.js"></script>
 lazyImg();
 ``` 
