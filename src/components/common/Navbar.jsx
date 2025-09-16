import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { BsChevronDown } from "react-icons/bs"
import { TiShoppingCart } from 'react-icons/ti'
import ProfileDropDown from "../core/Auth/ProfileDropdown"
import { categories } from "../../services/apis"
import { apiConnector } from "../../services/apiConnector"
import { HiSearch } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);
    const { totalItems } = useSelector(state => state.cart);
    const location = useLocation()
    const navigate = useNavigate()
    const [subLinks, setsublinks] = useState([]);
    const [loading, setLoading] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    const matchRoutes = (routes) => {
        return matchPath({ path: routes }, location.pathname)
    }

    useEffect(() => {
        ;(async () => {
          setLoading(true)
          try {
            const res = await apiConnector("GET", categories.CATEGORIES_API)
            setsublinks(res.data.data)
          } catch (error) {
            console.log("Could not fetch Categories.", error)
          }
          setLoading(false)
        })()
    }, [])
        //console.log("sub links", subLinks)
    const handelSearch = (e) => {
        e.preventDefault();
        if (searchValue?.length > 0) {
            navigate(`/search/${searchValue}`);
            setSearchValue("");
        }
    }

  return (
    <div 
        className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            <Link to="/">
                <img src={logo} width={160} alt="Study Notion" height={42}></img>
            </Link>
            
            <nav>
                <ul className='flex-row gap-x-6 text-richblack-25 gap-5 hidden md:flex'>
                    {
                        NavbarLinks?.map((element, index) => (
                            <li key={index}>
                                {
                                    element.title === "Catalog" ? (
                                        <div className={`group relative flex cursor-pointer items-center gap-1 ${
                                                matchRoutes("/catalog/:catalogName")
                                                ? "text-yellow-25"
                                                : "text-richblack-25"
                                                }`}
                                        >
                                            <p>{ element.title }</p>
                                            <BsChevronDown />
                                            <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                                                <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5'></div>
                                                    {loading ? (
                                                        <p className="text-center">Loading...</p>
                                                        ) : (subLinks && subLinks.length) ? (
                                                        <>
                                                            {subLinks
                                                            ?.filter(
                                                                (subLink) => subLink?.courses?.length > 0
                                                            )
                                                            ?.map((subLink, i) => (
                                                                <Link
                                                                to={`/catalog/${subLink.name
                                                                    .split(" ")
                                                                    .join("-")
                                                                    .toLowerCase()}`}
                                                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-500"
                                                                key={i}
                                                                >
                                                                <p>{subLink.name}</p>
                                                                </Link>
                                                            ))}
                                                        </>
                                                        ) : (
                                                        <p className="text-center">No Courses Found</p>
                                                    )}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link to={element?.path}>
                                            <p
                                            className={`${
                                                matchRoutes(element?.path)
                                                ? "text-yellow-25"
                                                : "text-richblack-25"
                                            }`}
                                            >
                                            {element.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        ))
                    }
                    <form onSubmit={handelSearch} className='flex items-center relative'>
                        <input 
                            value={searchValue} 
                            onChange={(e) => { setSearchValue(e.target.value) }} 
                            id='searchinput' 
                            type="text" 
                            placeholder="Search" 
                            className=' absolute top-0 left-0 border-0 focus:ring-1 ring-richblack-400 rounded-full px-2 py-1 text-[15px] w-28 text-richblack-50 focus:outline-none focus:border-transparent bg-richblack-700'                            
                        />
                        <HiSearch 
                            type='submit' 
                            id='searchicon' 
                            size={20} 
                            className=" text-richblack-100 top-1 absolute cursor-pointer left-20"                              
                        />
                    </form>
                </ul>
            </nav>

            <div className='flex-row gap-5 hidden md:flex items-center'>
                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to='/dashboard/cart' className=' relative px-4 '>
                            <div className=' z-50'>
                                <TiShoppingCart className=' fill-richblack-25 w-7 h-7' />
                            </div>
                            {
                                totalItems > 0 && (
                                    <span className=' shadow-sm shadow-black text-[10px] font-bold bg-yellow-100 text-richblack-900 rounded-full px-1 absolute -top-[2px] right-[8px]'>
                                        {totalItems}
                                    </span>
                                )
                            }

                        </Link>
                    )
                }
                {
                    token == null && (
                        <Link to='/login' className='text-richblack-25' >
                            <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100'>
                                Login
                            </button>
                        </Link>
                    )
                }
                {
                    token == null && (
                        <Link to='/signup' className='text-richblack-25'>
                            <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100' >
                                Signup
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && (
                        <div className=' pt-2' >
                            <ProfileDropDown />
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar