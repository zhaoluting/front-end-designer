<template src="./index.html"></template>
<style src="./index.less" lang="less"></style>
<script>
import colorPicker from '@/components/vue-color-picker/colorPicker';

export default {
  name: 'colorDialog',
  props: {
    color: Object,
    disabled: Boolean,
  },
  components: {
    colorPicker,
  },
  data() {
    return {
      pickColor: '#f00',
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  },
};
</script>
