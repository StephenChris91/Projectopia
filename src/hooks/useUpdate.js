import { useState, useEffect } from 'react'
import {  projectopiaauth, projectopiadb, projectopiastorage } from '../firebase/Config'
import { useAuthContext } from './useAuthContext'

export const useUpdate = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
  
    const update = async (displayName, thumbnail) => {
      
        try {
          // update CurrentUser profile
          const res = projectopiaauth.currentUser

          if(displayName){
            await res.updateProfile({ displayName })
          }

          if(thumbnail){
            const uploadPath = `thumbnails.${res.uid}/${thumbnail}`
            const img = await projectopiastorage.ref(uploadPath).put(thumbnail);
            const imgURL = await img.ref.getDownloadURL();


            await res.updateProfile({ photoURL: imgURL })
          }

          //update document

          await projectopiadb.collection('users').doc(res.uid).set({
            online: true,
            displayName: displayName || res.displayName,
            photoURL: res.photoURL,
          }, { merge: true })

          //dispatch update action
          dispatch({ type: 'UPDATE_USER', payload: res })

          if(!isCancelled){
            setIsPending(false)
            setError(null)
          }
        } catch (error) {
          if(!isCancelled){
            setIsPending(false)
            setError(error.message)
          }
        }
    }


      useEffect(() => {
        return () => setIsCancelled(true)
      }, [])


    return { update, isPending, error }
  }