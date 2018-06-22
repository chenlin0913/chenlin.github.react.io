import {combineReducers} from 'redux';
import implPlanlist from '@/redux/reducers/implPlanlist';
import implLogin from '@/redux/reducers/implLogin';
import implAlert from '@/redux/reducers/implAlert';

var reducers = combineReducers({
	implPlanlist:implPlanlist,
	implLogin:implLogin,
	implAlert:implAlert
});

export default reducers;