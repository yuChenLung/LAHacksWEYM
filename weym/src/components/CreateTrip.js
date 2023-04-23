import './components.css';

function CreateTripForm(props) {
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user', 'temp');
        formData.append('startTime', props.startTime);
        formData.append('endTime', props.endTime);
        formData.append('day', props.day);
        const temp = e.target;
        const tempData = new FormData(temp);
        for (const pair of tempData.entries()) {
            formData.append(pair[0], pair[1]);
        }
        
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);

        try {
            const response = await fetchData(formJson);
            console.log(response);
            // Handle the response data here
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error here
        }
    };

    async function fetchData(jsonData) {
        try {
            const response = await fetch('http://localhost:8001/pschedule', { 
                method: 'POST', 
                body: JSON.stringify(jsonData),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    return (
        <>
            <h1>Enter Origin and Destination</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Start Location:
                    <input type="text" name="startLocation"/>
                </label>
                <br />
                <label>
                    Destination:
                    <input type="text" name="destination"/>
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default CreateTripForm;