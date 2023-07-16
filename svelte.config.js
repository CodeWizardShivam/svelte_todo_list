import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import preprocess from 'svelte-preprocess';

// const config = {
//     preprocess: preprocess({ 
//         scss: {
//             prependData: '@use "src/styles/variable.scss";'
          
//       }
//    })
// }

// export default 



export default {
  
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
}
