import React, { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'universal-cookie'

const cookie = new Cookies


const Layout = () => {
    const profile = useSelector(state => state.profile)
    const location = useLocation()

    //toggle user menu
    useEffect(() => {
        const usermenubutton = document.getElementById('usermenubutton');
        const usermenu = document.getElementById('usermenu');

        const hide = (e) => {
            if (!e.target.closest('#usermenu, #usermenubutton')) {
                usermenu.classList.add('hidden');
            }
        };

        const toggleMenu = (e) => {
            usermenu.classList.toggle('hidden');
        };

        usermenubutton.addEventListener('click', toggleMenu);
        document.addEventListener('click', hide);

        return () => {
            usermenubutton.removeEventListener('click', toggleMenu);
            document.removeEventListener('click', hide);
        };
    }, []);

    // toggle sidebar
    useEffect(() => {
        const sidebarbutton = document.getElementById('sidebarbutton');
        const sidebarbutton1 = document.getElementById('sidebarbutton1');
        const sidebar = document.getElementById('sidebar');

        const hide = (e) => {
            if (!e.target.closest('#sidebar, #sidebarbutton, #sidebarbutton1')) {
                sidebar.classList.remove('translate-x-0');
            }
        };

        const toggleSidebar = (e) => {
            sidebar.classList.toggle('translate-x-0');
        };

        sidebarbutton.addEventListener('click', toggleSidebar);
        sidebarbutton1.addEventListener('click', toggleSidebar);
        document.addEventListener('click', hide);

        return () => {
            sidebarbutton.removeEventListener('click', toggleSidebar);
            sidebarbutton1.removeEventListener('click', toggleSidebar);
            document.removeEventListener('click', hide);
        };
    }, []);


    return (
        <>

            <nav className="fixed top-0 z-60 w-full bg-blue-50">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start md:ml-80">

                            <button
                                type="button"
                                className="inline-flex items-center p-2 text-sm md:hidden text-gray-500 rounded-lg hover:bg-gray-100"
                                id='sidebarbutton'
                            >
                                <span className="sr-only">Open sidenav</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    />
                                </svg>
                            </button>

                            <div className="flex ml-2 md:mr-24">
                                <img
                                    src="https://flowbite.com/docs/images/logo.svg"
                                    className="h-8 mr-3"
                                    alt="FlowBite Logo"
                                />
                                <span className="self-center text-xl font-semibold md:text-2xl whitespace-nowrap">
                                    Attendance Portal
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <button
                                    type="button"
                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                                    aria-expanded="false"
                                    id="usermenubutton"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={profile.image}
                                        alt=""
                                    />
                                </button>
                                {/* User Menu */}
                                <div
                                    className="hidden w-[180px] h-48 z-40 right-2 top-10 mt-4 fixed text-base list-none bg-white divide-y divide-gray-100 rounded shadow "
                                    id="usermenu"
                                >
                                    <div className="px-4 py-3" role="none">
                                        <p
                                            className="text-sm text-gray-90"
                                            role="none"
                                        >
                                            {profile.name}
                                        </p>
                                        <p
                                            className="text-sm font-medium text-gray-900 truncate"
                                            role="none"
                                        >
                                            {profile.email}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <Link
                                                to="/"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                                onClick={() => { cookie.remove('token'); window.location.href = '/' }}
                                            >
                                                Sign out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>



            {/* Sidebar */}
            <aside
                id="sidebar"
                className="bg-gray-800 border-gray-700 fixed z-50 w-72 inset-0 my-4 ml-4 h-[calc(100%-32px)] rounded-xl transition-transform -translate-x-80 md:translate-x-0"
                aria-label="Layout"
            >
                <div className="relative border-b border-white/20">
                    <div className="flex items-center gap-4 py-6 px-8">
                        <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                            {"{logo}{College_name}"}
                        </h6>
                    </div>
                    <button
                        className="md:hidden font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
                        id='sidebarbutton1'
                    >
                        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                className="h-5 w-5 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </span>
                    </button>
                </div>

                <div className="m-4">
                    <ul className="mb-4 flex flex-col gap-1">
                        <li>
                            <Link aria-current="page" className="active" to="/">
                                <button
                                    className={"middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg capitalize w-full flex items-center gap-4 px-4 text-white " + (location.pathname == '/' ? 'bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : 'hover:bg-white/10 active:bg-white/30')}
                                    type="button"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="w-5 h-5 text-inherit"
                                    >
                                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                    </svg>
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        Home
                                    </p>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link className="" to="/profile">
                                <button
                                    className={"middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg capitalize w-full flex items-center gap-4 px-4 text-white " + (location.pathname == '/profile' ? 'bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]' : 'hover:bg-white/10 active:bg-white/30')}
                                    type="button"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="w-5 h-5 text-inherit"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        profile
                                    </p>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <button
                                className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                                type="button"
                                onClick={() => { cookie.remove('token'); window.location.href = '/' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-inherit">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                    sign out
                                </p>
                            </button>
                        </li>

                    </ul>
                </div>
            </aside>
            <div className="bg-blue-50 h-screen">
                <div className="p-4 md:ml-80">
                    <div className="p-4 mt-14">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout