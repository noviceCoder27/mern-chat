import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchUsers, validUser } from '../apis/auth'
import { setActiveUser } from '../redux/activeUserSlice'
import { RiNotificationBadgeFill } from "react-icons/ri"
import { BsSearch } from "react-icons/bs"
import { BiNotification } from "react-icons/bi"
import { IoIosArrowDown } from "react-icons/io"
import { setShowNotifications, setShowProfile } from '../redux/profileSlice'
import Chat from './Chat'
import Profile from "../components/Profile"
import { acessCreate } from "../apis/chat.js"
import { fetchChats, setNotifications } from '../redux/chatsSlice'
import { getSender } from '../utils/logics'
import { setActiveChat } from '../redux/chatsSlice'
import Group from '../components/Group'
import Contacts from '../components/Contacts'
import { Effect } from "react-notification-badge"
import NotificationBadge from 'react-notification-badge';
import Search from '../components/group/Search'
import './home.css'
function Home() {
  const dispatch = useDispatch()
  const { showProfile, showNotifications } = useSelector((state) => state.profile)
  const { notifications } = useSelector((state) => state.chats)
  const { activeUser } = useSelector((state) => state)
  const [displayChat,setDisplayChat] = useState(false);
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState("")

  const handleSearch = async (e) => {
    setSearch(e.target.value)
  }
  const handleClick = async (e) => {
    await acessCreate({ userId: e._id })
    dispatch(fetchChats())
    setSearch("")
  }
  useEffect(() => {
    const searchChange = async () => {
      setIsLoading(true)
      const { data } = await searchUsers(search)
      setSearchResults(data)
      setIsLoading(false)
    }
    searchChange()
  }, [search])
  useEffect(() => {
    const isValid = async () => {
      const data = await validUser()

      const user = {
        id: data?.user?._id,
        email: data?.user?.email,
        profilePic: data?.user?.profilePic,
        bio: data?.user?.bio,
        name: data?.user?.name
      }
      dispatch(setActiveUser(user))
    }
    isValid()

  }, [dispatch, activeUser])


  return (
    <>
      <div className='bg-[#4d426d]'>
        <div className= "flex">
          {
            !showProfile ?
              <div className= {`md:flex-col min-w-[360px] relative bg-[#4d426d] h-[100vh] max-lg:w-full ${displayChat ? "max-lg:hidden": ""}`}>
                <div>
                  <div>
                    <a className=' items-center relative  block h-[90px]' href='/'>
                      <h3 className='text-[20px] text-white font-body font-extrabold tracking-wider mt-4 ml-1'>Messages</h3>
                    </a>
                  </div>
                  <div className='absolute flex items-center top-4 right-5 gap-x-3'>
                    <button onClick={() => dispatch(setShowNotifications(!showNotifications))}>
                      <NotificationBadge
                        count={notifications.length}
                        effect={Effect.SCALE}
                        style={{ width: "15px", height: "15px", fontSize: "9px", padding: "4px 2px 2px 2px" }}
                      />
                      {
                        showNotifications ? <RiNotificationBadgeFill style={{ width: "25px", height: "25px", color: "#319268" }} /> : <BiNotification style={{ color: "#319268", width: "25px", height: "25px" }} />
                      }

                    </button>
                    <div className={`${showNotifications ? "overflow-y-scroll scrollbar-hide tracking-wide absolute top-10 -left-32 z-10 w-[240px] bg-[#fafafa] px-4 py-2 shadow-2xl" : "hidden"}`}>
                      <div className='text-[13px]'>

                        {!notifications.length && "No new messages"}
                      </div>
                      {
                        notifications.map((e, index) => {
                          return (
                            <div onClick={() => {
                              dispatch(setActiveChat(e.chatId))
                              dispatch(setNotifications(notifications.filter((data) => data !== e)))

                            }} key={index} className='text-[12.5px] text-black px-2 cursor-pointer' >

                              {e.chatId.isGroup ? `New Message in ${e.chatId.chatName}` : `New Message from ${getSender(activeUser, e.chatId.users)}`}
                            </div>

                          )

                        })
                      }
                    </div>
                    <button onClick={() => dispatch(setShowProfile(true))} className='relative flex items-center gap-x-1'>
                      <img className='w-[28px] h-[28px] rounded-[25px]' src={activeUser?.profilePic} alt="" />
                      <IoIosArrowDown style={{ color: "#616c76", height: "14px", width: "14px" }} />
                    </button>
                  </div>
                </div>
                <div>
                  <div className='relative px-4 pt-6 -mt-6'>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input onChange={handleSearch} className='w-[99.5%] bg-[#5c4f81] text-white tracking-wider pl-9 py-[8px] rounded-[9px] outline-0' type="text" name="search" placeholder="Search" />
                    </form>
                    <div className='absolute top-[36px] left-[27px]'>
                      <BsSearch style={{ color: "#c4c4c5" }} />
                    </div>
                    <Group />
                    <div style={{ display: search ? "" : "none" }} className=' absolute z-10 w-[100%] left-[0px] top-[70px] bg-[#4d426d] flex flex-col gap-y-3 pt-3 px-4'>
                      <Search searchResults={searchResults} isLoading={isLoading} handleClick={handleClick} search={search} />
                    </div>
                  </div>
                  <Contacts setDisplayChat = {setDisplayChat}/>
                </div>
              </div> : <Profile className="min-w-[100%] sm:min-w-[360px] h-[100vh] bg-[#fafafa] shodow-xl relative" />
          }
          <Chat className="relative w-[100%] h-[100vh] bg-[#4d426d]" displayChat = {displayChat} setDisplayChat = {setDisplayChat} />
        </div>
      </div >

    </>
  )
}

export default Home