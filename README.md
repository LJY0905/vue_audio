# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

# Notes:

### 音频播放组件

由于原生 js 中的 audio 在不同平台上的样式不一样，因此需要实现一个 ui 要求的音频播放组件

### 1.样式：

`display: flex`其中进度条`flex: 1`撑满

### 2.参数传递

`props`接收`audioUrl`

### 3.监听 audio 事件：

加载 l`oadedmetadata`事件得到音频时长，开始播放`play`事件，暂停`pause`事件，播放中`timeupdate`记录音频播放时长，结束 ended 事件

### 4.进度条

根据`timeupdate`事件，得到当前播放时长占比，控制进度条

### 5.`isPlay`和`isEnd`记录音频状态

### 6.使用 moment.js 格式化时间显示

### ps

在这里使用了`van-progress`组件实现进度条，可以尝试使用`div`但是由于动画效果不佳，这里不展示
