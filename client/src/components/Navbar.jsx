import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { logout } from "../slice/userSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/", current: true },
    { name: "Products", href: "/products" },
  ]);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const logoutHook = useLogout();

  const signOut = async () => {
    await logoutHook();
    navigate("/");
  };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const updateNavbar = async () => {
    await sleep(1);
    const url = window.location.href;
    switch (url) {
      case "http://localhost:3000/":
        setNavigation((current) =>
          current.map((obj) => {
            if (obj.name === "Home") {
              return { ...obj, current: true };
            }
            if (obj.name === "Products") {
              return { ...obj, current: false };
            }

            return obj;
          })
        );
        break;
      case "http://localhost:3000/products":
        setNavigation((current) =>
          current.map((obj) => {
            if (obj.name === "Home") {
              return { ...obj, current: false };
            }
            if (obj.name === "Products") {
              return { ...obj, current: true };
            }

            return obj;
          })
        );
        break;
      case "http://localhost:3000/product":
        setNavigation((current) =>
          current.map((obj) => {
            if (obj.name === "Home") {
              return { ...obj, current: false };
            }
            if (obj.name === "Products") {
              return { ...obj, current: true };
            }

            return obj;
          })
        );
        break;
      default:
        setNavigation((current) =>
          current.map((obj) => {
            if (obj.name === "Home") {
              return { ...obj, current: false };
            }
            if (obj.name === "Products") {
              return { ...obj, current: false };
            }

            return obj;
          })
        );
    }
  };

  useEffect(() => {
    updateNavbar();
  }, [window.location.href]);
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
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
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://pps.whatsapp.net/v/t61.24694-24/294240288_737344717498710_6107413829790180793_n.jpg?ccb=11-4&oh=01_AVxW-vF3AhTWbEkVB270f2etkq70Gscq1zt0QXH9ijiNWw&oe=6348BB42"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://pps.whatsapp.net/v/t61.24694-24/294240288_737344717498710_6107413829790180793_n.jpg?ccb=11-4&oh=01_AVxW-vF3AhTWbEkVB270f2etkq70Gscq1zt0QXH9ijiNWw&oe=6348BB42"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link to={item.href} onClick={() => updateNavbar()}>
                        <p
                          key={item.name}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
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
              <h1 className="font-bold text-gray-100"> {user.name}</h1>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://pps.whatsapp.net/v/t61.24694-24/215742736_169130348833804_5618789588749101516_n.jpg?ccb=11-4&oh=01_AVxCtQYSX2EbN2U0Y04R7EjMMI3dgqM8JDIFWqIQrsYFzg&oe=63489F59"
                        alt=""
                      />
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
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
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
  );
}
