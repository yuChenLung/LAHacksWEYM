import { useEffect } from "react";
import { useDatabase } from "../context/state";

function Matches() {
    const context = useDatabase();

    async function fetchUserData() {
        try {
            const response = await fetch('http://localhost:8001/' + context.user.uid, { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            let json = await response.json();
            return json;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    useEffect(() => {
        (async () => {
            const userData = await fetchUserData();
            console.log("userData.plannedSchedules", userData.plannedSchedules);
        })();

        return () => {

        };
    }, []);

    return (
        <>
            <h1>Matches</h1>
        </>
    );
}
export default Matches;