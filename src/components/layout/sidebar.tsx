"use client";

import { Bell, ChevronLeftCircle, Compass, Home, LogIn, LogOutIcon, Menu, TrendingUp, User2 } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react'

import { useOnClickOutside } from 'usehooks-ts';

function Navbar() {
  const [isClicked, setisClicked] = useState(false);
  const [isHovering, setisHovering] = useState(true);
  const pathname = usePathname();

  const ref = useRef(null)

  const handleClickOutside = () => {
    setisClicked(true);
  }


  useOnClickOutside(ref, handleClickOutside)
  return (
    <div className='h-full p-4 md:p-0 z-50'>
      <Menu color='white' onClick={() => setisClicked(!isClicked)} className='fixed top-4 left-4 md:hidden z-50' />
      <div ref={ref} className={cn("fixed left-0 top-0 w-60 h-full  backdrop-blur drop-shadow-[0_35px_35px_rgba(1,1,1,1.25)] border-opacity-50 transition-all duration-300 z-50", {
        ["-translate-x-full opacity-0 md:scale-100 md:opacity-100 md:translate-x-0 w-18"]: isClicked,
        ["translate-x-0 opacity-100  "]: !isClicked,
      })} onMouseEnter={() => setisHovering(false)} onMouseLeave={() => setisHovering(true)}>
        <div className='h-full backdrop-blur-sm flex flex-col pt-20 pb-5'>
          <div id='logo' className='flex items-center justify-center space-x-3'>
            <Image src={'logo.svg'} alt={''} width={50} height={50} className={cn('rounded-full backdrop-blur-3xl', {
              ["-translate-x-2"]: isClicked,
            })} />
            {!isClicked && (
              <p className={cn('text-yellow-400 font-bold text-2xl')}>BuzzHive</p>)}
          </div>
          <div className='h-full flex flex-col justify-between'>

            <div id='Navbar items' className={cn('flex flex-col pt-10 px-4', {
              ["space-y-8"]: isClicked,
              ["space-y-3"]: !isClicked,
            })}>
              <Link id='Items' className={cn('flex space-x-2 transition-color duration-300  p-5 h-12 rounded-full   hover:bg-yellow-400 hover:text-black items-center font-semibold text-white', {
                ["p-1 items-center justify-center h-9 w-9"]: isClicked,
                ["justify-start "]: !isClicked,
                ["bg-yellow-400 text-black border-2"]: pathname === '/',
              })} href={'/'}>
                <Home />
                {!isClicked && (
                  <p className={cn('text-lg')}>Home</p>)}
              </Link>
              <Link id='Items' className={cn('flex space-x-2 transition-color duration-300  p-5 h-12 rounded-full   hover:bg-yellow-400 hover:text-black items-center font-semibold text-white', {
                ["p-1 items-center justify-center  h-9 w-9"]: isClicked,
                ["justify-start "]: !isClicked,
                ["bg-yellow-400 text-black border-2"]: pathname === '/explore',
              })} href={'/explore'}>
                <Compass />
                {!isClicked && (
                  <p className={cn('text-lg')}>Explore</p>)}
              </Link>
              <div className='flex items-center -space-x-1'>
                <Link id='Items' className={cn('flex space-x-2 transition-color duration-300  p-5 h-12 rounded-full   hover:bg-yellow-400 hover:text-black items-center font-semibold text-white', {
                  ["p-1 items-center justify-center h-9 w-9"]: isClicked,
                  ["justify-start "]: !isClicked,
                  ["bg-yellow-400 text-black border-2"]: pathname === '/notications',
                })} href={'/notications'}>
                  <Bell />
                  {!isClicked && (
                    <p className={cn('text-lg')}>Notications</p>)}
                </Link>
              </div>
              <Link id='Items' className={cn('flex space-x-2 transition-color duration-300  p-5 h-12 rounded-full   hover:bg-yellow-400 hover:text-black items-center font-semibold text-white', {
                ["p-1 items-center justify-center  h-9 w-9"]: isClicked,
                ["justify-start "]: !isClicked,
                ["bg-yellow-400 text-black border-2"]: pathname === '/profile',
              })} href={'/profile'}>
                <User2 />
                {!isClicked && (
                  <p className={cn('text-lg')}>User</p>)}
              </Link>
              <Link id='Items' className={cn('flex space-x-2 transition-color duration-300  p-5 h-12 rounded-full   hover:bg-yellow-400 hover:text-black items-center font-semibold text-white', {
                ["p-1 items-center justify-center  h-9 w-9"]: isClicked,
                ["justify-start "]: !isClicked,
                ["bg-yellow-400 text-black border-2"]: pathname === '/trending',
              })} href={'/trending'}>
                <TrendingUp />
                {!isClicked && (
                  <p className={cn('text-lg')}>Trending</p>)}
              </Link>
            </div>
            <div className={cn('flex justify-center items-center z-50', {
                  ["rotate-180"]: isClicked,
                  [" px-4 rotate-0"]: !isClicked,
                })} onClick={() => setisClicked(!isClicked)}>

                  <ChevronLeftCircle color='white' size={40} className={cn('hover:scale-110 transition-all duration-500 cursor-pointer z-50', {
                    ["md:opacity-0 opacity-100"]: isHovering,
                    ["opacity-100"]: !isHovering,
                  })} />
                </div>

            <div className={cn('px-5', {
              ["px-2"]: isClicked
            })}>
              <Link id='Items' className='flex space-x-2 justify-center transition-color duration-300 w-full h-12 rounded-full border-2   hover:bg-yellow-400 hover:text-black items-center font-semibold text-white' href={''}>
                <LogIn />
                {!isClicked && (
                  <p className={cn('text-lg')}>Sign In</p>)}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
