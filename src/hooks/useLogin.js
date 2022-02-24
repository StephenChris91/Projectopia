import { useState, useEffect } from 'react'
import {  projectopiaauth, projectopiadb } from '../firebase/Config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)
  
    try {
      // login
      const res = await projectopiaauth.signInWithEmailAndPassword(email, password)

       //update user status as online 
       await projectopiadb.collection('users').doc(res.user.uid).update({
        online: true
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

     

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isPending, error }
}