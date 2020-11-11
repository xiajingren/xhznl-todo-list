<template>
  <div class="root" @click="add">
    <draggable
      class="list"
      v-model="todoList"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
      :disabled="editIndex !== -1"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <div
          class="item"
          v-for="(todo, index) in todoList"
          :key="'todo' + index"
          @dblclick.stop="done($event, index)"
          @click.stop="editing(index)"
        >
          <p v-if="index !== editIndex">{{ index + 1 }}.{{ todo.content }}</p>
          <div class="edit" v-else>
            <input
              v-model="todo.content"
              v-focus
              @click.stop="return false;"
              @keyup.27="cancel(index)"
              @keyup.13="edited"
              spellcheck="false"
            />
            <i class="iconfont icon-seleted" @click.stop="edited"></i>
            <i class="iconfont icon-close" @click.stop="clear(index)"></i>
          </div>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import CursorSpecialEffects from "../utils/fireworks";

export default {
  name: "Todo",
  components: {
    draggable,
  },
  data() {
    return {
      todoList: null,
      drag: false,
      editIndex: -1,
      tempItem: null,
      dblclick: false,
    };
  },
  methods: {
    getTodoList() {
      this.todoList = [
        {
          content: "This is an Todo page",
        },
        {
          content: "This is an Todo page",
        },
        {
          content: "This is an Todo page",
        },
        {
          content: "This is an Todo page",
        },
        {
          content: "This is an Todo page",
        },
        {
          content: "This is an Todo page",
        },
        {
          content: "This is an Todo page",
        },
        {
          content: "This is an Todo page",
        },
        {
          content: "This is an Todo page This is an Todo page",
        },
        {
          content: "This is an Todo page",
        },
      ];
    },
    add() {
      if (this.editIndex !== -1) {
        this.edited();
      }

      this.todoList.push({ content: "" });
      this.editIndex = this.todoList.length - 1;
    },
    editing(index) {
      setTimeout(() => {
        if (this.dblclick) {
          return;
        }

        if (this.editIndex !== -1) {
          this.edited();
        }

        this.tempItem = Object.assign({}, this.todoList[index]);

        this.editIndex = index;
      }, 220);
    },
    edited() {
      this.todoList = this.todoList.filter((p) => {
        return p.content;
      });
      this.editIndex = -1;
    },
    cancel(index) {
      this.$set(this.todoList, index, this.tempItem);
      this.editIndex = -1;
    },
    clear(index) {
      //this.todoList.splice(index, 1);
      //this.edited();
      this.$set(this.todoList, index, { content: "" });
    },
    done(event, index) {
      if (this.editIndex !== -1) {
        return;
      }

      this.dblclick = true;
      setTimeout(() => {
        this.dblclick = false;
      }, 500);

      console.log(index);
      CursorSpecialEffects.handleMouseDown(event);
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  created() {
    this.getTodoList();
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  padding: 0 15px 28px 15px;
  .list {
    .item {
      height: 28px;
      p {
        width: 100%;
        height: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
        user-select: none;
      }
      .edit {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: space-between;
        input {
          flex: 1;
          height: 100%;
          outline: none;
          border: none;
          background: transparent;
          font-size: 16px;
        }
        i {
          line-height: 28px;
          padding: 0 5px;
          cursor: pointer;
        }
      }
    }
    .item:hover {
      p {
        color: rgba($color: #ffffff, $alpha: 0.6);
      }
    }
  }
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
}
</style>
