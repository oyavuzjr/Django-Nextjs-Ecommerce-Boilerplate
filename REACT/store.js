import { createStore, action,useStoreActions } from "easy-peasy";
import { persist } from 'easy-peasy';

const counter = {
  count: 0,
  increment: action((state) => {
    state.count++;
  }),
  decrement: action((state) => {
    state.count--;
  }),
  reset: action((state) => {
    state.count = 0;
  }),
};



const toaster={
  notifications:[],
  setNotification:action((state,payload)=>{
    state.notifications.push(payload);
  }),
  popNotification:action((state,payload)=>{
    state.notifications.shift();
  }),
};

const cart = {
  items: [],
  itemNum: 0,
  addToCart: action((state, payload) => {
    if (state.items.map((x) => x.id).includes(payload.id)) {
      state.items.forEach((item) => {
        if(item.id===payload.id){
          item.quantity+=1
        }
      }) 
    } else {
      state.items.push(payload);
    }
    state.itemNum = state.items.map((item) =>item.quantity).reduce(function(a, b){
        return a + b;
      }, 0)
  }),
  setCart:action((state,payload)=>{
    state.items=payload
    state.items.forEach(item=>{
      item["images"]=item["images"][0].image
      item.image=item.images;
      delete item.images;
    })
    state.itemNum = state.items.map((item) =>item.quantity).reduce(function(a, b){
      return a + b;
    }, 0)
  })
};



const auth = {
  token: "",
  setToken:action((state,payload)=>{
    state.token=payload;
  }),
  logout:action((state,payload)=>{
    state.token="";
  })
};

const model = {
  counter:counter,
  cart:persist(cart),
  auth:persist(auth),
  toaster:toaster
};

export default model;

export function initializeStore(initialState) {
  return createStore(model, initialState);
}
