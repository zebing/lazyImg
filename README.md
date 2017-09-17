# lazyImg
一个图片懒加载插件
 
# 参数 
placeholder   用图片提前占位 默认 无
effect   载入和种效果
show  （直接显示）fadeIn（淡入）slideDown（下拉）默认show
threshold   提前加载 离目标200px 默认0
event   事件触发加载 click mouseover touchmove 默认 click
container   指定加载容器中的图片 默认document

# 使用
<script src="lazyImg.js"></script>
//带参数
lazyImg({
      container: 'container',
      placeholder: './image/0.jpg',
      event:'click',
      effect:'scale'
 })
 //默认参数
 lazyImg();
