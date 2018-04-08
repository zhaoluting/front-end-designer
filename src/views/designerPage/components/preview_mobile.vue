<template>
    <section class="preview">
        <!-- 预览视图 -->
        <div ref="preview" class="preview-mobile">
            <previewProduct/>
        </div>
    </section>
</template>
<script>
import previewProduct from './preview_product';

export default {
  name: 'product',
  data() {
    return {};
  },
  components: {
    previewProduct,
  },
};
</script>
<style lang="less" scoped>
section {
    display: flex;
    justify-content: center;
    align-items: center;
}

.preview-mobile {
    width: 100%;
    height: 100vh;
    background-color: grey;
}
</style>
