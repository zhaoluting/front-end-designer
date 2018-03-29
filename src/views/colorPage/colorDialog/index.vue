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
    show(value) {
      if (this.color.user_name) {
        this.colorDetial = JSON.parse(JSON.stringify(this.color));
      } else {
        this.colorDetial = {
          bcg_content: '#fff',
          bcg_head: '#CC5758',
          bcg_left: '',
          bcg_right: '',
          disk_name: '',
          disk_type: 0,
          fc_content: '#CC5758',
          fc_head: '#fff',
          fc_left: '',
          fc_right: '',
          hot_view: 0,
          primary_color: '',
          user_id: this.fontEndUserInfo.id,
          user_name: this.fontEndUserInfo.userName,
        };
      }
      this.editDetial = !(this.color.id);
      if (value === true && this.color.id && this.color.user_id !== this.fontEndUserInfo.id) {
        this.newColorDisk('updateColorDisk', '更新', false);
      }
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
      if (isSub === 'true') {
        if (this.colorDetial.id) this.newColorDisk('updateColorDisk', '更新', true);
        else this.newColorDisk('createColorDisk', '创建', true);
      } else if (isSub === 'false' && this.colorDetial.id) {
        this.colorDetial = JSON.parse(JSON.stringify(this.color));
        this.editDetial = false;
      }
    },
    changeColor(includ, index) {
      this.editColor = includ[0].split('_')[1];
      this.editCheck = index;
    },
    newColorDisk(url, text, isMessage) {
      this.$http.post(`/color/${url}`, this.colorDetial).then((res) => {
        if (res.data.success && isMessage) { // 如果成功
          this.$Message.success(`${text}成功！`);
          this.$emit('subColor', this.colorDetial);
        } else if (!res.data.success) {
          this.$Message.error(`${text}失败！`);
        }
      }, (err) => {
        console.log(err);
        this.$Message.error('请求错误！');
      });
    },
    delColorDisk() {
      this.$Modal.confirm({
        title: '确定删除？',
        content: '删除后无法恢复',
        onOk: () => {
          this.$http.delete(`/color/removeColorDisk/${this.colorDetial.id}`).then((res) => {
            if (res.data.success) { // 如果成功
              this.$Message.success('删除成功！');
              this.$emit('subColor', this.colorDetial);
            } else {
              this.$Message.error('删除失败！');
            }
          }, (err) => {
            console.log(err);
            this.$Message.error('请求错误！');
          });
        },
        onCancel: () => {
          console.log('点击了取消');
        },
      });
    },
  },
};
</script>
