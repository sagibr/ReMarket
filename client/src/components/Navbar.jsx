import { Disclosure, Menu, Transition } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import Remarket from "../Remarket.png"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Example() {
  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/", current: true },
    { name: "Products", href: "/products" },
  ])
  const user = useSelector((state) => state.user.user)

  const navigate = useNavigate()
  const logoutHook = useLogout()

  const signOut = async () => {
    await logoutHook()
    navigate("/")
  }
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

  const updateNavbar = async () => {
    await sleep(1)
    const url = window.location.href
    switch (url) {
      case "https://remarket-client.netlify.app/":
        setNavigation((current) =>
          current.map((obj) => {
            if (obj.name === "Home") {
              return { ...obj, current: true }
            }
            if (obj.name === "Products") {
              return { ...obj, current: false }
            }

            return obj
          })
        )
        break
      case "https://remarket-client.netlify.app/products":
        setNavigation((current) =>
          current.map((obj) => {
            if (obj.name === "Home") {
              return { ...obj, current: false }
            }
            if (obj.name === "Products") {
              return { ...obj, current: true }
            }

            return obj
          })
        )
        break
      case "https://remarket-client.netlify.app/product":
        setNavigation((current) =>
          current.map((obj) => {
            if (obj.name === "Home") {
              return { ...obj, current: false }
            }
            if (obj.name === "Products") {
              return { ...obj, current: true }
            }

            return obj
          })
        )
        break
      default:
        setNavigation((current) =>
          current.map((obj) => {
            if (obj.name === "Home") {
              return { ...obj, current: false }
            }
            if (obj.name === "Products") {
              return { ...obj, current: false }
            }

            return obj
          })
        )
    }
  }

  useEffect(() => {
    updateNavbar()
    // eslint-disable-next-line
  }, [window.location.href])
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <img src={Remarket} className="absolute top-0 left-12 w-24 "></img>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-3 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 ml-14">
                    {navigation.map((item) => (
                      <Link to={item.href} onClick={() => updateNavbar()}>
                        <p
                          key={item.name}
                          className={classNames(
                            item.current
                              ? " text-gray-400"
                              : "text-black hover:text-gray-400 ",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex bg-blue-600 rounded-lg p-1 hover:bg-blue-500 ">
                      <span className="sr-only">Open user menu</span>

                      <h1 className=" font-bold text-md text-white ">
                        {user.name ? user.name : "Join Now"}
                      </h1>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    {user.name ? (
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link to="/">
                              <p
                                onClick={() => signOut()}
                                href="/"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Log-Out
                              </p>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link to="/myproducts">
                              <p
                                href="/"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                My-Products
                              </p>
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    ) : (
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link to="register">
                              <p
                                href="/"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Register
                              </p>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link to="login">
                              <p
                                href="/"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Log-in
                              </p>
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    )}
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link to={item.href}>
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-black hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
