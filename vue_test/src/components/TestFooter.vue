<template>
  <div class="todo-footer" v-show="total">
          <label>
            <input type="checkbox" v-model="isAll"/>
          </label>
          <span> <span>已完成{{todoDone}}</span> / {{total}} </span>
          <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
        </div>
</template>

<script>
export default {
name:"TestFooter",
props:["todos","clearAllTodos"],
computed:{
    total(){
    return this.todos.length
    },
    todoDone(){
    let i = 0
    this.todos.forEach((todo)=>{
      if (todo.done == true) i++
    })
    return i
    },
    isAll:{
    get(){
       return this.total === this.todoDone && this.todoDone > 0
    },
    set(value){
      this.$emit('checkAllTodos',value)
    }
    }
  },
  methods:{
    clearAll(){
      this.clearAllTodos()
    }
  }
}
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>