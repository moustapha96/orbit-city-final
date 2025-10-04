/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { deleteCookie, hasCookie, getCookie, setCookie } from "cookies-next";


const AuthContext = createContext(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

const authSessionKey = "__CCBME_REACT_AUTH__PROD";
const authSessionKeyToken = "__CCBME_REACT_AUTH__TOKEN__PROD";
const authSessionKeyUserInfo = "__CCBME_REACT_AUTH__USER_INFO__PROD";
const authSessionKeySession = "__CCBME_REACT_AUTH__SESSION__PROD";
const authSessionKeyCompany = "__CCBME_REACT_AUTH__COMPANY__PROD";
const authSessionKeyUserContext = "__CCBME_REACT_AUTH__USER_CONTEXT__PROD";
const authSessionKeyIsVerified = "__CCBME_REACT_AUTH__IS_VERIFIED__PROD";
const authSessionKeyParentId = "__CCBME_REACT_AUTH__PARET_ID__PROD";

export function AuthProvider({ children }) {

  const [parent, setParent] = useState(() => {
    const parentFomCookies = getCookie(authSessionKeyParentId);
    return parentFomCookies ? JSON.parse(parentFomCookies) : undefined;
  });

  const [company, setCompany] = useState(() => {
    const companyFromCookie = getCookie(authSessionKeyCompany);
    return companyFromCookie ? JSON.parse(companyFromCookie) : undefined;
  });

  const [userContext, setUserContext] = useState(() => {
    const userContextFromCookie = getCookie(authSessionKeyUserContext);
    return userContextFromCookie ? JSON.parse(userContextFromCookie) : undefined;
  });

  const [isVerified, setIsVerified] = useState(() => {
    const isVerifiedFromCookie = getCookie(authSessionKeyIsVerified);
    return isVerifiedFromCookie ? JSON.parse(isVerifiedFromCookie) : undefined;
  });

  const [token, setToken] = useState(() => {
    const tokenFromCookie = getCookie(authSessionKeyToken);
    return tokenFromCookie ? JSON.parse(tokenFromCookie) : undefined;
  });

  const [userInfo, setUserInfo] = useState(() => {
    const userInfoFromCookie = getCookie(authSessionKeyUserInfo);
    return userInfoFromCookie ? JSON.parse(userInfoFromCookie) : undefined;
  });

  const [session, setSession] = useState(() => {
    const sessionFromCookie = getCookie(authSessionKey);
    return sessionFromCookie ? JSON.parse(sessionFromCookie) : undefined;
  });

  const saveUserInfo = useCallback((data) => {
    // console.log("data ", data);
    setCookie(authSessionKeyUserInfo, JSON.stringify(data.user_info));
    setUserInfo(data.user_info);
  }, [])



  const saveSession = useCallback((data) => {
    updateContextIfChanged(data.user_info, userInfo, setUserInfo);
    updateContextIfChanged(data.company, company, setCompany);
    updateContextIfChanged(data.parent, parent, setParent);
    updateContextIfChanged(data.user_context, userContext, setUserContext);
    updateContextIfChanged(data.is_verified, isVerified, setIsVerified);

    setCookie(authSessionKey, JSON.stringify(data));
    setCookie(authSessionKeyToken, JSON.stringify(data.access_token));
    setCookie(authSessionKeyUserInfo, JSON.stringify(data.user_info));
    setCookie(authSessionKeyCompany, JSON.stringify(data.company));
    setCookie(authSessionKeyIsVerified, JSON.stringify(data.is_verified));
    setCookie(authSessionKeyParentId, JSON.stringify(data.parent));
  }, [userInfo, company, parent, userContext, isVerified]);


  const removeSession = useCallback(() => {
    deleteCookie(authSessionKey);
    deleteCookie(authSessionKeyToken);
    deleteCookie(authSessionKeyUserInfo);
    deleteCookie(authSessionKeySession);
    deleteCookie(authSessionKeyCompany);
    deleteCookie(authSessionKeyIsVerified);
    deleteCookie(authSessionKeyUserContext);
    deleteCookie(authSessionKeyParentId);

    setToken(undefined);
    setUserInfo(undefined);
    setSession(undefined);
    setCompany(undefined);
    setIsVerified(undefined);
    setUserContext(undefined);
    setParent(undefined)
  }, []);

  const logout = useCallback(async () => {
    // console.log("Logging out...");
    removeSession();
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("is_verified");
    localStorage.removeItem("refresh_expires_in");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("company_id");
    localStorage.removeItem("user_context");
    localStorage.removeItem("partner_id");
    localStorage.removeItem("parent");
    // console.log("Logout complete");

  }, [removeSession]);

  const updateContextIfChanged = (newData, oldData, updateFn) => {
    if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
      // console.log("Mise à jour nécessaire :", newData);
      updateFn(newData);
    }
  };

  const refreshContext = useCallback(async (newData) => {
    // Mise à jour conditionnelle pour chaque partie du contexte
    updateContextIfChanged(newData.user_info, userInfo, setUserInfo);
    updateContextIfChanged(newData.company, company, setCompany);
    updateContextIfChanged(newData.parent, parent, setParent);
    updateContextIfChanged(newData.user_context, userContext, setUserContext);
    updateContextIfChanged(newData.is_verified, isVerified, setIsVerified);
  }, [userInfo, company, parent, userContext, isVerified]);



  const getToken = useCallback(() => token, [token]);
  const getUserInfo = useCallback(() => userInfo, [userInfo]);
  const getCompany = useCallback(() => company, [company]);
  const getUserContext = useCallback(() => userContext, [userContext]);

  const contextValue = useMemo(
    () => ({
      session,
      logout,
      user: userInfo,
      token,
      userInfo,
      company,
      parent,
      userContext,
      isVerified,
      getUserInfo,
      getCompany,
      getUserContext,
      getToken,
      saveSession,
      saveUserInfo,
      removeSession,
      isAuthenticated: hasCookie(authSessionKey) && isVerified,
      refreshContext
    }),
    [session, logout, userInfo, token, company, parent, userContext, isVerified, getUserInfo, getCompany, getUserContext, getToken, saveSession, saveUserInfo, removeSession, refreshContext]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}




// "use client"

// import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react"
// import { deleteCookie, hasCookie, getCookie, setCookie } from "cookies-next"

// const AuthContext = createContext(undefined)

// // eslint-disable-next-line react-refresh/only-export-components
// export function useAuthContext() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuthContext must be used within an AuthProvider")
//   }
//   return context
// }

// const authSessionKey = "__CCBME_REACT_AUTH__PROD"
// const authSessionKeyToken = "__CCBME_REACT_AUTH__TOKEN__PROD"
// const authSessionKeyUserInfo = "__CCBME_REACT_AUTH__USER_INFO__PROD"
// const authSessionKeySession = "__CCBME_REACT_AUTH__SESSION__PROD"
// const authSessionKeyCompany = "__CCBME_REACT_AUTH__COMPANY__PROD"
// const authSessionKeyUserContext = "__CCBME_REACT_AUTH__USER_CONTEXT__PROD"
// const authSessionKeyIsVerified = "__CCBME_REACT_AUTH__IS_VERIFIED__PROD"
// const authSessionKeyParentId = "__CCBME_REACT_AUTH__PARET_ID__PROD"


// export function AuthProvider({ children }) {
//   const [parent, setParent] = useState(() => {
//     const parentFromCookies = getCookie(authSessionKeyParentId)
//     return parentFromCookies ? JSON.parse(parentFromCookies) : undefined
//   })

//   const [company, setCompany] = useState(() => {
//     const companyFromCookie = getCookie(authSessionKeyCompany)
//     return companyFromCookie ? JSON.parse(companyFromCookie) : undefined
//   })

//   const [userContext, setUserContext] = useState(() => {
//     const userContextFromCookie = getCookie(authSessionKeyUserContext)
//     return userContextFromCookie ? JSON.parse(userContextFromCookie) : undefined
//   })

//   const [isVerified, setIsVerified] = useState(() => {
//     const isVerifiedFromCookie = getCookie(authSessionKeyIsVerified)
//     return isVerifiedFromCookie ? JSON.parse(isVerifiedFromCookie) : undefined
//   })

//   const [token, setToken] = useState(() => {
//     const tokenFromCookie = getCookie(authSessionKeyToken)
//     return tokenFromCookie ? JSON.parse(tokenFromCookie) : undefined
//   })

//   const [userInfo, setUserInfo] = useState(() => {
//     const userInfoFromCookie = getCookie(authSessionKeyUserInfo)
//     return userInfoFromCookie ? JSON.parse(userInfoFromCookie) : undefined
//   })

//   const [session, setSession] = useState(() => {
//     const sessionFromCookie = getCookie(authSessionKey)
//     return sessionFromCookie ? JSON.parse(sessionFromCookie) : undefined
//   })

//   const saveUserInfo = useCallback((data) => {
//     setCookie(authSessionKeyUserInfo, JSON.stringify(data.user_info))
//     setUserInfo(data.user_info)
//   }, [])

//   const updateContextIfChanged = (newData, oldData, updateFn) => {
//     if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
//       updateFn(newData)
//     }
//   }

//   const saveSession = useCallback(
//     (data) => {
//       updateContextIfChanged(data.user_info, userInfo, setUserInfo)
//       updateContextIfChanged(data.company, company, setCompany)
//       updateContextIfChanged(data.parent, parent, setParent)
//       updateContextIfChanged(data.user_context, userContext, setUserContext)
//       updateContextIfChanged(data.is_verified, isVerified, setIsVerified)
//       updateContextIfChanged(data, session, setSession)
//       updateContextIfChanged(data.access_token, token, setToken)

//       // Save to cookies with longer expiration (7 days)
//       const cookieOptions = { maxAge: 7 * 24 * 60 * 60 } // 7 days in seconds
//       setCookie(authSessionKey, JSON.stringify(data), cookieOptions)
//       setCookie(authSessionKeyToken, JSON.stringify(data.access_token), cookieOptions)
//       setCookie(authSessionKeyUserInfo, JSON.stringify(data.user_info), cookieOptions)
//       setCookie(authSessionKeyCompany, JSON.stringify(data.company), cookieOptions)
//       setCookie(authSessionKeyIsVerified, JSON.stringify(data.is_verified), cookieOptions)
//       setCookie(authSessionKeyParentId, JSON.stringify(data.parent), cookieOptions)
//       setCookie(authSessionKeyUserContext, JSON.stringify(data.user_context), cookieOptions)
//       setCookie(authSessionKeySession, JSON.stringify(data), cookieOptions)

//       // Also save to localStorage for cross-tab persistence
//       localStorage.setItem("user", JSON.stringify(data.user_info))
//       localStorage.setItem("access_token", data.access_token)
//       localStorage.setItem("token", data.access_token)
//       localStorage.setItem("uid", data.uid)
//       localStorage.setItem("expires_in", data.expires_in)
//       localStorage.setItem("is_verified", data.is_verified)
//       localStorage.setItem("refresh_expires_in", data.refresh_expires_in)
//       localStorage.setItem("refresh_token", data.refresh_token)
//       localStorage.setItem("company_id", data.company_id)
//       localStorage.setItem("user_context", JSON.stringify(data.user_context))
//       localStorage.setItem("partner_id", data.user_info.partner_id)
//       localStorage.setItem("parent", JSON.stringify(data.parent))

//       // Dispatch a custom event to notify other tabs
//       window.dispatchEvent(new CustomEvent("auth-updated", { detail: data }))
//     },
//     [userInfo, company, parent, userContext, isVerified, session, token],
//   )

//   const removeSession = useCallback(() => {
//     deleteCookie(authSessionKey)
//     deleteCookie(authSessionKeyToken)
//     deleteCookie(authSessionKeyUserInfo)
//     deleteCookie(authSessionKeySession)
//     deleteCookie(authSessionKeyCompany)
//     deleteCookie(authSessionKeyIsVerified)
//     deleteCookie(authSessionKeyUserContext)
//     deleteCookie(authSessionKeyParentId)

//     setToken(undefined)
//     setUserInfo(undefined)
//     setSession(undefined)
//     setCompany(undefined)
//     setIsVerified(undefined)
//     setUserContext(undefined)
//     setParent(undefined)

//     localStorage.removeItem("user")
//     localStorage.removeItem("access_token")
//     localStorage.removeItem("token")
//     localStorage.removeItem("uid")
//     localStorage.removeItem("expires_in")
//     localStorage.removeItem("is_verified")
//     localStorage.removeItem("refresh_expires_in")
//     localStorage.removeItem("refresh_token")
//     localStorage.removeItem("company_id")
//     localStorage.removeItem("user_context")
//     localStorage.removeItem("partner_id")
//     localStorage.removeItem("parent")

//     // Dispatch a custom event to notify other tabs
//     window.dispatchEvent(new CustomEvent("auth-removed"))
//   }, [])

//   const logout = useCallback(async () => {
//     removeSession()
//   }, [removeSession])

//   const refreshContext = useCallback(
//     async (newData) => {
//       // Mise à jour conditionnelle pour chaque partie du contexte
//       updateContextIfChanged(newData.user_info, userInfo, setUserInfo)
//       updateContextIfChanged(newData.company, company, setCompany)
//       updateContextIfChanged(newData.parent, parent, setParent)
//       updateContextIfChanged(newData.user_context, userContext, setUserContext)
//       updateContextIfChanged(newData.is_verified, isVerified, setIsVerified)
//     },
//     [userInfo, company, parent, userContext, isVerified],
//   )

//   // Initialize from localStorage if cookies are not available
//   useEffect(() => {
//     const initializeFromStorage = () => {
//       // If we already have data from cookies, don't override
//       if (token && userInfo) return

//       const accessToken = localStorage.getItem("access_token")
//       const userFromStorage = localStorage.getItem("user")
//       const isVerifiedFromStorage = localStorage.getItem("is_verified")

//       if (accessToken && userFromStorage) {
//         if (!token) setToken(accessToken)
//         if (!userInfo) setUserInfo(JSON.parse(userFromStorage))
//         if (!isVerified && isVerifiedFromStorage) setIsVerified(JSON.parse(isVerifiedFromStorage))

//         // Try to get other data
//         const companyFromStorage = localStorage.getItem("company_id")
//         const userContextFromStorage = localStorage.getItem("user_context")
//         const parentFromStorage = localStorage.getItem("parent")

//         if (companyFromStorage && !company) {
//           try {
//             setCompany(JSON.parse(companyFromStorage))
//           } catch (e) {
//             console.error("Error parsing company from storage", e)
//           }
//         }

//         if (userContextFromStorage && !userContext) {
//           try {
//             setUserContext(JSON.parse(userContextFromStorage))
//           } catch (e) {
//             console.error("Error parsing user context from storage", e)
//           }
//         }

//         if (parentFromStorage && !parent) {
//           try {
//             setParent(JSON.parse(parentFromStorage))
//           } catch (e) {
//             console.error("Error parsing parent from storage", e)
//           }
//         }
//       }
//     }

//     initializeFromStorage()
//   }, [token, userInfo, company, isVerified, userContext, parent])

//   // Listen for storage events to sync state across tabs
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === "accessToken") {
//         if (e.newValue) {
//           // Token was added or updated in another tab
//           const userFromStorage = localStorage.getItem("user")
//           if (userFromStorage) {
//             setToken(e.newValue)
//             setUserInfo(JSON.parse(userFromStorage))
//             setIsVerified(localStorage.getItem("is_verified") === "true")
//           }
//         } else {
//           // Token was removed in another tab
//           removeSession()
//         }
//       }
//     }

//     // Listen for custom events from other tabs
//     const handleAuthUpdated = (e) => {
//       const data = e.detail
//       if (data) {
//         updateContextIfChanged(data.user_info, userInfo, setUserInfo)
//         updateContextIfChanged(data.company, company, setCompany)
//         updateContextIfChanged(data.parent, parent, setParent)
//         updateContextIfChanged(data.user_context, userContext, setUserContext)
//         updateContextIfChanged(data.is_verified, isVerified, setIsVerified)
//         updateContextIfChanged(data.access_token, token, setToken)
//       }
//     }

//     const handleAuthRemoved = () => {
//       removeSession()
//     }

//     window.addEventListener("storage", handleStorageChange)
//     window.addEventListener("auth-updated", handleAuthUpdated)
//     window.addEventListener("auth-removed", handleAuthRemoved)

//     return () => {
//       window.removeEventListener("storage", handleStorageChange)
//       window.removeEventListener("auth-updated", handleAuthUpdated)
//       window.removeEventListener("auth-removed", handleAuthRemoved)
//     }
//   }, [userInfo, company, parent, userContext, isVerified, token, removeSession])

//   const getToken = useCallback(() => token, [token])
//   const getUserInfo = useCallback(() => userInfo, [userInfo])
//   const getCompany = useCallback(() => company, [company])
//   const getUserContext = useCallback(() => userContext, [userContext])

//   const contextValue = useMemo(
//     () => ({
//       session,
//       logout,
//       user: userInfo,
//       token,
//       userInfo,
//       company,
//       parent,
//       userContext,
//       isVerified,
//       getUserInfo,
//       getCompany,
//       getUserContext,
//       getToken,
//       saveSession,
//       saveUserInfo,
//       removeSession,
//       isAuthenticated:
//         (hasCookie(authSessionKey) || localStorage.getItem("accessToken")) &&
//         (isVerified || localStorage.getItem("is_verified") === "true"),
//       refreshContext,
//     }),
//     [
//       session,
//       logout,
//       userInfo,
//       token,
//       company,
//       parent,
//       userContext,
//       isVerified,
//       getUserInfo,
//       getCompany,
//       getUserContext,
//       getToken,
//       saveSession,
//       saveUserInfo,
//       removeSession,
//       refreshContext,
//     ],
//   )

//   return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
// }



// "use client"

// import { createContext, useContext, useState, useMemo, useCallback } from "react"
// import { deleteCookie, hasCookie, getCookie, setCookie } from "cookies-next"



// const AuthContext = createContext(undefined)

// // Cookie keys
// const authSessionKey = "__CCBME_REACT_AUTH__PROD"
// const authSessionKeyToken = "__CCBME_REACT_AUTH__TOKEN__PROD"
// const authSessionKeyUserInfo = "__CCBME_REACT_AUTH__USER_INFO__PROD"
// const authSessionKeySession = "__CCBME_REACT_AUTH__SESSION__PROD"
// const authSessionKeyCompany = "__CCBME_REACT_AUTH__COMPANY__PROD"
// const authSessionKeyUserContext = "__CCBME_REACT_AUTH__USER_CONTEXT__PROD"
// const authSessionKeyIsVerified = "__CCBME_REACT_AUTH__IS_VERIFIED__PROD"
// const authSessionKeyParentId = "__CCBME_REACT_AUTH__PARENT_ID__PROD"

// // Cookie options to ensure persistence across tabs/windows
// const cookieOptions = {
//   maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
//   path: "/", // Available across the entire site
//   sameSite: "strict", // Restrict to same site
//   secure: import.meta.env.MODE === "production",
// }

// export function useAuthContext() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuthContext must be used within an AuthProvider")
//   }
//   return context
// }

// // export function useAuthContext() {
// //   const context = useContext(AuthContext)
// //   if (context === undefined) {
// //     throw new Error("useAuthContext must be used within an AuthProvider")
// //   }
// //   return context
// // }

// export function AuthProvider({ children }) {
//   // Initialize state from cookies with proper parsing and error handling
//   const [parent, setParent] = useState(() => {
//     try {
//       const parentFromCookies = getCookie(authSessionKeyParentId)
//       return parentFromCookies ? JSON.parse(String(parentFromCookies)) : undefined
//     } catch (error) {
//       console.error("Error parsing parent from cookie:", error)
//       return undefined
//     }
//   })

//   const [company, setCompany] = useState(() => {
//     try {
//       const companyFromCookie = getCookie(authSessionKeyCompany)
//       return companyFromCookie ? JSON.parse(String(companyFromCookie)) : undefined
//     } catch (error) {
//       console.error("Error parsing company from cookie:", error)
//       return undefined
//     }
//   })

//   const [userContext, setUserContext] = useState(() => {
//     try {
//       const userContextFromCookie = getCookie(authSessionKeyUserContext)
//       return userContextFromCookie ? JSON.parse(String(userContextFromCookie)) : undefined
//     } catch (error) {
//       console.error("Error parsing userContext from cookie:", error)
//       return undefined
//     }
//   })

//   const [isVerified, setIsVerified] = useState(() => {
//     try {
//       const isVerifiedFromCookie = getCookie(authSessionKeyIsVerified)
//       return isVerifiedFromCookie ? JSON.parse(String(isVerifiedFromCookie)) : undefined
//     } catch (error) {
//       console.error("Error parsing isVerified from cookie:", error)
//       return undefined
//     }
//   })

//   const [token, setToken] = useState(() => {
//     try {
//       const tokenFromCookie = getCookie(authSessionKeyToken)
//       return tokenFromCookie ? JSON.parse(String(tokenFromCookie)) : undefined
//     } catch (error) {
//       console.error("Error parsing token from cookie:", error)
//       return undefined
//     }
//   })

//   const [userInfo, setUserInfo] = useState(() => {
//     try {
//       const userInfoFromCookie = getCookie(authSessionKeyUserInfo)
//       return userInfoFromCookie ? JSON.parse(String(userInfoFromCookie)) : undefined
//     } catch (error) {
//       console.error("Error parsing userInfo from cookie:", error)
//       return undefined
//     }
//   })

//   const [session, setSession] = useState(() => {
//     try {
//       const sessionFromCookie = getCookie(authSessionKey)
//       return sessionFromCookie ? JSON.parse(String(sessionFromCookie)) : undefined
//     } catch (error) {
//       console.error("Error parsing session from cookie:", error)
//       return undefined
//     }
//   })

//   // Helper function to update context if changed
//   const updateContextIfChanged = (newData, oldData, updateFn) => {
//     if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
//       updateFn(newData)
//     }
//   }

//   // Save user info with proper cookie options
//   const saveUserInfo = useCallback((data) => {
//     setCookie(authSessionKeyUserInfo, JSON.stringify(data.user_info), cookieOptions)
//     setUserInfo(data.user_info)
//   }, [])

//   // Save session with proper cookie options
//   const saveSession = useCallback(
//     (data) => {
//       updateContextIfChanged(data.user_info, userInfo, setUserInfo)
//       updateContextIfChanged(data.company, company, setCompany)
//       updateContextIfChanged(data.parent, parent, setParent)
//       updateContextIfChanged(data.user_context, userContext, setUserContext)
//       updateContextIfChanged(data.is_verified, isVerified, setIsVerified)

//       // Set cookies with proper options
//       setCookie(authSessionKey, JSON.stringify(data), cookieOptions)
//       setCookie(authSessionKeyToken, JSON.stringify(data.access_token), cookieOptions)
//       setCookie(authSessionKeyUserInfo, JSON.stringify(data.user_info), cookieOptions)
//       setCookie(authSessionKeySession, JSON.stringify(data), cookieOptions)
//       setCookie(authSessionKeyCompany, JSON.stringify(data.company), cookieOptions)
//       setCookie(authSessionKeyIsVerified, JSON.stringify(data.is_verified), cookieOptions)
//       setCookie(authSessionKeyUserContext, JSON.stringify(data.user_context), cookieOptions)
//       setCookie(authSessionKeyParentId, JSON.stringify(data.parent), cookieOptions)

//       // Update state
//       setToken(data.access_token)
//       setUserInfo(data.user_info)
//       setSession(data)
//       setCompany(data.company)
//       setIsVerified(data.is_verified)
//       setUserContext(data.user_context)
//       setParent(data.parent)
//     },
//     [userInfo, company, parent, userContext, isVerified],
//   )

//   // Remove session and clear cookies
//   const removeSession = useCallback(() => {
//     // Delete cookies with proper path
//     const deleteOptions = { path: "/" }
//     deleteCookie(authSessionKey, deleteOptions)
//     deleteCookie(authSessionKeyToken, deleteOptions)
//     deleteCookie(authSessionKeyUserInfo, deleteOptions)
//     deleteCookie(authSessionKeySession, deleteOptions)
//     deleteCookie(authSessionKeyCompany, deleteOptions)
//     deleteCookie(authSessionKeyIsVerified, deleteOptions)
//     deleteCookie(authSessionKeyUserContext, deleteOptions)
//     deleteCookie(authSessionKeyParentId, deleteOptions)

//     // Reset state
//     setToken(undefined)
//     setUserInfo(undefined)
//     setSession(undefined)
//     setCompany(undefined)
//     setIsVerified(undefined)
//     setUserContext(undefined)
//     setParent(undefined)
//   }, [])

//   // Logout function
//   const logout = useCallback(async () => {
//     removeSession()

//     // Clear localStorage items
//     const localStorageItems = [
//       "user",
//       "accessToken",
//       "token",
//       "uid",
//       "expires_in",
//       "is_verified",
//       "refresh_expires_in",
//       "refresh_token",
//       "company_id",
//       "user_context",
//       "partner_id",
//       "parent",
//     ]

//     localStorageItems.forEach((item) => localStorage.removeItem(item))
//   }, [removeSession])

//   // Refresh context with new data
//   const refreshContext = useCallback(
//     async (newData) => {
//       updateContextIfChanged(newData.user_info, userInfo, setUserInfo)
//       updateContextIfChanged(newData.company, company, setCompany)
//       updateContextIfChanged(newData.parent, parent, setParent)
//       updateContextIfChanged(newData.user_context, userContext, setUserContext)
//       updateContextIfChanged(newData.is_verified, isVerified, setIsVerified)

//       // Update cookies with new data
//       if (newData.user_info) {
//         setCookie(authSessionKeyUserInfo, JSON.stringify(newData.user_info), cookieOptions)
//       }
//       if (newData.company) {
//         setCookie(authSessionKeyCompany, JSON.stringify(newData.company), cookieOptions)
//       }
//       if (newData.parent) {
//         setCookie(authSessionKeyParentId, JSON.stringify(newData.parent), cookieOptions)
//       }
//       if (newData.user_context) {
//         setCookie(authSessionKeyUserContext, JSON.stringify(newData.user_context), cookieOptions)
//       }
//       if (newData.is_verified) {
//         setCookie(authSessionKeyIsVerified, JSON.stringify(newData.is_verified), cookieOptions)
//       }
//     },
//     [userInfo, company, parent, userContext, isVerified],
//   )

//   // Getter functions
//   const getToken = useCallback(() => token, [token])
//   const getUserInfo = useCallback(() => userInfo, [userInfo])
//   const getCompany = useCallback(() => company, [company])
//   const getUserContext = useCallback(() => userContext, [userContext])

//   // Create context value with memoization
//   const contextValue = useMemo(
//     () => ({
//       session,
//       logout,
//       user: userInfo,
//       token,
//       userInfo,
//       company,
//       parent,
//       userContext,
//       isVerified,
//       getUserInfo,
//       getCompany,
//       getUserContext,
//       getToken,
//       saveSession,
//       saveUserInfo,
//       removeSession,
//       isAuthenticated: Boolean(hasCookie(authSessionKey) && isVerified),
//       refreshContext,
//     }),
//     [
//       session,
//       logout,
//       userInfo,
//       token,
//       company,
//       parent,
//       userContext,
//       isVerified,
//       getUserInfo,
//       getCompany,
//       getUserContext,
//       getToken,
//       saveSession,
//       saveUserInfo,
//       removeSession,
//       refreshContext,
//       isVerified,
//     ],
//   )

//   return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
// }
