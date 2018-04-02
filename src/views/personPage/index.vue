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
      modalShow: false,
      userForm: {
        id: 0,
        userName: '',
        password: '',
        email: '',
        character: '',
      },
      characterList: {
        designer: '设计师',
        developer: '开发者',
        productManager: '产品经理',
        other: '其他',
      },
      programColumns: [{
        title: '设计台名称',
        key: 'name',
      },
      {
        title: '地址',
        key: 'age',
      }],
      programList: [],
    };
  },
  mounted() {
    this.userForm = JSON.parse(localStorage.fontEndUserInfo);
  },
  methods: {
    onSubmit() {
      this.$http.post('/auth/user/updateUser', this.userForm).then((res) => {
        if (res.data.success) { // 如果成功
          this.$Message.success('保存成功！');
          localStorage.fontEndUserInfo = JSON.stringify(this.userForm);
          this.$refs.layoutHead.updateUser();
          this.modalShow = false;
        } else {
          this.$Message.error('保存失败！');
        }
      }, (err) => {
        console.log(err);
        this.$Message.error('请求错误！');
      });
    },
  },
};
</script>
