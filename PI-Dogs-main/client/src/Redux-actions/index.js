import axios from 'axios';

export function getDogs () {
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/dogs");
        return dispatch({type: 'GET_DOGS', payload: json.data});

    }
};
export function getDogsById (id) {

    return async function (dispatch){
        var json = await axios.get(`http://localhost:3001/dogs/${id}`);
        return dispatch({type: 'GET_DETAILS', payload: json.data});

    }

};
export function getName(name) {
    return async (dispatch) =>{
        var json= await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({type:'GET_NAME', payload: json.data})
    }
};
export function getTemperaments () {

    
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/temperaments");
        return dispatch({type: 'GET_TEMPER', payload: json.data});

    }

}
