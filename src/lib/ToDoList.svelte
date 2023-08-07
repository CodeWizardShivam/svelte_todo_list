<script>
  import { createEventDispatcher } from "svelte";
  import FaRegTrashAlt from "svelte-icons/fa/FaRegTrashAlt.svelte";
  import { onMount, tick } from 'svelte';
  import { afterUpdate } from 'svelte';


  export let toDos = null;
  export let error = null;
  export let isLoading = null;
  let inp;
  let checked;
  let element_ul;
  const dispatch = createEventDispatcher();
  console.table(toDos);
  // afterUpdate(()=>{

  //   element_ul.scroll({ top: element_ul.scrollHeight, behavior: "smooth" });
   
  // });
  // onMount(()=>{

  //   element_ul.scroll({ top: element_ul.scrollHeight, behavior: "smooth" });
   
  // });

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
    <h1>Svelte Todo</h1>
    {#if isLoading}
      <p class="state-text">Loading...</p>
    {:else if error}
      <p class="state-text">{error}</p>
    {:else if toDos}
      {#if toDos.length == 0}
        <p class="state-text">No To Dos Yet.</p>
      {/if}
      <ul bind:this={element_ul}>
        {#each toDos as toDo}
          <li class={toDo.completed ? "complete" : "not-complete"}>
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
  <div class="todo-form-add">
    <form class="todo-add" action="" on:submit|preventDefault={handleAddTodo}>
      <input bind:value={inp} />
      <button
        class="todo-add"
        style={"background-color:red; color:white;"}
        on:click={() => {
          handleAddTodo;
          
        }}>Add</button
      >
    </form>
  </div>
</div>

<style lang="scss">
  .ToDoList-wrapper {
    background-color: #424242;
    border: 1px solid #4b4b4b;

    .todo-form-add {
      background-color: #303030;
    }

    .todo-add {
      padding: 10px;
      flex-wrap: wrap;
      display: flex;
      border-radius: 10px;
      align-items: baseline;
      input {
        margin-right: 10px;
        padding: 10px;
        flex: 1;

        background-color: #424242;
        color: white;
      }
    }
  }
  .todolist {
    max-width: 400px;
    h1 {
      color: white;
      padding: opx;
      margin: 10px;
    }
    ul {
      margin: 0px;
      padding: 10px;
      text-align: left;
      height: 400px;
      overflow: auto;

      li {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        background-color: #303030;
        border-radius: 10px;
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
            margin: 0 10px 0 0;
          }
        }
        .remove-todo-button {
          border: none;
          background: none;
          padding: 5px;
          cursor: pointer;
          margin-left: 10px;
          align-items: baseline;
          color: red;
          display: none;
        }
        &:hover {
          .remove-todo-button {
            display: block;
          }
        }
      }
    }
  }
  .state-text {
    color: white;
  }
</style>
