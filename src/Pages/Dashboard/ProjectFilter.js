const filterList = ['all', 'mine', 'Migration', 'Routing', 'Rack & Stack', 'Switches']




export default function ProjectFilter( { currentFilter, changeFilter} ) {

    const handleClick =(newFilter) =>{
        console.log(newFilter)
        changeFilter(newFilter)
    }
    return (
        <div className='project-filter'>
            <nav>
            <p>Filter By: </p>
                {filterList.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => handleClick(filter)}
                        className={currentFilter === filter ? 'active' : ''}
                    >
                        {filter}
                    </button>
                ))}
            </nav>
        </div>
    )
}