<template>
  <div class="container">
  <h2>Todo List</h2>
  <div class="input-group col-xs-12" style="margin-bottom:10px;">
    <input type="text" class="form-control form-inline" placeholder="할일을 입력하세요" v-model="message" v-on:keyup.enter="addTodo(message)">
  </div>
  <div class="input-group" style="margin-bottom:10px;">
    <div class="input-group-btn">
      <button class="btn btn-default" type="button" @click="addTodo(message)">추가</button>
      <button class="btn btn-default" type="button" @click="deleteCheckedTodo()">선택삭제</button>
      <button class="btn btn-default" type="button" @click="checkAll()">전체선택</button>
      <button class="btn btn-default" type="button" @click="unCheckAll()">전체해제</button>
    </div>
  </div>
  <div class="num">
    체크된 리스트 갯수 : {{ this.checkedTodos() }}
  </div>
    <transition-group name="list" tag="ul" class="list-group">
      <li class="list-group-item"  v-for="(todo, index) in todos" :key="todo.id">
        <input type="checkbox" name="" v-bind:id="index" v-bind:checked="todo.complete" @click="toggleChecked(index)">
        <label v-bind:for="index">
          {{ todo.content }}
        </label>
        <div class="btn-group pull-right" style="font-size: 12px; line-height: 1;">
          <button type="button" class="btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            더보기<span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li>
              <a href="#" @click="deleteTodo(index)">삭제</a>
            </li>
          </ul>
        </div>
      </li>
    </transition-group>
  {{todos}}
</div>
</template>

<script>
export default {
  data () {
    return {
      todos: [
        {id: 1, content: '라면 끓이기', complete: false},
        {id: 2, content: '물 올리기', complete: false},
        {id: 3, content: '스프넣기', complete: false}
      ],
      message: null,
      checkedTodos: function () {
        return (this.todos.filter(todo => todo.complete)).length
      }
    }
  },
  mounted() {
    console.log('Component mounted.')
  },
  methods: {
    deleteTodo(index) {
      this.todos.splice(index,1)
    },
    addTodo(text) {
      if(text === null) return false
      const newTodo = {id: this.generateId(), content: text, complete: false}
      this.todos = this.todos.concat(newTodo)
      this.message = null
    },
    generateId() {
      return this.todos.length === 0 ? 1 : Math.max(...this.todos.map(item => item.id)) + 1
    },
    toggleChecked(index) {
      this.todos[index].complete = !this.todos[index].complete
    },
    deleteCheckedTodo() {
      this.todos = this.todos.filter(function(todo) {
        return !todo.complete
      })
    },
    checkAll() {
      this.todos.forEach(todo => todo.complete = true)
    },
    unCheckAll() {
      this.todos.forEach(todo => todo.complete = false)
    }
  }
}
</script>
<style scoped>
.list-enter, .list-leave-to {
  opacity: 0;
}
.list-enter {
  transform: translateX(-300px);
}
.list-leave-to {
  transform: translateX(300px);
}
.list-enter-active, .list-leave-active {
  transition: all .5s;
}
.list-move{
  transition: transform 1s;
}
</style>
