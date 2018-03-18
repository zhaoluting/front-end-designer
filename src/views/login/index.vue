<template>
  <div class="loginPage">
    <div class="logo-title">
      <self-building-square-spinner
        :animation-duration="4000"
        :size="35"
        color="#fff"
        style="float: left;margin-top: 9px;"
      />
      <span class="title">Front-end Designer</span>
      <h3 style="color: #fff;">可视化网站配色布局工具</h3>
    </div>
    <transition name="slide-fade">
      <Card class="loginCard" v-if="loginShow">
        <h2 slot="title" style="color: #ce5656">
            <span>登录</span>
        </h2>
        <a href="#" slot="extra" @click.prevent="changeCard" style="color: #ce5656">
            <Icon type="shuffle"></Icon>
            <span>注册</span>
        </a>
        <Form ref="loginFrom" :model="loginFrom" :rules="loginRule">
            <Form-item prop="userName">
                <Input type="text" v-model="loginFrom.userName" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="password">
                <Input type="password" v-model="loginFrom.password" placeholder="密码">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('loginFrom')">登录</Button>
            </Form-item>
        </Form>
      </Card>
    </transition>
    <transition name="slide-fade">
        <Card class="loginCard" v-if="registerShow">
          <h2 slot="title" style="color: #ce5656">
              <span>注册</span>
          </h2>
          <a href="#" slot="extra" @click.prevent="changeCard" style="color: #ce5656">
              <Icon type="shuffle"></Icon>
              <span>登录</span>
          </a>
          <Radio-group v-model="registerFrom.character" style="margin-bottom: 10px;">
            <Radio label="designer">设计师</Radio>
            <Radio label="developer">开发者</Radio>
            <Radio label="productManager">产品经理</Radio>
            <Radio label="other">其他</Radio>
          </Radio-group>
          <Form ref="registerFrom" :model="registerFrom" :rules="registerRule">
              <Form-item prop="userName">
                  <Input type="text" v-model="registerFrom.userName" placeholder="用户名">
                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
              </Form-item>
              <Form-item prop="password">
                  <Input v-model="registerFrom.password" type="password" placeholder="密码">
                      <Icon type="ios-locked-outline" slot="prepend"></Icon>
                  </Input>
              </Form-item>
              <Form-item prop="email">
                <Input v-model="registerFrom.email" placeholder="邮箱">
                  <Icon type="ios-email-outline" slot="prepend"></Icon>
                </Input>
              </Form-item>
              <!-- <Form-item prop="character">
                <Input v-model="registerFrom.character" placeholder="角色">
                  <Icon type="ios-briefcase-outline" slot="prepend"></Icon>
                </Input>
              </Form-item> -->
              <Form-item>
                  <Button type="primary" @click="handleSubmit('registerFrom')">注册</Button>
              </Form-item>
          </Form>
        </Card>
      </transition>
  </div>
</template>
<style src="./index.less" lang="less"></style>
<script>
import { SelfBuildingSquareSpinner } from 'epic-spinners';

export default {
  name: 'login',
  components: {
    SelfBuildingSquareSpinner,
  },
  data() {
    return {
      loginShow: true,
      registerShow: false,
      loginFrom: {
        userName: '',
        password: '',
      },
      registerFrom: {
        userName: '',
        password: '',
        email: '',
        character: 'designer',
      },
      loginRule: {
        userName: [
          { required: true, message: '请填写用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 3, message: '密码长度不能小于3位', trigger: 'blur' },
        ],
      },
      registerRule: {
        userName: [
          { required: true, message: '请填写用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 3, message: '密码长度不能小于3位', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
        ],
      },
    };
  },
  mounted() {
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this[`${name}Sub`]();
        } else {
          this.$Message.error('未填写完整!');
        }
      });
    },
    changeCard() {
      if (this.loginShow) {
        this.loginShow = false;
        setTimeout(() => {
          this.registerShow = true;
        }, 400);
      } else {
        this.registerShow = false;
        setTimeout(() => {
          this.loginShow = true;
        }, 400);
      }
    },
    loginFromSub() {
      this.$http.post('/auth/user/postUserAuth', this.loginFrom).then((res) => { // axios返回的数据都在res.data里
        if (res.data.success) { // 如果成功
          this.$store.commit('setUserInfo', res.data.userInfo);
          localStorage.setItem('demo-token', res.data.token); // 用localStorage把token存下来
          localStorage.fontEndUserInfo = JSON.stringify(res.data.userInfo);
          this.$Message.success('登录成功！');
          this.$router.push('/'); // 进入首页，登录成功
        } else {
          this.$Message.error(res.data.info); // 登录失败，显示提示语
          localStorage.setItem('demo-token', null); // 将token清空
        }
      }, (err) => {
        console.log(err);
        this.$Message.error('请求错误！');
        localStorage.setItem('demo-token', null); // 将token清空
      });
    },
    registerFromSub() {
      this.$http.post('/auth/user/createUser', this.registerFrom).then((res) => {
        if (res.data.success) { // 如果成功
          this.$Message.success('注册成功！');
          this.changeCard();
        } else {
          this.$Message.error(res.data.info);
        }
      }, (err) => {
        console.log(err);
        this.$Message.error('请求错误！');
      });
    },
  },
};
</script>
