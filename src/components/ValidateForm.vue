<template>
  <form action="" class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt';

type Events = {
  formItemCreated: string;
}
export const emitter = mitt<Events>();
type ValidateFunc = () => boolean;

export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    let funcArr:ValidateFunc[] = [];
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }

    const callback = (func: ValidateFunc) => {
      funcArr.push(func);
    }
    emitter.on('formItemCreated', callback as any)
    onUnmounted(() => {
      emitter.off('formItemCreated', callback as any);
      funcArr = [];
    })
    return { submitForm }
  },
})
</script>

<style lang="less" scoped>

</style>
