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
      queryForm: {
        user_id: '',
      },
      diskType: [{
        type: 0,
        typeName: '上中型',
        simple: ['head', 'content'],
        includ: [['bcg_head', 'fc_head'], ['bcg_content', 'fc_content']],
      }, {
        type: 1,
        typeName: '上左中型',
        simple: ['head', 'left', 'content'],
        includ: [['bcg_head', 'fc_head'], ['bcg_left', 'fc_left'], ['bcg_content', 'fc_content']],
      }, {
        type: 2,
        typeName: '上中右型',
        simple: ['head', 'content', 'right'],
        includ: [['bcg_head', 'fc_head'], ['bcg_content', 'fc_content'], ['bcg_right', 'fc_right']],
      }, {
        type: 3,
        typeName: '上左中右型',
        simple: ['head', 'left', 'content', 'right'],
        includ: [['bcg_head', 'fc_head'], ['bcg_left', 'fc_left'], ['bcg_content', 'fc_content'], ['bcg_right', 'fc_right']],
      }, {
        type: 4,
        typeName: '上中下型',
        simple: ['head', 'content', 'foot'],
        includ: [['bcg_head', 'fc_head'], ['bcg_content', 'fc_content'], ['bcg_foot', 'fc_foot']],
      }, {
        type: 5,
        typeName: '上左中下型',
        simple: ['head', 'left', 'content', 'foot'],
        includ: [['bcg_head', 'fc_head'], ['bcg_left', 'fc_left'], ['bcg_content', 'fc_content'], ['bcg_foot', 'fc_foot']],
      }, {
        type: 6,
        typeName: '上中右下型',
        simple: ['head', 'content', 'right', 'foot'],
        includ: [['bcg_head', 'fc_head'], ['bcg_content', 'fc_content'], ['bcg_right', 'fc_right'], ['bcg_foot', 'fc_foot']],
      }, {
        type: 7,
        typeName: '上左中右下型',
        simple: ['head', 'left', 'content', 'right', 'foot'],
        includ: [['bcg_head', 'fc_head'], ['bcg_left', 'fc_left'], ['bcg_content', 'fc_content'], ['bcg_right', 'fc_right'], ['bcg_foot', 'fc_foot']],
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
    getColorDisk() {
      this.$http.get('/color/getAllColorDisk', this.queryForm).then((res) => { // axios返回的数据都在res.data里
        this.allcolorDisk = res.data.result;
      });
    },
    previewColor(index) {
      if (index !== 'new') {
        this.colorPreview = this.allcolorDisk[index];
        if (this.localUserName.id !== this.allcolorDisk[index].user_id) {
          this.allcolorDisk[index].hot_view = this.allcolorDisk[index].hot_view + 1;
        }
      } else {
        this.colorPreview = {};
      }
      this.colorPreviewShow = true;
    },
    subColor() {
      this.getAllColorDisk();
      this.colorPreviewShow = false;
    },
    changeOrderBy() {
      this.ordertype = (this.ordertype === 'desc') ? 'asc' : 'desc';
    },
  },
};
</script>
