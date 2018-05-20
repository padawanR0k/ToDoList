<template>
  <div class="container">
  <h2>Todo List</h2>
  <div class="input-group" style="margin-bottom:10px;">
    <input type="text" class="form-control" placeholder="할일을 입력하세요">
    <span class="input-group-btn">
      <button class="btn btn-default" type="button" @click="addTodo($event.target.value)">추가</button>
    </span>
  </div>
  <ul class="list-group">
    <li class="list-group-item"  v-for="(todo, index) in todos">
      {{ todo.content }}
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
  </ul>
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
      ]
    }
  },
  mounted() {
    console.log('Component mounted.')
  },
  methods: {
    deleteTodo(index) {
      this.todos.splice(index,1);
    },
    addTodo(text) {
      this.todos = this.todos.concat(...{id: this.generateId(),
      content: text, complete: false})
    },
    generateId() {
      return Math.max(this.todos.map(item => item.id))
    }
  }
}
</script>
