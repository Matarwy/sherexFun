// List.tsx
import { type FlexProps, Grid } from '@chakra-ui/react'
import React, {
  createContext, forwardRef as reactForwardRef, type ReactNode, useDeferredValue, useEffect, useImperativeHandle, useMemo, useRef, useState
} from 'react'

import { useRecordedEffect } from '@/hooks/useRecordedEffect'
import { useScrollDegreeDetector } from '@/hooks/useScrollDegreeDetector'
import mergeRef from '@/utils/react/mergeRef'

import { type ObserveFn, useIntersectionObserver } from '../hooks/useIntersectionObserver'

import ListItem from './ListItem'

export type ListPropController = {
  resetRenderCount(): void
}

type ListProps<T> = {
  controllerRef?: React.Ref<ListPropController | null>
  increaseRenderCount?: number
  initRenderCount?: number
  reachBottomMargin?: number
  renderAllAtOnce?: boolean

  gridSlotCount?: number
  gridSlotItemMinWidth?: number
  gridSlotItemWidth?: number

  items: T[]
  children?: (item: T, idx: number) => ReactNode
  getItemKey: (item: T, idx: number) => string | number

  onLoadMore?: () => void
  haveLoadAll?: boolean
  preventResetOnChange?: boolean
}

export const listContext = createContext<{ observeFn?: ObserveFn<any> }>({})

/** Keep the inner render as a generic function */
function ListInner<T>(
  {
    controllerRef,
    increaseRenderCount = 30,
    initRenderCount = 30,
    reachBottomMargin = 50,
    renderAllAtOnce,

    onLoadMore,
    haveLoadAll = false,
    preventResetOnChange = false,

    gridSlotCount,
    gridSlotItemMinWidth,
    gridSlotItemWidth,

    items: _items,
    getItemKey,
    children,
    ...props
  }: ListProps<T> & Omit<FlexProps, keyof ListProps<T>>,
  ref: React.Ref<HTMLDivElement>
) {
  const items = useDeferredValue(_items)
  const listRef = useRef<HTMLDivElement>(null)

  const { observe, stop } = useIntersectionObserver({
    rootRef: listRef as React.RefObject<HTMLElement>,
    options: { rootMargin: '80%' }
  })
  const contextValue = useMemo(() => ({ observeFn: observe }), [observe])

  useEffect(() => stop, []) // stop observer on unmount

  const initRenderItemLength = renderAllAtOnce ? items.length : initRenderCount
  const [renderItemLength, setRenderItemLength] = useState(initRenderItemLength)

  useScrollDegreeDetector(listRef, {
    onReachBottom: () => {
      setRenderItemLength((n) => {
        if (haveLoadAll && n >= items.length) return items.length
        const newCount = n + increaseRenderCount
        if (!haveLoadAll && items.length - newCount <= increaseRenderCount) onLoadMore?.()
        return newCount
      })
    },
    reachBottomMargin
  })

  const [renderCount, setRenderCount] = useState(0)
  const allListItems = useMemo(
    () => items.slice(0, renderItemLength).map((item, idx) => <ListItem key={getItemKey(item, idx)}>{children?.(item, idx)}</ListItem>),
    [items, renderItemLength, renderCount, children, getItemKey]
  )

  useRecordedEffect(
    ([prevAllItems]) => {
      if (preventResetOnChange) return
      const prevKeys = new Set(prevAllItems?.map((it, idx) => getItemKey(it, idx)))
      const currKeys = items.map((it, idx) => getItemKey(it, idx))
      if (prevAllItems && !renderAllAtOnce && currKeys.some((k) => !prevKeys.has(k))) {
        listRef.current?.scrollTo({ top: 0 })
        setRenderItemLength(initRenderCount)
      }
    },
    [items, renderAllAtOnce, preventResetOnChange] as const
  )

  function resetRenderCount() {
    setRenderItemLength(initRenderItemLength)
    setRenderCount((n) => n + 1)
  }

  useImperativeHandle(controllerRef, () => ({ resetRenderCount }), [resetRenderCount])

  return (
    <listContext.Provider value={contextValue}>
      <Grid
        className="List"
        ref={mergeRef(listRef, ref)}
        gridTemplateColumns={
          gridSlotItemMinWidth != null
            ? `repeat(auto-fill, minmax(${gridSlotItemMinWidth}px, 1fr))`
            : gridSlotItemWidth != null
            ? `repeat(auto-fill, ${gridSlotItemWidth}px)`
            : gridSlotCount != null
            ? `repeat(${gridSlotCount}, minmax(0, 1fr))`
            : undefined
        }
        justifyContent={gridSlotCount || gridSlotItemMinWidth || gridSlotItemWidth ? 'center' : undefined}
        overflow="overlay"
        {...props}
      >
        {allListItems}
      </Grid>
    </listContext.Provider>
  )
}

/** Define a callable generic component type for JSX */
type ListComponent = <T>(
  props: ListProps<T> & Omit<FlexProps, keyof ListProps<T>> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement

/** Wrap with React.forwardRef, then cast to our generic callable type */
const List = reactForwardRef(ListInner) as unknown as ListComponent

export default List
