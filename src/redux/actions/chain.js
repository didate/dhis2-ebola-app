import { FETCH_EBOLA_POSITIVE } from "../types";



const query = {

}

export const fetchEbolaData = () => async dispatch => {

    console.log('OK')
    dispatch({
        type: FETCH_EBOLA_POSITIVE,
        payload: {
            message: 'redux ok'
        }
    });

}