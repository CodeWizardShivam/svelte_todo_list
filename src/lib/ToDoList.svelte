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
      {#if toDos.length == 0}
        <p class="state-text">No To Dos Yet.</p>
      {/if}
      <ul style="text-align: left;">
        {#each toDos as { id, title, completed } (id)}
          {@const toDo = { id, title, completed }}
          <li class={completed ? "complete" : "not-complete"}>
            <slot {toDo}>
              <label class="lable-text">
                <input
                  on:input={(event) => {
                    event.currentTarget.checked = toDo.completed;
                    handleToggleTodo(toDo.id, !toDo.completed);
                  }}
                  type="checkbox"
                  checked={toDo.completed}
                />
                {toDo.title}
              </label>
              <button
                class="remove-todo-button"
                aria-label={toDo.title}
                on:click={() => handleRemove(toDo.id)}
              >
                <span style:width="10px" style:display="inline-block"
                  ><FaRegTrashAlt /></span
                ></button
              >
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

<style lang="scss">
  .todo-add {
    display: inline;
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
        align-items: center;
        margin-bottom: 5px;
        background-color: #303030;
        padding: 10px;
        color: white;

        &.complete {
          opacity: 0.5;
          text-decoration: line-through;
        }
        .lable-text {
          flex: 1;

          cursor: pointer;
          flex: 1;

          input {
            cursor: pointer;
            margin: 0 20 0 0;
          }
        }
        .remove-todo-button {
          border: none;
          background: none;
          padding: 5px;
          cursor: pointer;
          margin-left: 10px;
          align-items: baseline;
          color: white;
        }
      }
    }
  }
  .state-text {
    color: white;
  }
</style>
