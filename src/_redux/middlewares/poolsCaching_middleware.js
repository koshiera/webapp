// Copyright 2016-2017 Rigo Investment Sagl.
// By the Power of Grayskull! I Have the Power!

import * as TYPE_ from '../actions/const'
import { Actions } from '../actions'

export const poolsCachingMiddleWare = store => next => action => {
  if (action.type === TYPE_.DRAGO_SELECTED_DETAILS_UPDATE) {
    const state = store.getState()
    const { selectedDrago } = state.transactionsDrago
    let poolId
    if (action.payload.details) {
      poolId = action.payload.details.dragoId || action.payload.details.id
    }
    poolId =
      typeof poolId !== 'undefined'
        ? poolId
        : selectedDrago.details.dragoId || selectedDrago.details.id
    const cachePayload = {
      payload: { ...action.payload },
      meta: { poolId: poolId }
    }
    store.dispatch(Actions.pools.writeItemPoolsList(cachePayload))
  }
  next(action)
}
