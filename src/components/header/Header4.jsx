import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useRef } from "react";

const initialState = {
  activeMenu: "",
  activeSubMenu: "",
  isSidebarOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_MENU":
      return {
        ...state,

        activeMenu: state.activeMenu === action.menu ? "" : action.menu,
        activeSubMenu:
          state.activeMenu === action.menu ? state.activeSubMenu : "",
      };
    case "TOGGLE_SUB_MENU":
      return {
        ...state,
        activeSubMenu:
          state.activeSubMenu === action.subMenu ? "" : action.subMenu,
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case "setScrollY":
      return { ...state, scrollY: action.payload };
    default:
      return state;
  }
}

function Header4() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const headerRef = useRef(null);
  const handleScroll = () => {
    const { scrollY } = window;
    dispatch({ type: "setScrollY", payload: scrollY });
  };
  const currentRoute = useRouter().pathname;
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = (menu) => {
    dispatch({ type: "TOGGLE_MENU", menu });
  };

  const toggleSubMenu = (subMenu) => {
    dispatch({ type: "TOGGLE_SUB_MENU", subMenu });
  };

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_MENU", menu: "" });
    dispatch({ type: "TOGGLE_SUB_MENU", subMenu: "" });
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  return (
    <header
      ref={headerRef}
      className={`header-area2 style-2 two ${
        state.scrollY > 10 ? "sticky" : ""
      }`}
    >
      <div className="header-logo">
        <Link legacyBehavior href="/">
          <a>
            <img alt="image" className="img-fluid" src="assets/img/logo.svg" />
          </a>
        </Link>
      </div>
      <div className={`main-menu ${state.isSidebarOpen ? "show-menu" : ""}`}>
        <div className="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
          <div className="mobile-logo-wrap">
            <Link legacyBehavior href="/">
              <a>
                <img alt="image" src="assets/img/logo.svg" />
              </a>
            </Link>
          </div>
        </div>
        <ul className="menu-list">
          {/* <li className={`menu-item-has-children ${currentRoute === "/index2"?"active":""}`}>
            <a
              href="#"
              className={`drop-down ${
                state.activeMenu === "home-one" ? "active" : ""
              }`}
              onClick={() => toggleMenu("home-one")}
            >
              Home
            </a>
            <i
              className={`bi bi-plus dropdown-icon ${
                state.activeMenu === "home-one" ? "active" : ""
              }`}
              onClick={() => toggleMenu("home-one")}
            />
            <ul
              className={`sub-menu ${
                state.activeMenu === "home-one" ? "d-block" : ""
              }`}
            >
              <li>
                <Link legacyBehavior href="/">
                  <a>Home 01</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/index2">
                  <a className={`menu-item-has-children ${currentRoute === "/index2"?"active":""}`}>Home 02</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/index3">
                  <a>Home 03</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/index4">
                  <a>Home 04</a>
                </Link>
              </li>
            </ul>
          </li> */}
       
          <li className="menu-item-has-children">
            
            <a
              href="#"
              className={`drop-down ${
                state.activeMenu === "service" ? "active" : ""
              }`}
              onClick={() => toggleMenu("service")}
            >
              Services
            </a>{" "}
            <i
              className={`bi bi-plus dropdown-icon ${
                state.activeMenu === "service" ? "active" : ""
              }`}
              onClick={() => toggleMenu("service")}
            />
            <ul
              className={`sub-menu ${
                state.activeMenu === "service" ? "d-block" : ""
              }`}
            >
               <li>
                <Link legacyBehavior href="/service-details">
                  <a>UX Design</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/service-details">
                  <a>Web Development</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/service-details">
                  <a>App Development</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/service-details">
                  <a>SaaS Development</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/service-details">
                  <a>MVP Development</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/service-details">
                  <a>Ecom Solutions</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/service-details">
                  <a>AI Integration</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/service-details">
                  <a>IOT Development</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/service-details">
                  <a>Chatbot Integration</a>
                </Link>
              </li>
             
            </ul>
          </li>
          {/* <li className="menu-item-has-children">
            <a href="#" className="drop-down">
              Expertise
            </a>
            <i
              className={`bi bi-plus dropdown-icon ${
                state.activeMenu === "project" ? "active" : ""
              }`}
              onClick={() => toggleMenu("project")}
            />
            <ul
              className={`sub-menu ${
                state.activeMenu === "project" ? "d-block" : ""
              }`}
            >
              <li>
                <Link legacyBehavior href="/index2">
                  <a>AI Development</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/project-masonary">
                  <a>IOT Development</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/project-details">
                  <a>Ecom Solutions</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/project-masonary">
                  <a>Chatbot Development</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/project-masonary">
                  <a>Blockchain Development</a>
                </Link>
              </li>
            </ul>
          </li> */}
           <li>
            <Link legacyBehavior href="/pricing2">
              <a>Pricing</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/case-study">
              <a>Case Studies</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/blog">
              <a>Blog</a>
            </Link>
          </li>
        
          {/* <li className="menu-item-has-children">
            <a href="#" className="drop-down">
           Project
            </a>
            <i
              className={`bi bi-plus dropdown-icon ${
                state.activeMenu === "project" ? "active" : ""
              }`}
              onClick={() => toggleMenu("project")}
            />
            <ul
              className={`sub-menu ${
                state.activeMenu === "project" ? "d-block" : ""
              }`}
            >
              <li>
                <Link legacyBehavior href="/project">
                  <a>Project</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/project-masonary">
                  <a>Project Masonry</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/project-details">
                  <a>Project Details</a>
                </Link>
              </li>
            </ul>
          </li> */}
       
          {/* <li className="menu-item-has-children">
            <a
              href="#"
              className={`drop-down ${
                state.activeMenu === "case" ? "active" : ""
              }`}
            >
              Case Study
            </a>
            <i
              className={`bi bi-plus dropdown-icon ${
                state.activeMenu === "case" ? "active" : ""
              }`}
              onClick={() => toggleMenu("case")}
            />
            <ul
              className={`sub-menu ${
                state.activeMenu === "case" ? "d-block" : ""
              }`}
            >
              <li>
                <Link legacyBehavior href="/case-study">
                  <a>Case study 01</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/case-study2">
                  <a>Case study 02</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/case-study-standard">
                  <a>Case study standard</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/case-study-details">
                  <a>Case study Details</a>
                </Link>
              </li>
            </ul>
          </li> */}
          {/* <li className="menu-item-has-children">
            <a
              href="#"
              className={`drop-down ${
                state.activeMenu === "blog" ? "active" : ""
              }`}
              onClick={() => toggleMenu("blog")}
            >
              Blog
            </a>
            <i
              className={`bi bi-plus dropdown-icon ${
                state.activeMenu === "blog" ? "active" : ""
              }`}
              onClick={() => toggleMenu("blog")}
            />
            <ul
              className={`sub-menu ${
                state.activeMenu === "blog" ? "d-block" : ""
              }`}
            >
              <li>
                <Link legacyBehavior href="/blog">
                  <a>Blog</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/blog-standard">
                  <a>Blog standard</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/blog-sidebar">
                  <a>Blog Sidebar</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/blog-masonary">
                  <a>Blog Masonary</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/blog-details">
                  <a>Blog Details</a>
                </Link>
              </li>
            </ul>
          </li> */}
        </ul>
        <div className="d-lg-none d-block">
          <form className="mobile-menu-form">
            
            <div className="email pt-20 d-flex align-items-center">
              <div className="email-icon">
                <svg
                  width={26}
                  height={26}
                  viewBox="0 0 26 26"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_461_205)">
                    <path d="M23.5117 3.30075H2.38674C1.04261 3.30075 -0.0507812 4.39414 -0.0507812 5.73827V20.3633C-0.0507812 21.7074 1.04261 22.8008 2.38674 22.8008H23.5117C24.8558 22.8008 25.9492 21.7074 25.9492 20.3633V5.73827C25.9492 4.39414 24.8558 3.30075 23.5117 3.30075ZM23.5117 4.92574C23.6221 4.92574 23.7271 4.94865 23.8231 4.98865L12.9492 14.4131L2.07526 4.98865C2.17127 4.9487 2.27629 4.92574 2.38668 4.92574H23.5117ZM23.5117 21.1757H2.38674C1.93844 21.1757 1.57421 20.8116 1.57421 20.3632V6.70547L12.4168 16.1024C12.57 16.2349 12.7596 16.3008 12.9492 16.3008C13.1388 16.3008 13.3285 16.2349 13.4816 16.1024L24.3242 6.70547V20.3633C24.3242 20.8116 23.96 21.1757 23.5117 21.1757Z"></path>
                  </g>
                </svg>
              </div>
              <div className="email-info">
                <span>Email Now</span>
                <h6>
                  <a href="mailto:example@gmail.com">hello@hundreddev.com</a>
                </h6>
              </div>
            </div>
          </form>
          <div className="header-btn5">
            <Link legacyBehavior href="/contact">
              <a className="primary-btn3">Book a Call</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="nav-right d-flex jsutify-content-end align-items-center">
        <div className="header-btn d-sm-flex d-none">
          <Link legacyBehavior href="/contact">
            <a>Book a Call</a>
          </Link>
        </div>
        <div
          className={`sidebar-button mobile-menu-btn ${
            state.isSidebarOpen ? "active" : ""
          }`}
          onClick={toggleSidebar}
        >
          <span />
        </div>
      </div>
    </header>
  );
}

export default Header4;
