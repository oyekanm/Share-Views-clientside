import React from 'react'
import { useNavigate } from 'react-router-dom'

function Options() {
    const navigate = useNavigate()
  return (
    <div onClick={()=> navigate("/login")}>Options</div>
  )
}

export default Options