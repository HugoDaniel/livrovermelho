import React from "react"

const VerticalLine = ({ length = 128, color = '#CC1013' }) => {
  return <div style={{
    margin: 'auto',
    width: 2,
    height: length,
    backgroundImage: `linear-gradient(${color} 33%, rgba(255,255,255,0) 0%)`,
    backgroundPosition: 'right',
    backgroundSize: '2px 19px',
    backgroundRepeat: 'repeat-y',
  }}/>
}

export default VerticalLine
