function SignInTech() {
    async function handleSubmit(e) {
        e.preventDefault();
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
            if (response.ok) {
                return
            } else {
                console.log('Invalid');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error here
        }
    };

    async function fetchData(data) {
        try {
            const response = await fetch('http://localhost:8001/login', { 
                method: 'GET', 
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            return response;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    return (
        <>
            <h1>Sign In</h1>
            <form name="myForm" onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="text" name="email"/>
                </label>
                <br />
                <label>
                    Password:
                    <input type="text" name="password"/>
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
export default SignInTech;