<template>
  <div class="model">
    <div class="mask" @click="setShowModel(false)"></div>
    <div class="model-content">
      <h3>编辑信息</h3>
      <form id="editStudentForm">
        <div>
          <label for="name">姓名</label>
          <input type="text" name="name" ref="name" :value="editUser.name" @input="updateUser('name', $event.target.value)">
        </div>
        <div class="sex">
          <label for="sex">性别</label>
          <input type="radio" name="sex"  ref="sex" value="0" :checked="editUser.sex == 0" @change="updateUser('sex',0)">
          <span>男</span>
          <input type="radio" name="sex" value="1" :checked="editUser.sex == 1" @change="updateUser('sex',1)">
          <span>女</span>
        </div>
        <div>
          <label for="sNo">学号</label>
          <input type="text" name="sNo" ref="sNo" :value="editUser.sNo" @input="updateUser('sNo', $event.target.value)">
        </div>
        <div>
          <label for="email">邮箱</label>
          <input type="text" name="email" ref="email" :value="editUser.email" @input="updateUser('email', $event.target.value)">
        </div>
        <div>
          <label for="birth">出生年</label>
          <input type="text" name="birth" ref="birth" :value="editUser.birth" @input="updateUser('birth', $event.target.value)">
        </div>
        <div>
          <label for="phone">手机号</label>
          <input type="text" name="phone" ref="phone" :value="editUser.phone" @input="updateUser('phone', $event.target.value)">
        </div>
        <div>
          <label for="address">住址</label>
          <input type="text" name="address" ref="address" :value="editUser.address" @input="updateUser('address', $event.target.value)">
        </div>
        <div>
          <label for></label>
          <input type="button" class="btn" id="edit-submit" value="提交" @click="submit">
          <input type="button" class="btn" value="重置"  @click="reset">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            user: {} //把修改的内容都放到这个对象中
        }
    },
    methods: {
        //编辑对象，要把修改的值存起来
        updateUser(key, value) {            
           console.log()
           //this.user[key] = value
        },
        submit() {
          //把原来的对象和修改后的对象合并就是修改后的对象了，要 作为参数给接口
            let user = Object.assign({}, this.editUser, this.user )
            this.updateStu(user)
                .then(msg => {
                    alert(msg)
                })
                .catch(errMsg => {
                    alert(errMsg)
                })
        },
        reset() {
            
            //利用ref重置 ，然后整个对象也要等于 重置后的对象
            for(let prop in this.$refs) {
                if(prop != 'sex') {
                    this.user[prop] = this.$refs[prop].value = ''
                }
            }
            this.$refs.sex.checked = true //页面要显示为男的
            this.user.sex = 0 //数据要跟上
        },
        ...mapMutations(['setShowModel']),
        ...mapActions(['updateStu'])
    },
    computed: {
        ...mapState(['editUser']) //不能用v-model绑定到页面，因为如果一改了，仓库的东西也会跟着更改，没点提交按钮前是不做更改的
        //通过 :vaule和 :checked来给表单元素  绑定数据  
        //通过  @input 和 @change 来获取表单数据  获取数据
        //  $event 是vue的全局事件对象
    }
}
</script>

