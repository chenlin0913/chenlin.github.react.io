import * as types from '@/redux/actions/action-type';
import stateLogin from '@/redux/state/state-login';


const LoginReducer = (state = stateLogin,action) =>{
	console.log(action);
	switch(action.type){
		case types.LOGIN:
			return Object.assign({},state,{loginstate:action.loginstate});
		case types.OPENLOGIN:
			return Object.assign({},state,{open:action.open});
		case types.CLOSELOGIN:
			return Object.assign({},state,{open:action.open});
	}
	return state;
}
export default LoginReducer;