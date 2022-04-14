<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />
  </div>
</template>

<script lang="ts">
// defineComponet是一个函数，没什么作用，专门为了支持ts出现的。
import { defineComponent, } from 'vue';

import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue';

const currentUser: UserProps = {
  isLogin: true,
  name: 'Lee'
}

export default defineComponent({
  name: 'Main',
  components: {
    GlobalHeader,
  },
  props: {
    
  },
  setup(props, context) {
    

    return { currentUser }
  }
});
</script>
