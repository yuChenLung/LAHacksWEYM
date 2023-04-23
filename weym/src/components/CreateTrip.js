function CreateTripForm(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user', 'temp');
        formData.append('startTime', props.startTime);
        formData.append('endTime', props.endTime);
        const temp = e.target;
        const tempData = new FormData(temp);
        for (const pair of tempData.entries()) {
            formData.append(pair[0], pair[1]);
        }
        
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
    };

    return (
        <>
            <h1>Enter Origin and Destination</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Start Location:
                    <input type="text" name="start-location"/>
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