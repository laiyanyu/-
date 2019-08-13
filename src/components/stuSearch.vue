<template>
    <div class="search-bar">
        <label for="search-word">关键字搜索：</label>
        <input type="text" id="search-word" v-model="keyWord">
        <button class="search-submit" id="search-submit" @click="search">搜索</button>
    </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
export default {
    data() {
        return {
            keyWord: ''
        }
    },
    methods: {
        search() {
            this.setKeyword(this.keyWord) //这个已经同步到哪里了，在异步方法中可以直接获取到，主要是获取列表那也要用到，不然翻页不准确
            if(this.keyWord == '') {
                this.getStuList()
            } else {
                this.searchStu()
            }
        },
        ...mapActions(['searchStu', 'getStuList']),
        ...mapMutations(['setKeyword'])
    }
}
</script>

