<template>
  <div class="layout">
    <Affix class="layout-top">
      <Menu mode="horizontal" theme="primary" :active-name="activePage" @on-select="goToActivePage">
          <div class="layout-logo">
              <self-building-square-spinner
                :animation-duration="10000"
                :size="30"
                color="#fff"
              />
          </div>
          <div class="layout-title">
            DESIGNER
          </div>
          <div class="layout-nav">
              <Menu-item name="colorPage">
                <Icon type="aperture" class="rotate-icon"></Icon>
                  色盘共享
              </Menu-item>
              <Menu-item name="designerPage">
                <Icon type="easel"></Icon>
                  设计台
              </Menu-item>
              <Menu-item name="personPage">
                <Icon type="person"></Icon>
                  个人中心
              </Menu-item>
          </div>
          <span class="layout-right">
            <a @click="goToActivePage()" class="right-link">首页</a>
            <a @click="loginOut" class="right-link">退出</a>
            <a class="right-link">|</a>
            <a class="right-link">Hi,{{localUserName.userName}}</a>
            <span class="right-icon">
              <Icon type="ios-color-wand" v-if="localUserName.character === 'designer'"></Icon>
              <Icon type="code-working" v-else-if="localUserName.character === 'developer'"></Icon>
              <Icon type="android-bulb"
                    v-else-if="localUserName.character === 'productManager'"></Icon>
              <Icon type="coffee" v-else></Icon>
            </span>
            <!-- <span class="right-icon">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shejitu"
                      v-if="localUserName.character === 'designer'"></use>
                  <use xlink:href="#icon-daima"
                      v-else-if="localUserName.character === 'developer'"></use>
                  <use xlink:href="#icon-chanpin"
                      v-else-if="localUserName.character === 'productManager'"></use>
                  <use xlink:href="#icon-kafei" v-else></use>
              </svg>
            </span> -->
          </span>
      </Menu>
    </Affix>
  </div>
</template>
<style src="./index.less" lang="less"></style>
<script>
import { SelfBuildingSquareSpinner } from 'epic-spinners';
import { mapGetters } from 'vuex';

export default {
  name: 'layout',
  components: {
    SelfBuildingSquareSpinner,
  },
  data() {
    return {
      activePage: '',
      localUserName: {},
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
    }),
  },
  mounted() {
    this.localUserName = JSON.parse(localStorage.fontEndUserInfo);
  },
  methods: {
    loginOut() {
      this.$Modal.confirm({
        title: '退出',
        content: '<h2>确认退出？</h2>',
        onOk: () => {
          localStorage.setItem('demo-token', null); // 将token清空
          this.$router.push('/login');
        },
        onCancel: () => {
          console.log('点击了取消');
        },
      });
    },
    goToActivePage(key) {
      this.$router.push(`/${key}`);
    },
  },
};
</script>
