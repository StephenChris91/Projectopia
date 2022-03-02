import { useParams } from 'react-router-dom';
import  useDocument from '../../hooks/useDocument';

//styles
import './Project.css';
import Projectcomments from './ProjectComments';
import Projectsummary from './ProjectSummary';

   



export default function Project() {
    const { id } = useParams();
    const { documents, error } = useDocument('projects', id);

    if(error){
        return <p className='error'>{error}</p>
    }

    if(!documents){
        return <div className='loading'>Loading...</div>
    }
    
        return (
            <div className="project-details">
                <Projectsummary project={documents}/>
                <Projectcomments project={documents}/>
            </div>
        );
};

