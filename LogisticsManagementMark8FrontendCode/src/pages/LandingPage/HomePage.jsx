import React from "react"
import SectionOne from "./SectionOne"
import SectionTwo from "./SectionTwo"
import SectionThree from "./SectionThree"

import Footer from "./Footer"
function HomePage(){
  return(
    <>
    <div>
      <div><SectionOne/></div>
      <div><SectionTwo/></div>
      <div><SectionThree/></div>

      
    <Footer/>
    </div>
    
    </>
  )
}
export default HomePage