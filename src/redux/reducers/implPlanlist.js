import * as types from '@/redux/actions/action-type';
import statePlan from '@/redux/state/state-plan';

const planReducer = (state = statePlan,action) =>{
	let list = state.planlist;
	switch(action.type){
		case types.ADD:
			list.push(action.item);
			return Object.assign({},state,{planlist:list});
		case types.DELECT:
			let newstate = list.filter((item)=>item.id!=action.id);
			return Object.assign({},state,{planlist:newstate});
		case types.SHOW:
			return Object.assign({},state,{show:action.show});
	}
	return state;
}
export default planReducer;