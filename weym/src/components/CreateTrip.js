import './components.css';
import { useDatabase } from '../context/state';
import getLatLng from '../Geocoding/getlatlng';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function CreateTripForm(props) {
    const context = useDatabase();

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user', context.user.uid);
        formData.append('startTime', context.scheduler.startTime);
        formData.append('endTime', context.scheduler.endTime);
        formData.append('day', context.scheduler.day);
        const temp = e.target;
        const tempData = new FormData(temp);
        for (const pair of tempData.entries()) {
            formData.append(pair[0], pair[1]);
        }

        var {lat, lng} = await getLatLng(formData.get('startLocation'));
        console.log(lat, lng);
        formData.append('sLat', lat);
        formData.append('sLong', lng);
        var {lat, lng} = await getLatLng(formData.get('destination'));
        console.log(lat, lng);
        formData.append('dLat', lat);
        formData.append('dLong', lng);

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
            context.doRefresh()
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    return (
        <div className="tripBox-createTrip">
            <h1 style={{ textAlign: "center" }}>Create a Trip</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-fields-location">
                    <label>Start Time:</label>
                    <input
                        className="horiz-field"
                        type="number"
                        name="startTime"
                        defaultValue={context.scheduler.startTime}
                    />
                    <label>End Time:</label>
                    <input
                        className="horiz-field"
                        type="number"
                        name="endTime"
                        defaultValue={context.scheduler.endTime}
                    />
                    <label>Day of the Week:</label>
                    <select name="day" style={{ marginBottom: '5px' }}>
                        <option value={String(context.scheduler.day)}>{days[context.scheduler.day - 1]}</option>
                        <option value="1">Sunday</option>
                        <option value="2">Monday</option>
                        <option value="3">Tuesday</option>
                        <option value="4">Wednesday</option>
                        <option value="5">Thursday</option>
                        <option value="6">Friday</option>
                        <option value="7">Saturday</option>
                    </select>
                    <label>Start Location:</label>
                    <input
                        className="horiz-field"
                        type="text"
                        name="startLocation"
                        placeholder="Enter a starting location"
                    />
                    <label>Destination:</label>
                    <input
                        className="horiz-field"
                        type="text"
                        name="destination"
                        placeholder="Enter a destination"
                    />
                </div>
                <button className="createTripButton" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateTripForm;