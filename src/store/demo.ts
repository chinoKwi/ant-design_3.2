// https://blog.csdn.net/weixin_46560512/article/details/121187387
import { defineStore } from 'pinia'

export const useSiteStore = defineStore('site', {
  // 需要注意的是，defineStore返回的是一个回调方法
  // id:'site',//test是该状态管理的唯一标志也可以使用defineStore(id,{});的形式
  state: () => {
    return {
      name: 'KafuuChino'
    }
  },
  getters: {
    getName: (state) => state.name
  },
  actions: {
    UPDATE_DATA() {
      this.name = this.name + String(+new Date())
    }
  }
})

// 组件中导入对应状态管理工具
// import { userTestStore } from "./store";
// const store = userTestStore();
// const { addAge } = store;//解构出store实例里面的addAge方法

// 组件中使用方法如下：
// <div>output age:{{ store.age }}</div>
// <button @click="addAge(10)">click for add age</button>

// !!直接修改解构出来的 age是不ref类型
// <div>error:{{ age }}</div>
// <button @click="test">change error age</button>
// let { age } = store;
// function test() {
//   console.log(" error add age");
//   age++;
// }

// 解决方法，使用pinia里面的storeToRefs强转：
// import { storeToRefs } from "pinia";
// let { age } = storeToRefs(userTestStore());
// function test() {
//   age.value++;//注意这里要加上.value因为被转化成了ref类型
// }
// //这样就能够是实现有效修改了
