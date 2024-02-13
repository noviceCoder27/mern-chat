import { useState } from 'react'
import { loginUser } from '../apis/auth'
import { Link, useNavigate } from 'react-router-dom'
import { BsEmojiLaughing, BsEmojiExpressionless } from "react-icons/bs"
import { toast } from 'react-hot-toast';
const defaultData = {
  email: "",
  password: ""
}
function Login() {
  const [formData, setFormData] = useState(defaultData)
  const [isLoading, setIsLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const pageRoute = useNavigate()

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formSubmit = async (e) => {
    e.preventDefault()
    if (formData.email.includes("@") && formData.password.length > 6) {
      setIsLoading(true)
      const { data } = await loginUser(formData)
      if (data?.token) {
        localStorage.setItem("userToken", data.token)
        setIsLoading(false)
        pageRoute("/chats")
      }
      else {
        setIsLoading(false)
        toast.error("Invalid Credentials!")
        setFormData({ ...formData, password: "" })
      }
    }
    else {
      setIsLoading(false)
      toast.error("Provide valid Credentials!")
      setFormData(defaultData)

    }
  }
  return (
    <>

      <div className="w-full min-h-[100vh] flex justify-center items-center bg-[url('./../../public/bg.webp')] text-white">
      <div className="w-full min-h-[100vh] bg-black absolute opacity-30">
      </div>
        <div className='w-[90%] sm:w-[600px] pl-0 ml-0 h-[400px] sm:pl-0 sm:ml-9 mt-20 relative z-10'>
          <div>
            <h3 className=' text-[3rem]  font-bold tracking-wider text-[#fff]'>Login</h3>
            <p className='text-[#fff] text-[1.5rem]  tracking-wider font-medium'>No Account ? <Link className='text-[#fbceb5] hover:text-[#f0b694] underline' to="/register">Sign up</Link></p>
          </div>
          <form className='flex flex-col mt-5 gap-y-5' onSubmit={formSubmit}>
            <div>
              <input className="w-[100%] sm:w-[80%] outline-white rounded-3xl border-2 border-white bg-transparent h-[50px] pl-3 text-[#ffff]" onChange={handleOnChange} name="email" type="text" placeholder='Email' value={formData.email} required />

            </div>
            <div className='relative'>
              <input className='w-[100%] sm:w-[80%] rounded-3xl bg-transparent outline-white border-2 border-white h-[50px] pl-3 text-[#ffff]' onChange={handleOnChange} type={showPass ? "text" : "password"} name="password" placeholder='Password' value={formData.password} required />
              {
                !showPass ? <button type='button'><BsEmojiLaughing onClick={() => setShowPass(!showPass)} className='text-[#fff] absolute top-3 right-5 sm:right-32 w-[30px] h-[25px]' /></button> : <button type='button'> <BsEmojiExpressionless onClick={() => setShowPass(!showPass)} className='text-[#fff] absolute top-3 right-5 sm:right-32 w-[30px] h-[25px]' /></button>
              }
            </div>
            <button className='w-[100%] flex rounded-3xl sm:w-[80%] h-[50px] bg-[#fbceb5] hover:bg-[#f0b694] font-bold text-[#121418] tracking-wide text-[17px] items-center justify-center' type='submit'>
              <div style={{ display: isLoading ? "" : "none" }} className='ml-auto mr-auto'>
                <div className='flex gap-3'>
                  <div className='w-2 h-2 bg-black rounded-full animate-bounce'></div>
                  <div className='w-2 h-2 delay-75 bg-black rounded-full animate-bounce'></div>
                  <div className='w-2 h-2 delay-100 bg-black rounded-full animate-bounce'></div>
                </div>
              </div>
              <p style={{ display: isLoading ? "none" : "block" }} className='test-[#fff]'>Sign In</p>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login