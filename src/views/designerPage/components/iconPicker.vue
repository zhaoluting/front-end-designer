<!-- Muse-UI图标选择器 -->
<template>
    <Select v-model="iconName" filterable @input="change" placeholder="图标" size="small">
      <Option v-for="(icon,index) in thisTconList[iconType]" style="text-align: left;"
          :value="icon" :label="icon" :key="index">
        <span>
          <mu-icon :value="icon" v-if="iconType==='icon'"/>
          <Icon :type="icon" v-else></Icon>
          {{ icon }}
        </span>
      </Option>
    </Select>
</template>
<script>
/* eslint-disable */
import iconList from './iconList';
import ioniconList from './ioniconList';

export default {
  name: 'iconPicker',
  data() {
    return {
      iconName: this.value,
      thisTconList: {
        icon: iconList,
        ionicon: ioniconList,
      },
    };
  },
  mounted() {
  },
  props: {
    value: {
      default: {},
    },
    name: {
      default: '',
    },
    iconType: {
      default: 'icon',
    },
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.iconName = this.value;
      },
    },
  },
  methods: {
    change(value) {
      this.$emit('input', value);
      this.$emit('change', value);
    },
  },
};
</script>
<style scoped>
</style>
