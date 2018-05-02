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
      // 个人资料
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
      // 项目管理
      projectList: [],
      openPanel: [],
      allUsers: [],
      // 项目管理
      editModalShow: false,
      modalTitle: '新增项目',
      projectForm: {},
      // 管理项目成员
      permissionModalShow: false,
      permissonList: [],
    };
  },
  mounted() {
    this.userForm = JSON.parse(localStorage.fontEndUserInfo);
    this.closeEditModal();
    this.getAllUsers();
    this.getAllproject();
  },
  methods: {
    getAllproject() {
      this.$http.get(`/project/getProjectByUserId/${this.userForm.id}`).then((res) => {
        this.projectList = res.data.result;
      });
    },
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
    getAllUsers() {
      this.$http.get('/auth/user/getAllUsers').then((res) => {
        this.allUsers = res.data.result;
      });
    },
    openEditModel(type, row) {
      this.modalTitle = type;
      this.editModalShow = true;
      if (row) {
        this.projectForm = JSON.parse(JSON.stringify(row.projectDetial));
      }
    },
    closeEditModal() {
      this.editModalShow = false;
      this.permissionModalShow = false;
      this.projectForm = {
        id: '',
        project_name: '',
        creator: this.userForm.id,
        templet_id: '',
        descr: '',
      };
      this.permissonList = [{
        user_id: this.userForm.id,
        project_id: '',
        write: 1,
        setting: 1,
      }];
    },
    editProject() {
      if (this.projectForm.id === '') {
        this.newProject('createProject', '项目新增');
      }
    },
    newProject(url, text) {
      this.$http.post(`/project/${url}`, this.projectForm).then((res) => {
        if (res.data.success) { // 如果成功
          this.$Message.success(`${text}成功！`);
        } else if (!res.data.success) {
          this.$Message.error(`${text}失败！`);
        }
      }, (err) => {
        console.log(err);
        this.$Message.error('请求错误！');
      });
    },
    editPermission() {},
  },
};
</script>
