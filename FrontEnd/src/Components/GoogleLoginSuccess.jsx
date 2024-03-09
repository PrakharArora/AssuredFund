import React, { useEffect } from 'react'

function GoogleLoginSuccess() {
  
    useEffect(()=> {
     setTimeout(()=>{
        window.close();
     } , 1000)
    } , [])

  return (
    <div>
      Thanks For Logging In
    </div>
  )
}

export default GoogleLoginSuccess
