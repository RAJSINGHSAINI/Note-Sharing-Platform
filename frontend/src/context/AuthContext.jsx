import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser } from '../api/auth.api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getUser(){
            const data = await getCurrentUser();
            if(data.student){
                setUser(data.student);
            }
        }
        getUser();
    }, []);

    return (
        <AuthContext.Provider
            value={
                {
                    user,
                    setUser,
                    loading,
                    setLoading
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider