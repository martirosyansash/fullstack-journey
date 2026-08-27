import { useState, useEffect } from "react";


function useWindowWidth() { 

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => { 
        function resizeWindow() { 
            setWidth(window.innerWidth)
        }

        window.addEventListener("resize", resizeWindow)
        return () => { 
            window.removeEventListener("resize", resizeWindow)
        }
    }, [])
    
    return width;
}
export default useWindowWidth;