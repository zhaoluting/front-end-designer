<template>
  <div class="layout">
    <Affix class="layout-top">
      <Menu mode="horizontal" theme="primary" active-name="1">
          <div class="layout-logo">
            <Icon type="ios-flower-outline"></Icon>
          </div>
          <div class="layout-nav">
              <Menu-item name="1">
                <Icon type="aperture"></Icon>
                  色盘分享
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
      </Menu>
    </Affix>
      <div class="layout-content">
          内容区域
      </div>
      <div class="layout-copy">
          2011-2016 &copy; TalkingData
      </div>
  </div>
</template>
<style src="./index.less" lang="less"></style>
<script>
export default {
  name: 'layout',
};
</script>
