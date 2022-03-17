import { useState } from 'react'
import ProjectList from '../../Components/ProjectList';
import { useCollection } from '../../hooks/useCollection';
import ProjectFilter from './ProjectFilter';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useIdleTimer } from 'react-idle-timer';
import { useLogout } from '../../hooks/useLogout';

//styles
import './Dashboard.css';

//create a new functional component and export it as default
export default function Dashboard () {
    const { user } = useAuthContext();
    const {documents, error} = useCollection('projects');
    const [currentFilter, setCurrentFilter] = useState('all')

    const { logout } = useLogout()

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const projects = documents ? documents.filter((document) => {
        switch(currentFilter){
            case 'all':
                return true
            case 'mine':
                let assignedToMe = false
                document.assignedUsersList.forEach((u) => {
                    if(user.uid === u.id){
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'one off':
            case 'long term':
            case 'short term':
            case 'full time':
                console.log(document.category, currentFilter)
                return document.category === currentFilter;
            default: 
                return true
        }
    }) : null


    const handleOnIdle = event => {
        logout()
    }

   useIdleTimer({
        timeout: 1000 * 60 * 5,
        onIdle: handleOnIdle,
        debounce: 500
   })

    return (
        <div className="Dashboard">
            <h1>Dashboard</h1>
            {error && <p className='error'>{error}</p>}
            {documents && (<ProjectFilter 
            currentFilter={currentFilter} 
            changeFilter={changeFilter}
            />)}
            {projects && <ProjectList projects={projects}/>}
        </div>
    );
}

