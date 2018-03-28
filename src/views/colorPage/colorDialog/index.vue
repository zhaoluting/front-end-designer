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
      editColorType: 'bcg',
      editColor: 'head',
      editCheck: 0,
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
    closeColor(isSub) {
      if (isSub) {
        if (this.colorDetial.id) this.newColorDisk('updateColorDisk', '更新');
        else this.newColorDisk('createColorDisk', '创建');
      } else {
        this.colorDetial = JSON.parse(JSON.stringify(this.color));
      }
      this.editDetial = false;
    },
    changeColor(includ, index) {
      this.editColor = includ[0].split('_')[1];
      this.editCheck = index;
    },
    newColorDisk(url, text) {
      this.$http.post(`/color/${url}`, this.colorDetial).then((res) => {
        if (res.data.success) { // 如果成功
          this.$Message.success(`${text}成功！`);
          this.$emit('subColor', this.colorDetial);
        } else {
          this.$Message.error(`${text}失败！`);
        }
      }, (err) => {
        console.log(err);
        this.$Message.error('请求错误！');
      });
    },
  },
};
</script>
