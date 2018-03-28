<template src="./index.html"></template>
<style src="./index.less" lang="less"></style>
<script>
import colorPicker from '@/components/vue-color-picker/colorPicker';

export default {
  name: 'colorDialog',
  props: {
    color: Object,
    disabled: Boolean,
    diskTypeNum: Array,
    show: Boolean,
  },
  components: {
    colorPicker,
  },
  data() {
    return {
      editDetial: false,
      fontEndUserInfo: {},
      colorDetial: {
        bcg_content: '',
        bcg_head: '',
        bcg_left: '',
        bcg_right: '',
        disk_name: '',
        disk_type: 0,
        fc_content: '',
        fc_head: '',
        fc_left: '',
        fc_right: '',
        hot_view: 0,
        primary_color: '',
        user_id: '',
        user_name: '',
      },
    };
  },
  watch: {},
  computed: {
  },
  mounted() {
    this.fontEndUserInfo = JSON.parse(localStorage.fontEndUserInfo);
  },
  methods: {
    switchEditDetial() {
      this.editDetial = true;
      this.colorDetial = JSON.parse(JSON.stringify(this.color));
    },
    closeColor(isSub) {
      if (isSub) {
        this.editDetial = false;
      } else {
        this.color = JSON.parse(JSON.stringify(this.colorDetial));
        this.editDetial = false;
      }
    },
  },
};
</script>
