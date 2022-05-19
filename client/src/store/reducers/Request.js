const initialRequest = {
    request : []
}

const reducers = (state = initialRequest , action)=>{
    if(action.type === 'initialiseRequest'){
        console.log(action.payload);
        state.request = action.payload
        return{
            ...state
        }
    }
    else if(action.type === 'updateRequest'){
        let index = 0;
        let flag = false;
        for( ; index < state.request.length ; index+=1){
            if(state.request[index].clientId === action.payload) {
                flag = true;
                break;
            }
        }
        console.log(index);
        if(flag){
            state.request.splice(index , 1);
        }
        return{
            ...state
        }
    }
    else return state;
    
}

export default reducers;