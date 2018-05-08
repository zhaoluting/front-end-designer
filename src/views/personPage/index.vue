<template src="./index.html"></template>
<style src="./index.less" lang="less"></style>
<script>
import layout from '@/components/layout/index';

export default {
  name: 'personPage',
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
      allUsers: [],
      usersMap: {},
      // 项目管理
      editModalShow: false,
      modalTitle: '新建项目',
      projectForm: {},
      // 管理项目成员
      editPermissionModalShow: false,
      permissionForm: {},
    };
  },
  mounted() {
    this.userForm = JSON.parse(localStorage.fontEndUserInfo);
    this.closeEditModal();
    this.closePermissionModal();
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
        this.usersMap = {};
        for (const item of this.allUsers) {
          this.usersMap[item.id] = item.userName;
        }
      });
    },
    openEditModel(type, row) {
      this.modalTitle = type;
      this.editModalShow = true;
      if (row) {
        this.projectForm = JSON.parse(JSON.stringify(row.projectDetail));
      }
    },
    closeEditModal() {
      this.editModalShow = false;
      this.projectForm = {
        id: '',
        project_name: '',
        creator: this.userForm.id,
        templet_id: '',
        descr: '',
      };
    },
    editProject() {
      if (this.projectForm.id === '') {
        this.postProject('createProject', '项目新增', this.projectForm);
      } else {
        this.postProject('updateProject', '项目修改', this.projectForm);
      }
    },
    postProject(url, text, data) {
      this.$http.post(`/project/${url}`, data).then((res) => {
        if (res.data.success) { // 如果成功
          this.$Message.success(`${text}成功！`);
          this.getAllproject();
        } else if (!res.data.success) {
          this.$Message.error(`${text}失败！`);
        }
      }, (err) => {
        console.log(err);
        this.$Message.error('请求错误！');
      });
    },
    delItem(url, id) {
      this.$Modal.confirm({
        title: '确定删除？',
        content: '删除后无法恢复',
        onOk: () => {
          this.$http.delete(`/project/${url}/${id}`).then((res) => {
            if (res.data.success) { // 如果成功
              this.$Message.success('删除成功！');
              this.getAllproject();
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
    editPermission(item) {
      if (item) {
        const data = JSON.parse(JSON.stringify(item));
        data.write = (data.write) ? 1 : 0;
        data.setting = (data.setting) ? 1 : 0;
        this.postProject('updateProjectPermission', '成员权限修改', data);
      } else {
        let flag = true;
        let project = {};
        for (const projectItem of this.projectList) {
          if (projectItem.project_id === this.permissionForm.project_id) {
            project = projectItem;
          }
        }
        for (const index of project.allPermission) {
          if (index.user_id === this.permissionForm.user_id) flag = false;
        }
        if (flag) {
          const data = JSON.parse(JSON.stringify(this.permissionForm));
          data.write = (data.write) ? 1 : 0;
          data.setting = (data.setting) ? 1 : 0;
          this.postProject('createProjectPermission', '成员新增', data);
        } else this.$Message.error('成员已在项目中');
      }
    },
    openPermissionModel(projectId) {
      this.editPermissionModalShow = true;
      this.permissionForm.project_id = projectId;
    },
    closePermissionModal() {
      this.editPermissionModalShow = false;
      this.permissionForm = {
        id: '',
        user_id: '',
        project_id: '',
        write: true,
        setting: true,
      };
    },
    delPermission(item, permission) {
      if (Number(item.projectDetail.creator) === permission.user_id) this.$Message.error('不允许删除创建者');
      else this.delItem('removeProjectPermission', permission.id);
    },
  },
};
</script>
