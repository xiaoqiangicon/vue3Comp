<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4">
    <a class="navbar-brand" href="#">者也</a>
    <ul v-if="!user.isLogin">
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">登陆</a>
      </li>
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">注册</a>
      </li>
    </ul>
    <div v-else class="list-inline mb-0">
      <div class="list-inline-item">
        <dropdown :title="`你好 ${user.name}`">
          <DropdownItem>
            <a href="" class="dropdown-item">新建</a>
          </DropdownItem>
          <DropdownItem disabled>
            <a href="" class="dropdown-item">编辑</a>
          </DropdownItem>
          <DropdownItem>
            <a href="" class="dropdown-item">退出</a>
          </DropdownItem>
        </dropdown>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue';

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export default defineComponent({
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      require: true,
    }
  },
  components: {
    Dropdown,
    DropdownItem,
  }
})
</script>

<style lang="less" scoped>
.navbar {
  padding: 0 20px;
  background-color: transparent !important
}
</style>
