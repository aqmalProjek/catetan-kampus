import React from 'react'

export default function Card({children,noPadding}) {
  let classes = 'bg-white dark:bg-slate-900 shadow-md shadow-gray-200 dark:shadow-gray-900 rounded-md mb-5';
  if(!noPadding) {
    classes += ' p-4';
  }
  return (
    <div className={classes}>
        {children}
    </div>
  )
}
