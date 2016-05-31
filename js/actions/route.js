/**
 * Created by kylefang on 4/30/16.
 * @flow
 */

'use strict';
import type {Action} from './types'
import type {AnimationType} from '../reducers/route';

export const PUSH_NEW_ROUTE = "PUSH_NEW_ROUTE";
export const POP_ROUTE = "POP_ROUTE";


export function pushNewRoute(route:string, animation:AnimationType = 'forward'):Action {
    return {
        type: PUSH_NEW_ROUTE,
        route: route,
        animation
    }
}

export function popRoute(animation: AnimationType = 'backward'):Action {
    return {
        type: POP_ROUTE,
        animation
    }
}
