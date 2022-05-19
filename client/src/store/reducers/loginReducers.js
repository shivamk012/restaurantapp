const intialState = {
    clientId : '',
    emailId : '',
    address : '',
    state : '',
    city : '',
    firstName : '',
    lastName : '',
    pinCode : 0,
    isAdmin : false
};
const reducer =(state=intialState , action)=>{
    if(action.type === "logIn"){
        console.log(action.payload);
        state.city = action.payload.city;
        state.emailId = action.payload.emailId;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.clientId = action.payload._id;
        state.pinCode = action.payload.pinCode;
        state.address = action.payload.address;
        state.state = action.payload.state;
        state.isAdmin = action.payload.isAdmin;
        return {
            ...state
        }
    }
    else if(action.type === "logOut"){
        state.city = '';
        state.emailId = '';
        state.firstName = '';
        state.lastName = '';
        state.clientId = '';
        state.pinCode = 0;
        state.address = '';
        state.state = '';
        state.isAdmin = false;
        console.log(state.clientId);
        return{
            ...state
        }
    }
    else return state;
}

export default reducer;