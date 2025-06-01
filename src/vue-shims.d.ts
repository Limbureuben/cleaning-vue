// declare module '*.vue' {
//   import { DefineComponent } from 'vue'
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }

// src/vue-shims.d.ts
declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }
  
  declare module '*.gql' {
    import { DocumentNode } from 'graphql'
    const value: DocumentNode
    export default value
  }
  
  declare module '*.graphql' {
    import { DocumentNode } from 'graphql'
    const value: DocumentNode
    export default value
  }