import * as types from '@/redux/actions/action-type';

/**
 * [添加-计划]
 * @param  {[type]} item [添加信息]
 * @return {[type]}      [description]
 */
export addPlan = (item) =>{
	return{
		type:types.ADD,
		item
	}
}

/**
 * [删除-计划]
 * @param  {[type]} id [删除标识]
 * @return {[type]}    [description]
 */
export deletePlan = (id) =>{
	return{
		type:types.DELECT,
		id
	}
}

/**
 * [显示隐藏]
 * @param  {[type]} show [description]
 * @return {[type]}      [description]
 */
export show = (show) =>{
	return{
		type:types.SHOW,
		show
	}
}