import {ACCOUNTS} from "../constants/actionTypes";
import {AsyncStorage} from "react-native";

function loginAction(payload) {
    return {
        type: ACCOUNTS.LOGIN,
        payload
    }
}

export function login(username, password, instance) {
    return (dispatch, getState) => {
        AsyncStorage.getItem('user', (err, data) => {
            if(!err && data) {
                let user = JSON.parse(data);
                if(user) {
                    if(user.username === username && user.password === password) {
                        dispatch(loginAction({user}));
                        instance.props.navigation.pop();
                    } else {
                        alert("User Not Found");
                    }
                }
            } else {
                dispatch(loginAction({err: err}));
            }
        })
    }
}