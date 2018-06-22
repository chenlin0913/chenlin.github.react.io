import * as types from '@/redux/actions/action-type';
import stateAlert from '@/redux/state/state-alert';

const alertReducer = (state = stateAlert,action) =>{
	switch(action.type){
		case types.OPENALERT:
			return Object.assign({},state,{open:action.open,title:action.title,message:action.message});
		case types.CLOSEALERT:
			return Object.assign({},state,{open:action.open,title:action.title,message:action.message});
	}
	return state;
}
export default alertReducer;