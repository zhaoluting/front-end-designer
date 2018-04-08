import Vue from 'vue';
import Vuex from 'vuex';
import { getTemplate } from '@/views/designerPage/components/template/index.js';

Vue.use(Vuex);

const instance = {
  state: {
    userInfo: {},
    width: [{
      attr: '4',
      preview: '16',
      components: '4',
    }, {
      attr: '5',
      preview: '14',
      components: '5',
    }, {
      attr: '6',
      preview: '12',
      components: '6',
    }],
    css: '', // 用户编辑的自定义css字符串
    activeUI: 'iView-UI',
    currentComponent: {}, // 预览视图的选中组件
    components: [], // 预览视图的组件树
    backupComponents: [], // 删除组件时备份的
    copiedComponents: [], // 复制的组件
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setState(state, obj) {
      // obj = mergeDeep(JSON.parse(JSON.stringify(state)), obj)
      Object.assign(state, obj);
      // 保存本地
      localStorage.store = JSON.stringify(state);
    },
  },
  methods: {
  },
  actions: {
    delComponent(context, id) {
      // 删除前备份一份
      context.commit('setState', { backupComponents: JSON.parse(JSON.stringify(context.state.components)) });

      const components = context.state.components;
      let index = components.findIndex(c => c.info.id === id);
      const component = components[index];
      // 从父组件的slots中删除
      if (component.parentId) {
        const parent = components.find(c => c.info.id === component.parentId);
        const slot = parent.slots[component.slot || component.attributes.slot || 'default'];
        const i = slot.findIndex(item => item.id === component.info.id);
        // 删除
        slot.splice(i, 1);

        // 递归获取最父级组件
        const getTop = (_component) => {
          let result = _component;
          if (_component.parentId) {
            const c = components.find(cs => cs.info.id === _component.parentId);
            result = getTop(c);
          }
          return result;
        };

        // 更新模板
        const top = getTop(parent);
        top.template = getTemplate(top.info, top.attributes, top.slots).template;
      }
      // 删除当前组件所有子组件
      function delChildren(componentTemp) {
        const slots = componentTemp.slots;
        Object.keys(slots).forEach((slot) => {
          if (componentTemp.slots[slot].length) {
            componentTemp.slots[slot].forEach((val) => {
              const childIndex = components.findIndex(c => c.info.id === val.id);
              let hasChild;
              if (childIndex >= 0) {
                hasChild = Object.keys(components[childIndex].slots).every((s) => {
                  console.log();
                  return components[childIndex].slots[s].length > 0;
                });
              }
              if (hasChild) delChildren(components[childIndex]);
              components.splice(childIndex, 1);
            });
          }
        });
      }
      delChildren(component);

      // 删除自身
      index = components.findIndex(c => c.info.id === id);// components已被更新 重新获取索引
      components.splice(index, 1);

      // 更新
      context.commit('setState', { currentComponent: {}, components });

      return Promise.resolve(components);
    },
  },
  getters: {
    userInfo: state => state.userInfo,
  },
};

export default new Vuex.Store(instance);
