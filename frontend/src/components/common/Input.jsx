import React from 'react'
const Input = ({
  feedback,
  title = "text",
  color = "bg-transparent",
  px = "px-3",
  py = "py-4",
  size = "text-lg", ...props }) => {
  return (
    <>
      <label className='text-xl text-textPrimary font-medium mb-2'>{title}</label>
      <input
        {...props}
        className={`w-full rounded-lg border ${px} ${py} ${size} border-[#D0D5DD] outline-none text-base placeholder-[#D0D5DD] text-black`}
        />
      {feedback && feedback[0] && feedback[1] && (
        <span className="text-red-500">{feedback[0]}</span>
      )}
    </>
  )
}
export default Input;