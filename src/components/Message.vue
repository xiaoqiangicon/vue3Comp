<template>
  <teleport to="#message">
    <div class="alert message-info fixed-top w-50 mx-auto justify-content-between" role="alert" :class="classObject" v-if="isVisible">
      <strong>{{message}}</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click.prevent="hide">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, onUnmounted, ref } from 'vue'
import useDOMCreate from '../hooks/useDOMCreate';

export type MessageType = 'success' | 'error' | 'default'
export default defineComponent({
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  }, 
  emits: ['close-message'],
  setup(props, context) {
    useDOMCreate('message');

    const isVisible = ref(true);
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default',
    }
    const hide = () => {
      isVisible.value = false;
      context.emit('close-message', true);
    }

    return {
      classObject, hide, isVisible
    }
  }
})
</script>

<style lang="less" scoped>
.close {
  background: none;
  border: none;
  outline: none;
}
</style>
