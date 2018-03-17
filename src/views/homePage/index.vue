<template>
  <div>
    <layout></layout>
    <h1 class="fc-primary">可视化</h1>
  </div>
</template>
<script>
import layout from '@/components/layout/index';

export default {
  name: 'login',
  components: {
    layout,
  },
  data() {
    return {
    };
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
