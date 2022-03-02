import { useState, useEffect } from "react"
import { projectopiadb } from "../firebase/Config"

export default function useDocument(collection, id) {

    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    

    useEffect(() => {


        const ref = projectopiadb.collection(collection).doc(id);
        const unsubscribe = ref.onSnapshot(snapshot => {

            if(snapshot.exists){
                setDocuments({...snapshot.data(), id: snapshot.id});
                setError(null);
            }else{
                setDocuments(null);
                setError("That document does not exist");
            }
        }, error => {
            console.log(error.message);
            setError('could not fetch the data');
        });

        return () => unsubscribe();

    }, [documents, id])

    return { documents, error }

}
