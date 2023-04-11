'use client'
import React from 'react'
import NavigationCard from './NavigationCard'
import HeaderNavigation from './HeaderNavigation';
import { ThemeProvider } from 'next-themes';
import { RecoilRoot } from 'recoil';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)

export default function Layout({children,hideNafigation}) {
  
  

  let rightCollumnClasses = 'text-black';
  if(hideNafigation) {
    rightCollumnClasses += ' w-full'
  } else {
    rightCollumnClasses += 'mx-2 md:mx-0 md:w-9/12 mb-24 md:mb-0'
  }
  return (
    <>
    <ThemeProvider enableSystem={true} attribute='class'>
      <RecoilRoot>
    {!hideNafigation && (
    <HeaderNavigation />
      )}
    <div className={`md:flex mt-20 max-w-4xl mx-auto gap-6 ${!hideNafigation && 'mt-24'} text-black dark:text-white`}>
      {!hideNafigation && (

        <div className="fixed bottom-0 md:static w-full  md:w-3/12 -mb-5 z-10">
          <NavigationCard />
        </div>
      )}
      <div className={rightCollumnClasses}>
        {children}
      </div>

    </div>
    </RecoilRoot>
    </ThemeProvider>
    </>
  )
}
