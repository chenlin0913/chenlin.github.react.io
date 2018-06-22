import qs from 'qs';
import store from '@/redux/store';

const baseURLs = '/api';

console.log(process.env.NODE_ENV);

const instance = axios.create({
	baseURL:baseURLs
});

//请求拦截器
instance.interceptors.request.use(config=>{
	//loading开启
	if(config.method==='post'){//如果是post请求，将传参进行qs序列化
		config.data = qs.stringify(config.data);
	}
	return config;
},error=>{
	console.log(error);
	store.dispatch({
		type:'OPENALERT',
		open:true,
		title:'Error message prompt！',
		message:'Incorrect parameter passing！'
	});
	return Promise.reject(error);
})

//响应拦截器
instance.interceptors.response.use(response=>{
	//loading关闭
	return response;
},error=>{
	console.log(error);
	//loading关闭
	store.dispatch({
		type:'OPENALERT',
		open:true,
		title:'Error message prompt！',
		message:'Abnormal network, please check the network！'
	});
	return Promise.reject(error);
})

export default{
	post(url,data){
		return new Promise((resolve,reject)=>{
			instance.post(url,data).then(response=>{
				console.log("response");
				if(!response.data.success){
					store.dispatch({
						type:'OPENALERT',
						open:true,
						title:'Error message prompt！',
						message:response.data.msg
					});
					reject(response);
					return;
				}
				resolve(response);
			},error=>{
				console.log("error");
				store.dispatch({
					type:'OPENALERT',
					open:true,
					title:'Error message prompt！',
					message:'Abnormal network, please check the network！'
				});
				reject(error);
			}).catch(error=>{
				console.log("catch");
				store.dispatch({
					type:'OPENALERT',
					open:true,
					title:'Error message prompt！',
					message:'Abnormal network, please check the network！'
				});
				reject(error);
			})
		})
	}
}