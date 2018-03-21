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
      diskType: [{
        type: 1,
        typeName: '上中型',
        includ: [['bcg_head', 'fc_head'], ['bcg_content', 'fc_content']],
      }, {
        type: 2,
        typeName: '上左中型',
        includ: [['bcg_head', 'fc_head'], ['bcg_left', 'fc_left'], ['bcg_content', 'fc_content']],
      }, {
        type: 3,
        typeName: '上中右型',
        includ: [['bcg_head', 'fc_head'], ['bcg_content', 'fc_content'], ['bcg_right', 'fc_right']],
      }, {
        type: 4,
        typeName: '上左中右型',
        includ: [['bcg_head', 'fc_head'], ['bcg_left', 'fc_left'], ['bcg_content', 'fc_content'], ['bcg_right', 'fc_right']],
      }],
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
