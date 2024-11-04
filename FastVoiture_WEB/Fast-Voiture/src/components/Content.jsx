import React from 'react'
import styles from "../assets/styles/Content.module.scss"
import Gallery from './Gallery'


function Content() {
  return (
    <div className={`${styles.content} container parallax p-30`}>Content
    <div className={` d-flex flex-row `}>
    <div className={`${styles.box} ` }>
    <Gallery/>
   
    </div>
    <div className={`p-30 ml-20 `}>
    <p>Lorem*60ssssssssssssssssssssssssssssssssssssssssssssssss
    ssssssssssssssssssssssssssssssssssssssssssssssssssssss
    sssssssssssssssssssssssssssssssssssssssssssssssssssss
    </p>
    </div>
   
    </div>
    </div>
  )
}

export default Content