import { createStore, action,useStoreActions, thunk } from "easy-peasy";
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
  addToCartGuest: action((state, payload) => {
    if (state.items.map((x) => x.id).includes(payload.id)) {
      state.items.forEach((item) => {
        if(item.id===payload.id){
          item.quantity+=payload.quantity
        }
      }) 
      state.items=state.items.filter(item=>item.quantity>0)
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
  }),
  addItem:thunk(async (actions,payload)=>{
    await fetch(`${process.env.API_ENDPOINT}update-item/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${payload.token}`,
      },
      body: JSON.stringify({ action:payload.action, productId: payload.id }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setTimeout(function () {
          payload.popNotification();
        }, 5000);
        const newCart = data.map((item) => item.product);
        data.forEach((item, index) => {
          newCart[index].quantity = item.quantity;
        });
        actions.setCart(newCart);
        payload.callback(false);
      })
      .catch((error) => {
        console.error(error, "catch the hoop");
      });
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
