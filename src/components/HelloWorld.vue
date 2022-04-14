<template>
  <div class="hello">
    {{msg}}
    <button @click="handleClickButton">button</button>
    <span>{{x}}, {{y}}</span>
    <h1 v-if="loading">正在loading</h1>
    <img v-if="loaded" :src="result.message" />
  </div>
</template>

<script lang="ts">
interface dataProps {
  
}
import { onMounted, ref, onRenderTriggered, watch, onUnmounted  } from 'vue';
import useMousePosition from '../hooks/useMousePosition';
import useURLLoader from '../hooks/useURLLoader';

interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default {
  name: 'HelloWorld',
  setup() {
    let msg = ref(0);
    let handleClickButton = (newVal: number, oldVal: number) => {
      msg.value = msg.value + 1;
    }
    

    const { result, loading, loaded } = useURLLoader<DogResult>('https://dog.ceo/api/breeds/image/random');

    watch(result, () => {
      if (result.value) {
        console.log('value', result.value.message)
      }
    })
    
    const {x, y} = useMousePosition();
    return { msg, handleClickButton, x, y, result, loading, loaded }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
