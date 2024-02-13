import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../apis/auth'
import { useState } from 'react'
import { BsEmojiLaughing, BsEmojiExpressionless } from "react-icons/bs"
import { toast } from 'react-hot-toast';
const defaultData = {
  firstname: "",
  lastname: "",
  email: "",
  password: ""
}
function Regsiter() {
  const [formData, setFormData] = useState(defaultData)
  const [isLoading, setIsLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const pageRoute = useNavigate()
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (formData.email.includes("@") && formData.password.length > 6) {
      const { data } = await registerUser(formData)
      if (data?.token) {
        localStorage.setItem("userToken", data.token)
        setIsLoading(false)
        pageRoute("/chats")

      }
      else {
        setIsLoading(false)
        toast.error("Invalid Credentials!")
      }
    }
    else {
      setIsLoading(false)
      toast.error("Provide valid Credentials!")
      setFormData({ ...formData, password: "" })
    }

  }


  return (
    <div className="bg-[url('/bg.webp')] w-[100vw] h-[100vh] flex justify-center items-center ">
      <div className="w-full min-h-[100vh] bg-black absolute opacity-30">
      </div>
      <div className='w-[90%] sm:w-[600px] pl-0 ml-0 h-[400px] sm:pl-0 sm:ml-9 mt-10 relative'>
          <div className='mb-0'>
            <h3 className=' text-[3rem]  font-bold tracking-wider text-[#fff]'>Register</h3>
            <p className='text-[#fff] text-[1.5rem]  tracking-wider font-medium'>Have Account ? <Link className='text-[#fbceb5] hover:text-[#f0b694] underline'  to="/login">Sign in</Link></p>
          </div>
        <form className='flex flex-col mt-5 gap-y-3' onSubmit={handleOnSubmit}>
          <div className='flex gap-x-2 w-[100%]'>
            <input onChange={handleOnChange} className='border-2 border-white rounded-3xl bg-transparent h-[50px] pl-3 text-[#ffff] w-[49%] sm:w-[47%]' type="text" name="firstname" placeholder='First Name' value={formData.firstname} required />
            <input onChange={handleOnChange} className='border-2 border-white rounded-3xl bg-transparent h-[50px] pl-3 text-[#ffff] w-[49%] sm:w-[47%]' type="text" name="lastname" placeholder='Last Name' value={formData.lastname} required />
          </div>
          <div>
            <input onChange={handleOnChange} className='border-2 border-white rounded-3xl bg-transparent h-[50px] pl-3 text-[#ffff] w-[100%] sm:w-[96.3%]' type="email" name="email" placeholder="Email" value={formData.email} required />
          </div>
          <div className='relative flex flex-col gap-y-3'>
            <input onChange={handleOnChange} className='border-2 border-white rounded-3xl bg-transparent h-[50px] pl-3 text-[#ffff] w-[100%] sm:w-[96.3%]' type={showPass ? "text" : "password"} name="password" placeholder="Password" value={formData.password} required />

            {
              !showPass ? <button type='button'><BsEmojiLaughing onClick={() => setShowPass(!showPass)} className='text-[#fff] absolute top-3 right-4 sm:right-8 w-[30px] h-[25px]' /></button> : <button type='button'> <BsEmojiExpressionless onClick={() => setShowPass(!showPass)} className='text-[#fff] absolute top-3 right-4 sm:right-8 w-[30px] h-[25px]' /></button>
            }


          </div>
          <button className='w-[100%]  bg-[#fbceb5] hover:bg-[#f0b694] rounded-3xl sm:w-[96.3%] h-[50px] font-bold text-[#121418] tracking-wide text-[17px] flex justify-center items-center' type='submit'>
            <div style={{ display: isLoading ? "" : "none" }} className='ml-auto mr-auto'>
              <div className='flex gap-3'>
                <div className='w-2 h-2 bg-black rounded-full animate-bounce'></div>
                <div className='w-2 h-2 bg-black rounded-full animate-bounce'></div>
                <div className='w-2 h-2 bg-black rounded-full animate-bounce'></div>
              </div>
            </div>
            <p style={{ display: isLoading ? "none" : "block" }} className='test-[#fff]'>Regsiter</p>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Regsiter