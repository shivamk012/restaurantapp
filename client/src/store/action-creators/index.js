export const setToken = (clientData) => {
    return (dispatch) => {
        dispatch({
            type : "logIn",
            payload : clientData
        })
    }
}

export const addToCart = (name)=>{
    return (dispatch) => {
        dispatch({
            type : 'addToCart',
            payload : name
        })
    }
}

export const removeFromCart = (name)=>{
    return (dispatch) => {
        dispatch({
            type : 'removeFromCart',
            payload : name
        })
    }
}

export const initialiseCart = (cart)=>{
    return (dispatch) =>{
        dispatch({
            type : 'initialiseCart',
            payload : cart
        })
    }
}

export const initialiseProducts = (products)=>{
    return (dispatch) => {
        dispatch({
            type : "initialiseProducts",
            payload : products
        })
    }
}

export const deleteItem = (name , qty)=>{
    return (dispatch)=>{
        dispatch({
            type : 'deleteItem',
            payload : {
                name : name,
                qty : qty
            }
        })
    }
}

export const logOutSession = ()=>{
    return (dispatch)=>{
        dispatch({
            type : 'logOut'
        })
    }
}

export const emptyCart = ()=>{
    return (dispatch)=>{
        dispatch({
            type : 'emptyCart'
        })
    }
}

export const addNewProduct = (newData)=>{
    return (dispatch)=>{
        dispatch({
            type : 'newProduct',
            payload : newData
        })
    }   
}

export const initialiseRequest = (newData)=>{
    return (dispatch)=>{
        dispatch({
            type : 'initialiseRequest',
            payload : newData
        })
    }
}

export const updateRequest = (e)=>{
    return (dispatch)=>{
        dispatch({
            type : 'updateRequest',
            payload : e
        })
    }
}