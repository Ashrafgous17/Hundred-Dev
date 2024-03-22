import { useEffect, useState } from "react";
import useMagneticHover from "@/hooks/useMagneticHover";
import Script from "next/script";

import "../../public/assets/css/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../public/assets/css/bootstrap.min.css";
import "../../public/assets/css/boxicons.min.css";
import "../../public/assets/css/swiper-bundle.min.css";
import "../../public/assets/css/animate.min.css";
import "../../public/assets/css/style2.css";
import "node_modules/react-modal-video/css/modal-video.css";

export default function App({ Component, pageProps }) {
 
  useMagneticHover();
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <>
      
          <Component {...pageProps} />
          <Script id="wow" src="/js/wow.min.js"></Script>
          <Script
            id="initWow"
            strategy="lazyOnload"
          >{`new WOW().init();`}</Script>
        
      
      
    </>
  );
}
