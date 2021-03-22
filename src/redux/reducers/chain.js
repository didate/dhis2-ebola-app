import { FETCHING_EBOLA_POSITIVE, RECEIVED_EBOLA_POSITIVE } from "../types"

const initialState = {
    data: null,
    loading: true
}

const fetchEbolaData = (state = initialState, action) => {
    const { type, payload } = action

    console.log(payload);
    switch (type) {
        case RECEIVED_EBOLA_POSITIVE:
            return { ...state, data: payload, loading: false }
        case FETCHING_EBOLA_POSITIVE:
            return { ...state, data: null, loading: true }
        default:
            return state;
    }
}

export { fetchEbolaData };