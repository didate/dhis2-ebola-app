import { FETCH_EBOLA_POSITIVE } from "../types"

const initialState = {
    data: null,
    loading: false
}

const fetchEbolaData = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case FETCH_EBOLA_POSITIVE:
            return { ...state, data: payload, loading: false }
        default:
            return state;
    }
}

export { fetchEbolaData };