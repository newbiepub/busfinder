import {ACCOUNTS} from "../constants/actionTypes";
const initialState = {
    user: {},
    loginState: false
};

export default accountReducer(initialState);

function accountReducer(initialState) {
    if (initialState) {
        return function accountReducerFn(state = initialState, action = {}) {
            switch (action.type) {
                case ACCOUNTS.LOGIN: {
                    let user = action.payload.user;
                    let loginState = user != undefined;
                    return {
                        loginState,
                        user
                    }
                }
                default: {
                    return {
                        ...state
                    }
                }
            }
        }
    }
}
