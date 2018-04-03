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
        key: '',
        value: '',
        orderBy: 'id',
        order: 'asc',
      },
      diskType: [{
        type: 0,
        typeName: '上中型',
        simple: ['上', '中'],
        includ: [['bcg_head', 'fc_head'], ['bcg_content', 'fc_content']],
      }, {
        type: 1,
        typeName: '上左中型',
        simple: ['上', '左', '中'],
        includ: [['bcg_head', 'fc_head'], ['bcg_left', 'fc_left'], ['bcg_content', 'fc_content']],
      }, {
        type: 2,
        typeName: '上中右型',
        simple: ['上', '中', '右'],
        includ: [['bcg_head', 'fc_head'], ['bcg_content', 'fc_content'], ['bcg_right', 'fc_right']],
      }, {
        type: 3,
        typeName: '上左中右型',
        simple: ['上', '左', '中', '右'],
        includ: [['bcg_head', 'fc_head'], ['bcg_left', 'fc_left'], ['bcg_content', 'fc_content'], ['bcg_right', 'fc_right']],
      }, {
        type: 4,
        typeName: '上中下型',
        simple: ['上', '中', '下'],
        includ: [['bcg_head', 'fc_head'], ['bcg_content', 'fc_content'], ['bcg_foot', 'fc_foot']],
      }, {
        type: 5,
        typeName: '上左中下型',
        simple: ['上', '左', '中', '下'],
        includ: [['bcg_head', 'fc_head'], ['bcg_left', 'fc_left'], ['bcg_content', 'fc_content'], ['bcg_foot', 'fc_foot']],
      }, {
        type: 6,
        typeName: '上中右下型',
        simple: ['上', '中', '右', '下'],
        includ: [['bcg_head', 'fc_head'], ['bcg_content', 'fc_content'], ['bcg_right', 'fc_right'], ['bcg_foot', 'fc_foot']],
      }, {
        type: 7,
        typeName: '上左中右下型',
        simple: ['上', '左', '中', '右', '下'],
        includ: [['bcg_head', 'fc_head'], ['bcg_left', 'fc_left'], ['bcg_content', 'fc_content'], ['bcg_right', 'fc_right'], ['bcg_foot', 'fc_foot']],
      }],
      colorPreviewShow: false,
      colorPreview: {},
    };
  },
  mounted() {
    this.localUserName = JSON.parse(localStorage.fontEndUserInfo);
    this.getAllColorDisk();
  },
  methods: {
    getAllColorDisk(value) {
      this.queryForm.value = value;
      const prama = JSON.parse(JSON.stringify(this.queryForm));
      if (prama.orderBy === 'user_id') {
        prama.key = this.localUserName.id;
        prama.value = 'user_id';
      }
      this.$http.get(`/color/getQueryColorDisk?orderBy=${prama.orderBy}&order=${prama.order}&key=${prama.key}&value=${prama.value}`, prama).then((res) => { // axios返回的数据都在res.data里
        this.allcolorDisk = res.data.result;
      });
    },
    changeOrderBy() {
      this.queryForm.order = (this.queryForm.order === 'desc') ? 'asc' : 'desc';
      this.getAllColorDisk();
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
  },
};
</script>
