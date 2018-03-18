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
      allcolorDisk: [],
    };
  },
  mounted() {
    this.localUserName = JSON.parse(localStorage.fontEndUserInfo);
    this.getAllColorDisk();
  },
  methods: {
    getAllColorDisk() {
      this.$http.get('/color/getAllColorDisk').then((res) => { // axios返回的数据都在res.data里
        this.allcolorDisk = res.data.result;
      });
    },
    previewColor() {
      console.log('qqq');
    },
  },
};
</script>
