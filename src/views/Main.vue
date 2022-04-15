<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />
    <div class="mb-3">
      <ValidateFormVue @form-submit="onFormSubmit">
        <ValidateInputVue 
          v-model="emailVal" 
          :rules="emailRules" 
          placeholder="hello there" 
          ref="inputRef"
        />
        <ValidateInputVue 
          v-model="passVal" 
          :rules="emailRules" 
          placeholder="hello there"
        />
        <template #submit>
          <span class="btn btn-danger">submit</span>
        </template>
      </ValidateFormVue>
      
    </div>
  </div>
</template>

<script lang="ts">
// defineComponet是一个函数，没什么作用，专门为了支持ts出现的。
import { defineComponent, reactive, ref } from 'vue';

import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue';
import ValidateInputVue, { RulesProp } from '@/components/ValidateInput.vue';
import ValidateFormVue from '@/components/ValidateForm.vue';

const currentUser: UserProps = {
  isLogin: true,
  name: 'Lee'
}

export default defineComponent({
  name: 'Main',
  components: {
    GlobalHeader,
    ValidateInputVue,
    ValidateFormVue,
  },
  setup(props, context) {
    const inputRef = ref<any>();
    const emailRules: RulesProp = [
      { type: 'required', message: '不能为空' },
      { type: 'email', message: '格式不正确' },
    ]
    let emailVal = ref('');
    let passVal = ref('')

    const onFormSubmit = (result: boolean) => {
      console.log('1234',inputRef.value.validateInput(), result)
    }
    return { currentUser, emailRules, emailVal, onFormSubmit, inputRef }
  }
});
</script>
