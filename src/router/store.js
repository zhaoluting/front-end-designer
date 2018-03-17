import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const instance = {
  state: {
    userInfo: {
      a: 'aa',
    },
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  methods: {
  },
  actions: {
  },
  getters: {
    userInfo: state => state.userInfo,
  },
};

export default new Vuex.Store(instance);
