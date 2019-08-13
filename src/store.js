import Vue from 'vue'
import Vuex from 'vuex'
import api from './api.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stuList: [], //
    page: 1,
    size: 5,
    showModel: false, //stuTable 和 stuList 组件要共用这个数据
    editUser: {},//编辑一个学生的对象
    total: 0, //总共的条数
    keyWord: ''
  },
  mutations: {
    // this.$store.commit('setStuList')
    setStuList(state, list) {
      state.stuList = list
    },
    //stuTable 和 stuList 组件要共用这个数据
    setShowModel(state, bool) {
      state.showModel = bool
    },
    //编辑一个学生的对象
    setEditUser(state, user = {}) {
      state.editUser = user
    },
    setTotal(state, cont) {
      state.total = cont
    },
    setKeyword(state, word='') {
      state.keyWord = word
    }
  },
  actions: {
    getStuList({commit, state, dispatch}, page = 1) {
      if(state.keyWord !== '') {
        dispatch('searchStu', page)
      } else {
        return api
        .findByPage(page)
        .then(data => {
           commit('setStuList', data.data.data.findByPage)
           commit('setTotal', data.data.data.cont) //还要保存多少条数据
        })
        .catch(err => console.log(err))
      }
    },
    updateStu({commit, state}, data) {
      return api
        .updateStu(data)
        .then(msg => {
          if(msg.data.status == 'success') {
            Object.assign(state.editUser, data) //修改完成后，列表上的数据也要变动，手动合并，减少了一次请求，不推荐
            commit('setShowModel',false) //关闭遮罩层
            commit('setEditUser') //请空这个对象
            return msg.data.msg
          } else {
            return Promise.reject(msg.data.msg)
          }
        })
    },
    delBySno({dispatch}, sNo) {
      api
        .delBySno(sNo)
        .then(() => {
          dispatch('getStuList')//要重新获取数据
          alert('删除成功')
        })
    },
    searchStu({state, commit}, page) {
      api
        .stuSearch(state.keyWord, page) 
        .then(data => {
          commit('setTotal', data.data.data.cont)
          commit('setStuList', data.data.data.searchList)
        })
    }
  }
})
