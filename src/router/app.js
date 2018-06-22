import React from 'react';
// 按路由拆分代码
import Loadable from 'react-loadable';
import Loading from '@/common/components/Loading';

/**
 * [页面加载loading]
 * @param  {[type]} options.isLoading [页面加载中...]
 * @param  {[type]} options.error     [页面加载失败]
 * @return {[type]}                   [null]
 */
export const LoadingComponent = ({isLoading,error}) =>{
	if(isLoading){
		console.log("加载中....");
		return <div><Loading/></div>
	}else if(error){
		console.log("加载失败┭┮﹏┭┮");
		return <div>Sorry,there was a problem loading the page.</div>
	}else{
		console.log("返回null");
		return null;
	}
}

export const HomeApp = Loadable({
  loader: () => import('@/page/home/Home'),
  loading: LoadingComponent
});

export const ListApp = Loadable({
  loader: () => import('@/page/home/homechild/List'),
  loading: LoadingComponent
});

export const PlanApp = Loadable({
	loader:()=>import('@/page/common/components/Plan'),
	loading:LoadingComponent
})

export const EnhancedTableApp = Loadable({
	loader:()=>import('@/page/common/components/EnhancedTable'),
	loading:LoadingComponent
})
