import {
    ROUTE_PAGE_NAME
} from "./action";

const initialState = {
    routeName: 'Dashboard',
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case ROUTE_PAGE_NAME:
            return { ...state, routeName: action.data };

        default:
            return state;
    }
}

export default userReducer;