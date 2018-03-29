<template src="./index.html"></template>
<style src="./index.less" lang="less"></style>
<script>
import layout from '@/components/layout/index';
import Waterfall from 'vue-waterfall/lib/waterfall';
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot';
import colorDialog from './colorDialog/index';

export default {
  name: 'colorPage',
  components: {
    layout,
    Waterfall,
    WaterfallSlot,
    colorDialog,
  },
  data() {
    return {
      localUserName: {},
      allcolorDisk: [],
      diskType: [{
        type: 0,
        typeName: '上中型',
        includ: [['bcg_head', 'fc_head'], ['bcg_content', 'fc_content']],
      }, {
        type: 1,
        typeName: '上左中型',
        includ: [['bcg_head', 'fc_head'], ['bcg_left', 'fc_left'], ['bcg_content', 'fc_content']],
      }, {
        type: 2,
        typeName: '上中右型',
        includ: [['bcg_head', 'fc_head'], ['bcg_content', 'fc_content'], ['bcg_right', 'fc_right']],
      }, {
        type: 3,
        typeName: '上左中右型',
        includ: [['bcg_head', 'fc_head'], ['bcg_left', 'fc_left'], ['bcg_content', 'fc_content'], ['bcg_right', 'fc_right']],
      }],
      colorPreviewShow: false,
      colorPreview: {},
      orderBy: 'time',
      ordertype: 'desc',
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
    previewColor(index) {
      if (index !== 'new') {
        this.colorPreview = this.allcolorDisk[index];
        this.allcolorDisk[index].hot_view = this.allcolorDisk[index].hot_view + 1;
      } else {
        this.colorPreview = {};
      }
      this.colorPreviewShow = true;
    },
    subColor() {
      this.getAllColorDisk();
      this.colorPreviewShow = false;
    },
  },
};
</script>
