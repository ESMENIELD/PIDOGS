
const inicialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    dogsDetail: [],
    
  };



const rootReducer = (state = inicialState, action) =>{
    switch (action.type) {
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload

            };
        case 'GET_TEMPER':
            return{
                ...state,
                temperaments: action.payload
            };
        case 'GET_DETAILS':
            return{
                ...state,
                dogsDetail: action.payload
            };    
            
        
            

           
    
        default:
            return state;
            
    }

}


export default rootReducer