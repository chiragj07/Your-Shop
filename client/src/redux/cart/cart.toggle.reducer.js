import { TOGGEL_CART } from "./cart.types"


const toggeReducer = (state ={ hidden : true}, {type})=>{
switch(type){
case TOGGEL_CART: return{
    ...state,
    hidden : !state.hidden
};
default: return state;

}
}

export default toggeReducer;