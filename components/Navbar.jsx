import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  PlusIcon,
  ChatAlt2Icon,
} from "@heroicons/react/outline";

import Search from "./Search";

import { logoutUser } from "../utils/auth";

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Feed", href: "/feed" },
  { name: "Search", href: "/search" },
  { name: "Announcements", href: "/announcements" },
];

export const Navbar = ({ user, currentPath }) => (
  <Disclosure as="nav" className="bg-white shadow">
    {({ open }) => (
      <>
        <div className="container px-2 mx-auto md:px-10 lg:px-12">
          <div className="flex justify-between h-16">
            <div className="flex px-2 md:px-0">
              <div className="flex items-center flex-shrink-0">
                <Link href="/home">
                  <img
                    className="block w-auto h-10 cursor-pointer lg:hidden"
                    src="/logo.svg"
                    alt="ATD3www"
                  />
                </Link>
                <Link href="/home">
                  <img
                    className="hidden w-auto cursor-pointer lg:block h-14"
                    src="/logo-full.png"
                    alt="ATD3www"
                  />
                </Link>
              </div>
              <div className="hidden lg:ml-6 lg:flex lg:space-x-4">
                {navigation.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <a
                      className={`${
                        currentPath === link.href
                          ? "border-pink-500 text-gray-900 font-semibold"
                          : "border-transparent hover:text-pink-500 text-gray-500 font-medium"
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm`}
                    >
                      {link.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            <Search />
            <div className="flex items-center lg:hidden">
              <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block w-6 h-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            {user ? (
              <>
                <div className="hidden lg:ml-4 lg:flex lg:items-center">
                  <Link href="/messages">
                    <button className="relative flex-shrink-0 p-1 mr-2 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                      <span className="sr-only">View messages</span>
                      <ChatAlt2Icon className="w-6 h-6" aria-hidden="true" />
                      {user.unreadMessage && (
                        <div className="absolute w-2 h-2 bg-pink-600 rounded-full top-1 right-2"></div>
                      )}
                    </button>
                  </Link>
                  <Link href="/notifications">
                    <button className="relative flex-shrink-0 p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                      {user.unreadNotification && (
                        <div className="absolute w-2 h-2 bg-pink-600 rounded-full top-1 right-2"></div>
                      )}
                    </button>
                  </Link>
                  <Menu as="div" className="relative flex-shrink-0 ml-4">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                            <span className="sr-only">Open user menu</span>
                            <Image
                              className="object-cover w-8 h-8 rounded-full"
                              src={user.profilePicUrl}
                              alt={user.name}
                              height={32}
                              width={32}
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              <Link href={`/${user.username}`}>
                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  Your Profile
                                </a>
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <Link href="/settings">
                                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  Settings
                                </a>
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <a
                                onClick={logoutUser}
                                className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                              >
                                Sign out
                              </a>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                  <Link href="/posts/new">
                    <a className="flex items-center px-3 ml-5 text-white transition bg-pink-500 rounded-md hover:bg-pink-600 h-9">
                      <PlusIcon className="w-4 h-4 mr-1" />
                      <p className="text-sm">New Post</p>
                    </a>
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center ml-4 space-x-4">
                <Link href="/login">
                  <a className="hidden text-sm font-semibold text-gray-600 sm:flex">
                    Log In
                  </a>
                </Link>
                <Link href="/signup">
                  <a className="hidden px-3 py-2 text-sm font-semibold text-white transition bg-pink-500 rounded-md sm:flex hover:bg-pink-600">
                    Sign Up
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
        <Disclosure.Panel className="lg:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((link) => (
              <Link key={link.name} href={link.href}>
                <a
                  className={
                    currentPath === link.href
                      ? "bg-pink-50 border-pink-500 text-pink-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  }
                >
                  {link.name}
                </a>
              </Link>
            ))}
          </div>
          {user ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Image
                    className="object-cover w-10 h-10 rounded-full"
                    src={user.profilePicUrl}
                    alt={user.name}
                    height={48}
                    width={48}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
                <div className="ml-auto">
                  <Link href="/messages">
                    <button className="relative flex-shrink-0 p-1 mr-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                      <span className="sr-only">View messages</span>
                      <ChatAlt2Icon className="w-6 h-6" aria-hidden="true" />
                      {user.unreadMessage && (
                        <div className="absolute w-2 h-2 bg-pink-600 rounded-full top-1 right-2"></div>
                      )}
                    </button>
                  </Link>
                  <Link href="/notifications">
                    <button className="relative flex-shrink-0 p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                      {user.unreadNotification && (
                        <div className="absolute w-2 h-2 bg-pink-600 rounded-full top-1 right-2"></div>
                      )}
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link href={`/${user.username}`}>
                  <a className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                    Your Profile
                  </a>
                </Link>
                <Link href="/settings">
                  <a className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                    Settings
                  </a>
                </Link>
                <a
                  onClick={logoutUser}
                  className="block px-4 py-2 text-base font-medium text-gray-500 cursor-pointer hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </a>
                <Link href="/posts/new">
                  <a className="flex items-center justify-center py-2 mx-4 font-semibold text-white transition bg-pink-500 rounded hover:bg-pink-600">
                    <PlusIcon className="w-4 h-4 mr-1" />
                    <p className="text-sm">New Post</p>
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center px-4 pt-4 pb-3 border-t border-gray-200 space-2">
              <Link href="/login">
                <a className="w-full py-2 font-semibold text-center text-pink-600">
                  Log In
                </a>
              </Link>
              <Link href="/signup">
                <a className="w-full py-2 font-semibold text-center text-white bg-pink-500 rounded">
                  Sign Up
                </a>
              </Link>
            </div>
          )}
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
);
