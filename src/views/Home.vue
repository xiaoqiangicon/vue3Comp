<template>
  <div class="home">
    <Suspense>
      <template #default>
        <div>
          <async-show />
          <dog-show />
        </div>
      </template>
      <template #fallback>
        <h1>loading!...</h1>
      </template>
    </Suspense>
    <div>{{error}}</div>
  </div>
</template>

<script lang="ts">
// defineComponet是一个函数，没什么作用，专门为了支持ts出现的。
import { defineComponent, onErrorCaptured, ref, } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src 
import AsyncShow from '@/components/AsyncShow.vue';
import DogShow from '@/components/DogShow.vue';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
    AsyncShow,
    DogShow,
  },
  props: {
    msg: {
      type: String
    }
  },
  setup(props, context) {
    const error = ref(null);
    onErrorCaptured((e: any) => {
      error.value = e;
      return true;
    })

    return { error }
  }
});
</script>
