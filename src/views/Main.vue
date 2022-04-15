<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />
    <div class="mb-3">
      <ValidateInputVue v-model="emailVal" :rules="emailRules" />
      {{ emailVal }}
    </div>
  </div>
</template>

<script lang="ts">
// defineComponet是一个函数，没什么作用，专门为了支持ts出现的。
import { defineComponent, reactive, ref } from 'vue';

import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue';
import ValidateInputVue, { RulesProp } from '@/components/ValidateInput.vue';
const currentUser: UserProps = {
  isLogin: true,
  name: 'Lee'
}
let emailReg = /^[a-zA-Z0-9]/;
export default defineComponent({
  name: 'Main',
  components: {
    GlobalHeader,
    ValidateInputVue,
  },
  props: {
    
  },
  setup(props, context) {
    const emailRules: RulesProp = [
      { type: 'required', message: '不能为空' },
      { type: 'email', message: '格式不正确' },
    ]
    let emailVal = ref('1234');

    return { currentUser, emailRules, emailVal }
  }
});
</script>
