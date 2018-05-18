<template>
  <div>
    <div v-for="(c, index) in components" :key="index" style="margin-left: 10px;text-align: left;">
      <span @click="click(c.info.id)" class="check-item">
        <Icon @click.native="show=!show" :type="show?'arrow-down-b':'arrow-up-b'"
        style="vertical-align:middle;"></Icon>
        {{c.info.name}}
      </span>
      <transition-group name="list">
        <div v-for="(slot,key) in c.slots" v-show="show" :key="key">
          <componentTree :components="slotToComponents(c.slots[key])"
            v-if="Object.keys(c.slots).filter(slot=>c.slots[slot].length).length" />
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  name: 'componentTree',

  data() {
    return {
      show: true,
    };
  },
  props: {
    components: {
      type: Array,
      default: null,
    },
  },
  methods: {
    slotToComponents(slot) {
      return this.$store.state.components.filter(c =>
        slot.findIndex(item => item.id === c.info.id) !== -1);
    },
    click(id) {
      const el = document.getElementById(id);
      el.click();
    },
  },
};
</script>
<style lang="css" scoped>
.check-item {
    cursor: pointer;
    color: #CC5758;
    font-size: 13px;
    font-weight: 600;
    line-height: 20px;
}
.list-enter-active, .list-leave-active {
  transition: all .5s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
