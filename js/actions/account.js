
'use strict';

const Parse = require('parse/react-native');

import type { ThunkAction, PromiseAction, Dispatch } from './types';
import type {AnimationType} from '../reducers/route';

export const PUSH_NEW_ROUTE = "PUSH_NEW_ROUTE";

export function dispatchAccount(route:string, animation:AnimationType = 'forward'): ThunkAction {
	return dispatch => {
		dispatch({
			type: 'PUSH_NEW_ROUTE',
			route: route,
			animation
		});
	};
}

