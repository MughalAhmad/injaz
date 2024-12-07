import React from 'react'
const Button = ({ hoverColor = "hover:bg-[#101010]", title='click', color = "bg-[#DCDCDC]", onClick = () => { return } }) => {
  return (
    <button
      className={`
            ${color}
            px-12
            py-2
            rounded-lg
            text-white
            font-medium
            text-lg
            ${hoverColor}
            `}
      onClick={onClick}
    >{title}</button>
  )
}
export default Button;