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
      localUserInfo: {},
      userForm: {
        id: 0,
        userName: '',
        password: '',
        email: '',
        character: '',
      },
    };
  },
  mounted() {
    this.localUserInfo = JSON.parse(localStorage.fontEndUserInfo);
    this.userForm = JSON.parse(localStorage.fontEndUserInfo);
  },
  methods: {
    onSubmit() {
      console.log('ddd');
    },
  },
};
</script>
