<template>
  <div class="home-page">
    <layout></layout>
    <div class="left-block">
      <svg class="icon left-icon" aria-hidden="true">
        <use xlink:href="#icon-shejitu"></use>
      </svg>
      <h1 class="block-title">设计师</h1>
      <h3 class="block-dec">快速生成原型界面，获取最新灵感</h3>
    </div>
    <div class="left-block">
      <svg class="icon left-icon" aria-hidden="true">
        <use xlink:href="#icon-daima"></use>
      </svg>
      <h1 class="block-title">前端开发工程师</h1>
      <h3 class="block-dec">根据原型，实时生成vue代码模板</h3>
    </div>
    <div class="left-block">
      <svg class="icon left-icon" aria-hidden="true">
        <use xlink:href="#icon-chanpin"></use>
      </svg>
      <h1 class="block-title">产品经理</h1>
      <h3 class="block-dec">在线浏览原型稿，远程指导</h3>
    </div>
    <div class="left-block">
      <svg class="icon left-icon" aria-hidden="true">
        <use xlink:href="#icon-kafei"></use>
      </svg>
      <h1 class="block-title">项目管理</h1>
      <h3 class="block-dec">提升项目管理质量，加快项目进度</h3>
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
