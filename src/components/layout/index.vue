<template>
  <div class="layout">
    <Affix class="layout-top">
      <Menu mode="horizontal" theme="primary" active-name="1">
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
              <Menu-item name="1">
                <Icon type="aperture" class="rotate-icon"></Icon>
                  色盘共享
              </Menu-item>
              <Menu-item name="2">
                <Icon type="easel"></Icon>
                  设计台
              </Menu-item>
              <Menu-item name="3">
                <Icon type="person"></Icon>
                  个人中心
              </Menu-item>
          </div>
          <Button type="primary" @click="test">登录</Button>
      </Menu>
    </Affix>
  </div>
</template>
<style src="./index.less" lang="less"></style>
<script>
import { SelfBuildingSquareSpinner } from 'epic-spinners';

export default {
  name: 'layout',
  components: {
    SelfBuildingSquareSpinner,
  },
  methods: {
    test() {
      this.$http.get('/color/getAllColorDisk').then((res) => { // axios返回的数据都在res.data里
        console.log(res);
      });
    },
  },
};
</script>
