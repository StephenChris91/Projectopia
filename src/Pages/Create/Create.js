import { useState, useEffect } from 'react';
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection';

//styles
import './Create.css';

const categories = [
    { value: 'rack & stack', label: 'Rack & Stack' },
    { value: 'migration', label: 'Migration' },
    { value: 'switches', label: 'Switches' },
    { value: 'routing', label: 'Routing' },

    //users
    
]

export default function Create (){

    const { documents, error } = useCollection('users');
    const [users, setUsers] = useState([]);

    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState(null);
    const [assignedUsers, setAsignedUsers] = useState([]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, details, dueDate);
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
            </form>
        </div>
    )


}


