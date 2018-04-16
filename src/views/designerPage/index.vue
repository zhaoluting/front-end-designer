<template>
  <div class="designer-page">
    <div class="page-head">
      <layout></layout>
      <span class="title-head">新建项目名</span>
      <span class="button-head">
        <Button class="buts" shape="circle" icon="android-share-alt"
          @click="share.open=true" type="primary"></Button>
        <Button class="buts" shape="circle" icon="android-settings"
          @click="setting.open=true" type="primary"></Button>
        <Button class="buts" shape="circle" icon="edit"
          @click="setting.open=true" type="primary"></Button>
        </span>
    </div>
    <Row class="page-content">
      <Col :span="width.attr" class="transition-part attributes-part">
        <div class="top-select">
          <p style="font-weight: 900;">
            <a class="parent-component" v-if="parentComponent" @click="switchComponent">
              ┡ {{parentComponent.info.name}}
            </a>
              {{current.info?' - '+current.info.name:''}}
          </p>
          <Radio-group v-model="selectField.value" type="button" size="small">
              <Radio label="属性"></Radio>
              <Radio label="组件树"></Radio>
          </Radio-group>
        </div>
        <attributes v-if="selectField.value==='属性'" style="margin: 15px 0 15px 10px;"/>
        <componentTree v-if="selectField.value==='组件树'"
            :components="$store.state.components.filter(c=>!c.parentId)" />
        <div class="attributes-bottom" v-if="current.info">
          <Button @click="openUiDocument" type="ghost">UI文档</Button>
          <Button @click="oprate" type="ghost">操作</Button>
        </div>
      </Col>
      <Col :span="width.preview" class="transition-part preview-part">
          <preview ref="preview"/>
      </Col>
      <Col :span="width.components" class="transition-part components-part">
          <components ref="components"/>
      </Col>
    </Row>
    <Modal v-model="setting.open" @on-cancel="setting.open=false" title="设置" scrollable>
      <Checkbox v-model="setting.selectEffect" @change="setSelectEffect">选中边框效果</Checkbox>
      <Button @click="setting.open=false" size="large" long slot="footer" type="primary">关闭</Button>
    </Modal>
    <Modal v-model="share.open" @on-cancel="share.open=false" title="分享当前布局" scrollable>
      <Button @click="createShare" v-if="!share.url" type="primary" size="small">点击生成</Button>
      <p style="margin-top:20px">
        分享地址：<Input style="width:400px;" size="small" v-model="share.url"></Input>
      </p>
      <p style="margin-top:20px">
        体验地址：<Input style="width:400px;" size="small" v-model="share.experience"></Input>
      </p>
      <Button @click="share.open=false" size="large" long slot="footer" type="primary">关闭</Button>
    </Modal>
  </div>
</template>
<script>
import layout from '@/components/layout/index';
import attributes from './components/attributes';
import components from './components/components';
import preview from './components/preview';
import componentTree from './components/componentTree.vue';

export default {
  name: 'designerPage',
  components: {
    layout,
    components,
    preview,
    attributes,
    componentTree,
  },
  data() {
    return {
      setting: {
        open: false,
        selectEffect: true,
      },
      share: {
        open: false,
        url: '',
        experience: '',
      },
      selectField: {
        value: '属性',
      },
    };
  },
  mounted() {
    this.setSelectEffect(this.setting.selectEffect);
  },
  computed: {
    current: { // 预览视图中选中的组件
      get() {
        return this.$store.state.currentComponent;
      },
    },
    width: { // 三栏的宽度设置
      get() {
        return this.$store.state.width[0];
      },
    },
    parentComponent: {
      get() {
        let component;
        if (this.current.parentId) {
          component = this.$store.state.components.find(c => c.info.id === this.current.parentId);
        } else component = null;
        return component;
      },
    },
    components: {
      get() {
        return this.$store.state.components;
      },
    },
  },
  watch: {
    components: {
      deep: true,
      handler(val, oldVal) {
        // 布局修改后将分享的url设为空
        this.share.url = '';
        this.share.experience = '';
        console.log(oldVal);
      },
    },
  },
  methods: {
    switchComponent() {
      const el = document.getElementById(this.parentComponent.info.id);
      el.click();
    },
    oprate(e) {
      // let components = await this.$store.dispatch('delComponent', this.current.info.id)
      // this.$refs.preview.fresh()
      this.$refs.preview.rightClick(e);
    },
    openUiDocument() {
      switch (this.current.info.ui) {
      case 'Muse-UI':
        return window.open(`http://www.muse-ui.org/#/${this.current.info.name.replace(' ', '')}`);
      case 'Mint-UI':
        return window.open(`https://mint-ui.github.io/docs/#/zh-cn/${this.current.info.name.replace(' ', '-')}`);
      case 'iView-UI':
        return window.open(`https://www.iviewui.com/components/${this.current.info.name}`);
      default:
        return this.$toast('无文档页');
      }
    },
    setSelectEffect(val) {
      const head = document.head;
      let style = document.getElementById('vue-layout-style');
      if (!style) {
        style = document.createElement('style');
        style.id = 'vue-layout-style';
        style.type = 'text/css';
        head.appendChild(style);
      }

      let cssText;
      if (val) {
        cssText = `[data-component-active="true"] {
                      box-shadow: inset 0px 0px 0px 1px pink!important;
                  }
                  [data-component-active]:hover {
                      box-shadow: inset 0px 0px 0px 1px pink!important;
                  }
                  [data-component-active]:focus {
                      box-shadow: inset 0px 0px 0px 1px pink!important;
                  }`;
      } else {
        cssText = `[data-component-active="true"] {
                      box-shadow: none;
                      outline:none;
                  }
                  [data-component-active]:hover {
                      box-shadow: none;
                  }
                  [data-component-active]:focus {
                      box-shadow: none;
                  }`;
      }
      const textNode = document.createTextNode(cssText);
      style.innerHTML = '';
      style.appendChild(textNode);
    },
    createShare() {
      const share = new this.$lean.Object('Share');
      share.set('store', this.$store.state);
      share.save().then((res) => {
        this.share.url = `${location.origin}${location.pathname}#/share/${res.id}`;
        this.share.experience = `${location.origin}${location.pathname}#/preview/pc/${res.id}`;
      });
    },
  },
};
</script>
<style lang="less">
.designer-page {
  display: block;
  height: 100vh;
  overflow: auto;
  background: #ffffff;
  .parent-component {
    cursor: pointer;
  }
  .transition-part {
    transition: all .5s;
  }
  .top-select {
      height: 36px;
      margin-bottom: 15px;
      padding-top: 6px;
      span {
          white-space: nowrap;
          font-weight: 900;
          color: #ce5655;
      }
  }
  .page-head {
    .title-head {
      position: fixed;
      top: 0px;
      left: 150px;
      z-index: 999;
      font-size: 12px;
      color: #fff;
      margin: 25px 8px 0px 25px;
      padding: 2px 8px;
      border: #fff solid 1px;
      border-radius: 5px;
    }
    .button-head {
      position: fixed;
      top: 0px;
      right: 200px;
      z-index: 999;
      .buts {
        float: right;
        margin: 17px 5px 0 0;
      }
    }
  }
  .page-content {
    margin-top: 10px;
    .preview-part {
      border: solid #ce5655 1px;
    }
    .components-part {
      height: 85vh;
      overflow: auto;
    }
    .attributes-part {
      height: 85vh;
      overflow: auto;
      .attributes-bottom {
        margin-top: 15px;
      }
    }
  }
}
</style>
