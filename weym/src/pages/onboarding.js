import '../components/components.css';

function Onboarding() {
    function validatePassword(e) {
        e.preventDefault();
        console.log(e.target.value);
        console.log(document.forms["myForm"]["password"].value);
        if (e.target.value !== document.forms["myForm"]["password"].value) {
            document.getElementById("passwordError").className = "showPasswordError";
        }
        else {
            document.getElementById("passwordError").className = "passwordValidate";
        }
    }

    async function fetchData(jsonData) {
        console.log(JSON.stringify(jsonData));
        try {
            console.log(JSON.stringify(jsonData));
            const response = await fetch('http://localhost:8001/register', { 
                method: 'POST', 
                body: JSON.stringify(jsonData),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            // console.log(response);
            // const responseData = await response.json();
            // return responseData;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    async function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        if (document.getElementById("passwordError").className === "showPasswordError") {
            alert("passwords must match");
            return false;
        }

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // You can pass formData as a fetch body directly:
        // fetch('/some-api', { method: form.method, body: formData });

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());

        const address = [formJson.apt, formJson.street, formJson.city, formJson.state, formJson.zipcode];

        const formattedJson = {
            firstName: formJson.firstName,
            lastName: formJson.lastName,
            email: formJson.email,
            password: formJson.password,
            address: address.join(' '),
            organization: formJson.organization
        }
        console.log(formattedJson);
        //format json object

        // Send post request to database
        try {
            const response = await fetchData(formattedJson);
            console.log(response);
            // Handle the response data here
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error here
        }
    }

    return (
        <form name="myForm" className="form" method="post" onSubmit={handleSubmit}>
            <div className="formHeader">
                <h1>Create your Account</h1>
            </div>
            <div className="formFields">
                <label>First Name</label>
                <input
                    className="horiz-field"
                    type="text"
                    placeholder="Enter your first name"
                    name="firstName"
                    required={true}
                />
                <label>Last Name</label>
                <input
                    className="horiz-field"
                    type="text"
                    placeholder="Enter your last name"
                    name="lastName"
                    required={true}
                />
                <label>Email</label>
                <input
                    className="horiz-field"
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    required={true}
                />
                <label>Password</label>
                <input
                    className="horiz-field"
                    type="text"
                    placeholder="Enter your password"
                    name="password"
                    required={true}
                />
                <label>Confirm Password</label>
                <input
                    className="horiz-field"
                    type="text"
                    placeholder="Enter your password"
                    onChange={validatePassword}
                    required={true}
                />
                <p id="passwordError" className="passwordValidate">error: passwords must match</p>
                {/* ideally, this should be a dropdown w existing organizations */}
                <label>Organization</label>
                <select name="organization" defaultValue="none">
                    <option value="none">None</option>
                    <option value="Google Inc.">Google Inc.</option>
                    <option value="lime">School</option>
                </select>
            </div>
            {/* maybe have a separator */}
            <div>
                <h2>Home Address</h2>
            </div>
            <div className="formFields">
                <div className="formRow">
                    <label className="firstLabel">Apt #</label>
                    <input
                        className="horiz-field horiz-field-apt"
                        type="text"
                        placeholder="ex: Apt. 23"
                        name="apt"
                        required={false}
                    />
                    <label className="successiveLabel">Street Address</label>
                    <input
                        className="horiz-field horiz-field-address"
                        type="text"
                        placeholder="ex: 330 De Neve Drive"
                        name="address"
                        required={true}
                    />
                </div>
                <div className="formRow">
                    <label className="firstLabel">City</label>
                    <input
                        className="horiz-field horiz-field-city"
                        type="text"
                        placeholder="ex: Los Angeles"
                        name="city"
                        required={true}
                    />
                    <label className="successiveLabel">State</label>
                    <input
                        className="horiz-field horiz-field-state"
                        type="text"
                        placeholder="ex: CA"
                        name="state"
                        required={true}
                    />
                    <label className="successiveLabel">Zipcode</label>
                    <input
                        className="horiz-field horiz-field-zipcode"
                        type="text"
                        placeholder="ex: 90024"
                        name="zipcode"
                        required={true}
                    />
                </div>
            </div>
            <button className="submitButton" type="submit"><span>Submit and Continue</span></button>
        </form>
    );
}

export default Onboarding;