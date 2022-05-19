const initial_state = {
    cart : [],
    products : []
}

const reducer =(state=initial_state , action)=>{
    if(action.type === "addToCart"){
        const foodDetails = state.products.find((element) => {
            if(element.name === action.payload) return element;
        })
        const isPresent = state.cart.find((element)=>{
            if(element.name === action.payload){
                return true;
            }
        })
        if(!isPresent){
            foodDetails.qty = 1;
            state.cart.push(foodDetails);
            return{
                ...state
            }
        }
        else{
            state.cart.find((element)=>{
                if(element.name === action.payload){
                    element.qty = element.qty+1;
                }
            })
            return{
                ...state
            }
        }
    }
    else if(action.type === "removeFromCart"){
        const foodDetails = state.products.find((element) => {
            if(element.name === action.payload) return element;
        })
        const isPresent = state.cart.find((element)=>{
            if(element.name === action.payload){
                return true;
            }
        })
        if(!isPresent){
            foodDetails.qty = 1;
            state.cart.push(foodDetails);
            return{
                ...state
            }
        }
        else{
            state.cart.find((element)=>{
                if(element.name === action.payload){
                    element.qty = element.qty-1;
                }
            })
            return{
                ...state
            }
        }
    }
    else if(action.type === "initialiseCart"){
        console.log(action.payload);
        return {
            ...state,
            cart : action.payload,
        };
    }
    else if(action.type === "initialiseProducts"){
        return {
            ...state,
            products : action.payload
        };
    }
    else if(action.type === "deleteItem"){
        let index = -1;
        let isPresent = state.cart.find((element)=>{
            if(element.name === action.payload.name){
                index += 1;
                return true;
            }
            index += 1;
        })
        if(isPresent){
            state.cart.splice(index , 1);
        }
        return{
            ...state
        }
    }
    else if(action.type === "emptyCart"){
        state.cart = [];
        return {
            ...state
        }
    }
    else if(action.type === "newProduct"){
        state.products.push(action.payload);
        return{
            ...state
        }
    }
    else return state;
}

export default reducer;