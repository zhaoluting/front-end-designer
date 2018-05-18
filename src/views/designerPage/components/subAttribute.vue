<template>
  <div style="padding-left:10px;">
    <!-- 组件的attributes中包含了组件的属性，如：
          attributes = {
            label: {
                type:'text',
                value:'按钮'
            }
        }-->
    <div v-if="attr" v-for="(v,k,i) in attr" :key="i"
        style="margin-right: 8px;margin-bottom: 5px;text-align: left">
        <h3 style="color: #828282;margin-top: 10px;margin-bottom: 5px;">{{k}}</h3>
      <!-- 文本型（text）属性 -->
      <Input v-if="v.type==='text'" v-model="v.value" @on-change="updateAttribute" size="small"/>
      <!-- 数字型（number）属性 -->
      <Input-number v-if="v.type==='number'" v-model="v.value"
        @on-change="updateAttribute" size="small"/>
      <!-- 滑块型 -->
      <small v-if="v.type==='slider'">{{k+': '+v.value}}</small>
      <Slider v-if="v.type==='slider'" v-model="v.value"
        :step="v.step" :max="v.max" :min="v.min" @mouseup.native="updateAttribute" />
      <!--  标签型（label）属性  -->
      <div v-if="v.type==='label'" class="mu-text-field-label">{{v.value}}</div>
      <!--  开关（boolean）属性   -->
      <i-switch v-if="v.type==='boolean'" v-model="v.value" @on-change="updateAttribute"/>
      <!--  选择型 (selection) 属性  -->
      <Select v-if="v.type==='selection'" v-model="v.value" clearable
          @on-change="updateAttribute" size="small">
          <Option v-for="(item,index) in v.items" :value="item" :key="index">{{item}}</Option>
      </Select>
      <!-- 图标型 (icon) 属性 -->
      <iconPicker v-if="v.type==='icon' || v.type==='ionicon'" @change="updateAttribute"
            v-model="v.value" :name="k" :iconType="v.type"/>
      <!-- 颜色型 (color) 属性 -->
      <colorPicker style="z-index: 9;" v-if="v.type==='color'"
          @change="updateAttribute" v-model="v.value" :name="k"/>
      <!-- 子属性 -->
      <subAttributes v-if="v.children" :keyOfAttr="k" :attributes="v.children"
        @update="subUpdate" />
    </div>
  </div>
</template>
<script>
import colorPicker from '@/components/vue-color-picker/colorPicker';
import iconPicker from './iconPicker';

export default {
  name: 'subAttributes',
  components: {
    iconPicker,
    colorPicker,
  },
  data() {
    return {
      attr: {},
    };
  },
  props: {
    attributes: {
      type: Object,
      default: null,
    },
    keyOfAttr: {
      type: String,
      default: null,
    },
  },
  created() {
    this.attr = JSON.parse(JSON.stringify(this.attributes));
  },
  watch: {
    attributes: {
      deep: true,
      handler(val) {
        this.attr = JSON.parse(JSON.stringify(val));
      },
    },
  },
  methods: {
    subUpdate(attr) { // 收到了子组件的更新
      Object.assign(this.attr, attr);
      this.updateAttribute();
    },
    updateAttribute() { // 提交更新到父组件
      if (this.keyOfAttr) {
        this.$emit('update', {
          [this.keyOfAttr]: {
            children: this.attr,
          },
        });
      } else this.$emit('update', this.attr);
    },
  },
};
</script>
