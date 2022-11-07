import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { IconContext } from 'react-icons'

import './Navbar.css'
import { SidebarData } from './SidebarData'

function Navbar() {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  function NavElement(props) {
    let item = props.item
    const [mouseOver, setMouseOver] = useState(false);
    //const showSubbar = (val=!sidebar) => setMouseOver(val)

    if (item.subMenu === null) {
      return (
        <li key={props.index} className={item.cName} onClick={showSidebar}>
          <Link to={"/AlgorithmVisualizer" + item.path}>
            {item.icon}
            <span>{item.title}</span>
          </Link>
        </li>
      )
    }
    else {
      return (
        <>
        {/* main element */}
        <li key={props.index} className={item.cName} onMouseOver={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
          <Link>
            {item.icon}
            <span>{item.title}</span>
            {mouseOver ? <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.5em" width="3.5em" xmlns="http://www.w3.org/2000/svg"><path d="M192 128l128 128-128 128z"></path></svg>
            : <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="2.5em" width="3.5em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 14l-4-4h8z"></path></g></svg>}
          </Link>
        </li>
        {/* submenu */}
        <nav className={mouseOver ? "nav-submenu active" : "nav-submenu"}>
          <ul className='nav-menu-items'>
            <div className='nav-submenu-spacer'/>
            {item.subMenu.map((subItem, subIndex) => {
            return (
              <li key={subIndex+10} className={item.cName + " sub"} onClick={() => {setMouseOver(false); setSidebar()}} 
              onMouseOver={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
                <Link to={"/AlgorithmVisualizer" + item.path + subItem.algorithm}>
                  <span>{subItem.name}</span>
                </Link>
              </li>
            )})}
          </ul>
        </nav>
        </>
      )
    }
  }

  return (
  <IconContext.Provider value={{color: "#fff"}}>
  <div className="navbar">
    <Link to="#" className="menu-bars">
      <svg onClick={showSidebar} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
    </Link>
    <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
      <ul className='nav-menu-items'>
        <li className="navbar-toggle" onClick={showSidebar}>
          <Link to="#" className="menu-bars">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
          </Link>
        </li>
        {SidebarData.map((item, index) => {
          return <NavElement item={item} index={index}/>
        })}
      </ul>
    </nav>
  </div>
  </IconContext.Provider>
  )
}

export default Navbar
