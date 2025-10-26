import { MutableRefObject, Ref, RefCallback, RefObject } from 'react'

import { createCallbackRef } from '@/hooks/useCallbackRef'

import { isArray, isFunction, isNullish } from '../judges/judgeType'

function loadRef(ref: RefCallback<any> | MutableRefObject<any> | null | undefined, el: any) {
  if (isNullish(ref)) return

  if (isFunction(ref)) {
    ref(el)
  } else if (isArray(ref.current)) {
    // 👇 have to do that to pretend the address of variable
    ref.current.forEach((_, idx) => {
      ref.current.splice(idx, 1, el)
    })
  } else {
    ref.current = el
  }
}

export default function mergeRef<T = any>(...refs: (Ref<T> | null | undefined)[]): (instance: T | null) => void {
  return (el: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(el)
      } else if (ref && typeof ref === 'object') {
        // @ts-ignore
        ref.current = el
      }
    })
  }
}
