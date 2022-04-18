import { createStore } from 'vuex'
import axios from 'axios';

interface UserProps {
  isLogin: true;
  name?: 'Lee';
  id?: number;
}
export default createStore({
  state: {
    user: { isLogin: false },
    columns: []
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, }
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list;
    }
  },
  getters: {
    bigger(state) {
      return state.user.isLogin
    }
  },
  actions: {
    fetchColumns(context) {
      axios.get('/columns').then(resp => {
        context.commit('fetchColumns', resp.data)
      })
    }
  },
  modules: {
  }
})
