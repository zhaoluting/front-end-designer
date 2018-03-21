<template src="./index.html"></template>
<style src="./index.less" lang="less"></style>
<script>
import layout from '@/components/layout/index';

export default {
  name: 'colorPage',
  components: {
    layout,
  },
  data() {
    return {
      localUserName: {},
    };
  },
  mounted() {
    this.localUserName = JSON.parse(localStorage.fontEndUserInfo);
  },
  methods: {
  },
};
</script>
