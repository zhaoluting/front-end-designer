<template>
  <div class="home-page">
    <layout></layout>
    <div class="left-block">
      <svg class="icon left-icon" aria-hidden="true">
        <use xlink:href="#icon-shejitu"></use>
      </svg>
      <h1 class="block-title">设计师</h1>
      <h3 class="block-dec">设计台页面拖拽组件快速生成原型界面；支持pc端、手机端自适应预览；
        具备可视化样式编辑器和属性设置器，可自定义样式；色盘分享社区获取最新灵感。</h3>
    </div>
    <div class="left-block">
      <svg class="icon left-icon" aria-hidden="true">
        <use xlink:href="#icon-daima"></use>
      </svg>
      <h1 class="block-title">前端开发工程师</h1>
      <h3 class="block-dec">根据预览页面自动生成实时代码，帮助前端开发工程师编写代码，
        只需在复制粘贴的代码基础上进行业务二次开发即可。</h3>
    </div>
    <div class="left-block">
      <svg class="icon left-icon" aria-hidden="true">
        <use xlink:href="#icon-chanpin"></use>
      </svg>
      <h1 class="block-title">产品经理</h1>
      <h3 class="block-dec">支持导入不同UI库，能让设计稿贴近实际开发web应用的页面效果，
        大大减少了产品经理、美工及前端开发工程师的沟通成本。在线浏览原型稿，远程指导。</h3>
    </div>
    <div class="left-block">
      <svg class="icon left-icon" aria-hidden="true">
        <use xlink:href="#icon-kafei"></use>
      </svg>
      <h1 class="block-title">项目管理</h1>
      <h3 class="block-dec">为美工设计师、产品经理及前端开发工程师在设计产品原型或设计页面时提供参考与帮助而研发的工具。可提升项目管理质量，加快项目进度。</h3>
    </div>
  </div>
</template>
<style src="./index.less" lang="less"></style>
<script>
import layout from '@/components/layout/index';

export default {
  name: 'login',
  components: {
    layout,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>
