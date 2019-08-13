<template>
     <ul id="turn-page">
        <li v-if="nowPage > 1" @click="turnPage(-1)">上一页</li> <!--4. 当大于1的时候才可以有上一页这个按钮 -->
        <li v-if="nowPage>3" @click="turnPage(1)"> 1</li><!-- 2. nowPage大于4才有这个按钮，因为下面v-for那里已经有了，再写就多此一举了  -->
        <li v-if="nowPage>4">...</li><!-- 1. nowPage大于4才有...这个按钮  -->
        
        <!-- 3.下面的v-if必须保证页数大于0并且小于总页数  -->
        <li 
            v-for="i in 5" 
            :key="i" 
            :class="{'cur-page': i==3}" 
            v-if="nowPage + i - 3 > 0 && nowPage + i - 3 <= totalPage" 
            @click="turnPage(nowPage + i - 3)">
            {{nowPage + i - 3}}
        </li>
        <li v-if="totalPage-4>=nowPage">...</li>
        <li v-if="totalPage-3>=nowPage"  @click="turnPage(totalPage)">{{totalPage}}</li>
        <li v-if="nowPage < totalPage" @click="turnPage(0)">
            下一页
        </li>
    </ul>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
    data() {
        return {
            nowPage: 1
        }
    },
    created(){
        console.log(this.$store.state.total+"-----");
    },
    methods: {
        turnPage(pageNum) {
            console.log(this.$store.state.total);
            console.log(this.totalPage);
            if(pageNum == 0) {
                if(this.nowPage < this.totalPage) {
                    this.nowPage ++
                }
            } else if (pageNum == -1) {
                if(this.nowPage>1) {
                    this.nowPage --
                }
            } else {
                this.nowPage = pageNum
            }
            this.getStuList(this.nowPage)
        },
        ...mapActions(['getStuList'])
    },
    computed: {
        ...mapState({
            totalPage: state => Math.ceil( +state.total / state.size), //根据总条数向上取整获取总页数
            keyWord: state => state.keyWord
        })
    },
    watch: {
        keyWord() {
            this.nowPage = 1
        }
    }
}
</script>
