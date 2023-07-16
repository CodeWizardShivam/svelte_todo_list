<script src="https://kit.fontawesome.com/a076d05399.js">
  export let title = "";
  export let size = 'small';
  export let shadow = 'false';
</script>

<button 
 class:shadow
class:size-sm ={size == 'small'}
class:size-lg ={size == 'large'}
 
>
<div class="leftContent"><slot name="leftContent"/></div>
{title}

</button>

<style lang="scss">
  
   
    button {
        align-items: center;
        display: flex;
        border-radius: 1;
        background-color: 
        red;
        // variable.$color;
        border-color: #fff;
        cursor: pointer;
&:hover{
            background-color: #dcee0f;
            border-color: black;
        }
        &.size-sm{
            
            padding: 5px 5px;
        }
        &.size-lg{
            
            padding: 20px 20px;
        }
        &.shadow{
            box-shadow: inset;
            text-shadow: #dcee0f;
            padding: 20px 20px;


        }
    .leftContent{
        margin: 5px;
        width: 50px;
        color: white;
    }
        
        
    }
</style>