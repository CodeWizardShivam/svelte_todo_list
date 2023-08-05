<script>
  import { createEventDispatcher } from "svelte";
  import FaRegTrashAlt from "svelte-icons/fa/FaRegTrashAlt.svelte";

  export let toDos = null;
  export let error = null;
  export let isLoading = null;
  let inp;
  let checked;

  const dispatch = createEventDispatcher();
  console.table(toDos);

  function handleRemove(id) {
    console.log("In handleRemove:" + id);
    dispatch("RemoveTodo", { id });
  }

  function handleToggleTodo(id, completed) {
    console.log("In handleToggleTodo:" + id);

    dispatch("ToggleTodo", { id, completed });
  }
  function handleAddTodo() {
    dispatch("AddTodo", { inp });
  }
</script>

<div class="ToDoList-wrapper">
  <div class="todolist">
    {#if isLoading}
      <p class="state-text">Loading...</p>
    {:else if error}
      <p class="state-text">{error}</p>
    {:else if toDos}
      <ul style="text-align: left;">
        {#each toDos as { id, title, completed } (id)}
          {@const toDo = { id, title, completed }}
          <li class={completed ? "complete" : "not-complete"}>
            <slot {toDo}>
              <label>
                <input
                  on:input={(event) => {
                    event.currentTarget.checked = toDo.completed;
                    handleToggleTodo(toDo.id, !toDo.completed);
                  }}
                  type="checkbox"
                  checked={toDo.completed}
                />
                {toDo.title}

                <button
                  class="remove-todo-button"
                  aria-label={toDo.title}
                  on:click={() => handleRemove(toDo.id)}
                >
                  <span style:width="10px" style:display="inline-block"
                    ><FaRegTrashAlt /></span
                  ></button
                >
              </label>
            </slot>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <form class="todo-add" action="" on:submit|preventDefault={handleAddTodo}>
    <input bind:value={inp} />
  </form>
  <button
    class="todo-add"
    style={"background-color:red; color:white;"}
    on:click={() => {
      handleAddTodo();
    }}>Add</button
  >
</div>

<!-- <style lang="scss">
  .ToDoList-wrapper {
    background-color: #424242;
    border: 1px solid #4b4b4b;
    .state-text {
      margin: 0;
      padding: 15px;
      text-align: center;
    }
    .todolist {
      max-height: 200px;
      overflow: auto;
      ul {
        margin: 0;
        padding: 10px;
        list-style: none;
        li > div {
        
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          background-color: #303030;
          border-radius: 5px;
          padding: 10px;
          position: relative;
          label {
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: baseline;
            padding-right: 20px;

            input[type="checkbox"] {
              margin: 0 10px 0 0;
              cursor: pointer;
            }
          }
          &.completed > label {
            opacity: 0.5;
            text-decoration: line-through;
          }
          .remove-todo-button {
            border: none;
            background: none;
            padding: 5px;
            position: absolute;
            right: 10px;
            cursor: pointer;
            display: none;
            &:disabled {
              opacity: 0.4;
              cursor: not-allowed;
            }
            :global(svg) {
              fill: #bd1414;
            }
          }
          &:hover {
            .remove-todo-button {
              display: block;
            }
          }
        }
      }
    }
    .add-todo-form {
      padding: 15px;
      background-color: #303030;
      display: flex;
      flex-wrap: wrap;
      border-top: 1px solid #4b4b4b;
      // :global(.add-todo-button) {
      //   background-color: aqua;
      // }
      input {
        flex: 1;
        background-color: #424242;
        border: 1px solid #4b4b4b;
        padding: 10px;
        color: #fff;
        border-radius: 5px;
        margin-right: 10px;
      }
    }
  }
</style> -->

<style lang="scss">
  .todo-add {
    display: inline;

    /* background-color: red; */
  }

  .ToDoList-wrapper {
    background-color: #424242;
    border: 1px solid #4b4b4b;
  }
  .todolist {
    max-width: 400px;
    ul {
      margin: 0px;
      padding: 10px;

      li {
        display: flex;
        margin-bottom: 5px;
        background-color: #303030;
        padding: 10px;
        color: white;
        lable {
          input {
            cursor: progress;
            margin: 0 20 0 0;
          }
          cursor: progress;

          display: flex;
          align-items: baseline;
        }
        &.complete {
          opacity: 0.5;
          text-decoration: line-through;
        }
      }
    }
  }
</style>
