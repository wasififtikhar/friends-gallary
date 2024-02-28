'use client'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";


const Authorization = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const {loggedInUser} = useSelector((state) => state.userData)
  const pathname = usePathname();
  const router = useRouter();
  const protectedRoutes = ['/apiUsers']
  const unProtectedRoutes = ['/login', '/registeration', '/'] 

  const routeChecker = (routesArray = [], currentRoute=``) => {
    if(routesArray.length == 0 || !currentRoute) return false

    return routesArray.includes(currentRoute)
  }
  const authcheck  = () => {
    if(loggedInUser){
      if(unProtectedRoutes.includes(pathname)){
        router.push(protectedRoutes[0])
      }
    }else{
      if(protectedRoutes.includes(pathname)){
        router.push(unProtectedRoutes[0])
      }
    }
  }

useEffect(() => {
  // authcheck()
}, [loggedInUser])

  return (
    <div>
      {children}
    </div>
  )
}

export default Authorization;
