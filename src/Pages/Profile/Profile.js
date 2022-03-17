import { useFirestore } from "../../hooks/useFirestore"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useCollection } from "../../hooks/useCollection"
import { useDocument } from '../../hooks/useDocument'
import { useUpdate } from "../../hooks/useUpdate"
import { useState } from "react"


export default function Profile() {
    const { update } = useUpdate()

    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const [isPending, setIsPending] = useState('')
    
    const updatedHandleFileChange = (e) => {
        setThumbnailError(null)
        setIsPending(true)
        
        let selected = e.target.files[0];
        console.log(selected)
        if(!selected){
            setThumbnailError('Please select an image');
            return;
        }
        if(selected.size > 1000000){
            setThumbnailError('Image must be less than 1MB');
            return;
        }
        if(!selected.type.includes('image')) {
            setThumbnailError('Please select an image');
            return;
        }


        setIsPending(false)
        setThumbnailError(null);
        setThumbnail(selected);
        console.log('Thumbnail Updated')
    }

    
    const handleUpdate =  async (e) => {
        setIsPending(true)
        e.preventDefault()
        await update(displayName, thumbnail)
        .then(() => {
            console.log('update successful')
        })
        .catch((err) => err.message)

        setIsPending(false)
        setThumbnail('')
        setDisplayName('')
    }

    
    return (
        <>
            <div>
                <h1>Edit Profile</h1>
                <form className='auth-form' onSubmit={handleUpdate}>
                <label>
                    <span>Update Name:</span>
                    <input 
                        required
                        type="text"
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </label>
                <label>
                    <span>Profile Picture:</span>
                    <input 
                        type="file"
                        onChange={updatedHandleFileChange}
                    />
                    {thumbnailError && <div className="error">{thumbnailError}</div>}   
                </label>
                    {!isPending && <button className='btn'>Update Profile</button>}
                    {isPending && <button className='btn' disabled>Loading...</button>}
                </form>
            </div>
        </>
    )
}
