import { useState, useEffect } from 'react';
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/Config';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from 'react-router-dom';

//styles
import './Create.css';

const categories = [
    { value: 'one off', label: 'One Off' },
    { value: 'short term', label: 'Short Term' },
    { value: 'long term', label: 'Long Term' },
    { value: 'full time', label: 'Full Time' },

    //users
    
]

export default function Create (){

    const navigate = useNavigate();

    const { documents, error } = useCollection('users');
    const [users, setUsers] = useState([]);
    const { user } = useAuthContext();
    const { addDocument, response } = useFirestore('projects');

    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState(null);
    const [assignedUsers, setAsignedUsers] = useState([]);
    const [formError, setFormError] = useState(null)

    useEffect(() => {
        if(documents){
            const options = documents.map(user => {
                return {
                    value: user,
                    label: user.displayName
                }
            })

            setUsers(options);
        }
                
    }, [documents]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!category){
            setFormError('Please select a project category')
            return
        }

        if(assignedUsers.length < 1){
            setFormError('Please select at least one user');
            return;
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map(user => {
            return {
                displayName: user.value.displayName,
                photoURL: user.value.photoURL,
                id: user.value.id
            }
        })

        const project = {
            name,
            details, 
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }

        await addDocument(project);
        if(!response.error){
            navigate('/')
        }
    }

    return (
        <div className="create-form">
            <h2 className='page-title'>Create a new project</h2>
            <form className="create-form-container" onSubmit={handleSubmit}>
                <label>
                    <span>Project Name:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea
                        required
                        type="text"
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    ></textarea>
                </label>
                <label>
                    <span>Due Date:</span>
                    <input
                        required
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>

                <label>
                    <span>Project Category:</span>
                    <Select 
                        onChange={(option) => setCategory(option)}
                        options={categories}
                    />
                </label>
                <label>
                    <span>Asign to:</span>
                    <Select 
                        onChange={(options) => setAsignedUsers(options)}
                        options={users}
                        isMulti                 
                    />
                </label>

                <button className="btn">Add Project</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )


}


