<template>
   <div class="student-list content">
        <stu-search></stu-search>
        <stu-table></stu-table>
        <turn-page></turn-page> 
        <model v-if="showModel"></model>             
          <!-- <div class="model">
                    <div class="mask"></div>
                    <div class="model-content">
                        <h3>编辑信息</h3>
                        <form id="editStudentForm">
                            <div>
                                <label for="name">姓名</label>
                                <input type="text" name="name">
                            </div>
                            <div class="sex">
                                <label for="sex">性别</label>
                                <input type="radio" name="sex" value="0" checked>
                                <span>男</span>
                                <input type="radio" name="sex" value="1">
                                <span>女</span>
                            </div>
                            <div>
                                <label for="sNo">学号</label>
                                <input type="text" name="sNo">
                            </div>
                            <div>
                                <label for="email">邮箱</label>
                                <input type="text" name="email">
                            </div>
                            <div>
                                <label for="birth">出生年</label>
                                <input type="text" name="birth">
                            </div>
                            <div>
                                <label for="phone">手机号</label>
                                <input type="text" name="phone">
                            </div>
                            <div>
                                <label for="address">住址</label>
                                <input type="text" name="address">
                            </div>
                            <div>
                                <label for=""></label>
                                <input type="submit" class="btn" id="edit-submit" value="提交">
                                <input type="reset" class="btn" value="重置">
                            </div>
                        </form>
                    </div>
                </div> -->
   
     
    </div>
</template>

<script>
import stuSearch from '../components/stuSearch.vue'
import stuTable from '../components/stuTable.vue'
import turnPage from '../components/turnPage.vue'
import model from '../components/model.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    components: {
        stuSearch,
        stuTable,
        turnPage,
        model
    },
    //属性就放在计算属性中
    computed: {
        ...mapState(['showModel']) //获取遮罩层的值判断是否显示遮罩层
    }
}
</script>
