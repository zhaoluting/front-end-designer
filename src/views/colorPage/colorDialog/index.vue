<template src="./index.html"></template>
<style src="./index.less" lang="less"></style>
<script>
import colorPicker from '@/components/vue-color-picker/colorPicker';

export default {
  name: 'colorDialog',
  props: {
    color: Object,
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
      colorDetial: {},
    };
  },
  watch: {
    show() {
      if (this.color.user_name) {
        this.colorDetial = JSON.parse(JSON.stringify(this.color));
      } else {
        this.colorDetial = {
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
          user_id: this.fontEndUserInfo.id,
          user_name: this.fontEndUserInfo.userName,
        };
      }
      this.editDetial = !(this.color.id);
    },
  },
  computed: {
  },
  mounted() {
    this.fontEndUserInfo = JSON.parse(localStorage.fontEndUserInfo);
    this.colorDetial.user_name = this.fontEndUserInfo.userName;
    this.colorDetial.user_id = this.fontEndUserInfo.id;
  },
  methods: {
    switchEditDetial() {
      this.editDetial = true;
    },
    closeColor(isSub) {
      if (isSub) {
        this.$emit('subColor', this.colorDetial);
        this.editDetial = false;
      } else {
        this.$emit('cancel');
        this.editDetial = false;
      }
    },
  },
};
</script>
