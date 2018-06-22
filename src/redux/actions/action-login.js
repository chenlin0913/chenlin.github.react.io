import * as types from '@/redux/actions/action-type';
import ajax from '@/page/utils/apis';

/**
 * [登录]
 * @param  {[type]} item [登录所需参数]
 * @return {[type]}      [description]
 */
export function goToLogin(item){
	return dispatch =>{
		ajax.post('/user/login.do',{username:item.username,password:item.password}).then((res) =>{
			console.log(res);
			dispatch({
				type:types.LOGIN,
				loginstate:true
			})
			dispatch({
				type:types.CLOSELOGIN,
				open:false
			})
		},(error)=>{
			console.log(error);
			dispatch({
				type:types.LOGIN,
				loginstate:false
			})
		})
	}
}

export function keyCloseLogin(item){
	return dispatch =>{
		switch(item.code){
			case "Escape":
				dispatch({
					type:types.CLOSELOGIN,
					open:false
				});
			return;
		}
	}
}
