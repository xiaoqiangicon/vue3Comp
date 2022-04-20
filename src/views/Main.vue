<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />
    <UploadVue 
      action="/upload" 
      :beforeUpload="beforeUpload"
      @file-uploaded="onFileUploaded"
      @file-uploaded-error="onFileUploadedError"
     >
      <template #loading>
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading</span>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" width="500" alt="">
      </template>
     </UploadVue>
    <LoaderVue v-if="!1" text="拼命加载中" background="rgba(0, 0, 0, .8)" />
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
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';

import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue';
import ValidateInputVue, { RulesProp } from '@/components/ValidateInput.vue';
import ValidateFormVue from '@/components/ValidateForm.vue';
import LoaderVue from '@/components/Loader.vue';
import createMessage from '@/hooks/createMessage';
import UploadVue from '@/components/Upload.vue'
import { createMemoryHistory } from 'vue-router';

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
    LoaderVue,
    UploadVue,
  },
  setup(props, context) {
    const store = useStore();
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const inputRef = ref<any>();
    const emailRules: RulesProp = [
      { type: 'required', message: '不能为空' },
      { type: 'email', message: '格式不正确' },
    ]
    let emailVal = ref('');
    let passVal = ref('')

    const onFormSubmit = (result: boolean) => {
      createMessage( 'hello', 'default',)
    }

    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg';

      if (!isJPG) {
        createMessage('类型错误', 'error');
      }
      return isJPG;
    }
    const onFileUploaded = () => {
      createMessage('上传图片', 'success')
    }
    const onFileUploadedError = () => {
      createMessage('出错了', 'error')
    }

    return { currentUser, emailRules, emailVal, onFormSubmit, inputRef, passVal, beforeUpload, onFileUploaded, onFileUploadedError }
  }
});
</script>
