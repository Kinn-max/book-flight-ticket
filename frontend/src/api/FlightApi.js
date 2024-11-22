
export async function getAllFlights() {
    const link = `http://localhost:8081/api/flight/by-admin`;
    const token = localStorage.getItem('jwtToken');
    try {
        const response = await fetch(link, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
    }
    return null;
}
export async function createOrUpdateFlight(data) {
    const link = `http://localhost:8081/api/flight/create`;
    const token = localStorage.getItem('jwtToken');
    try {
        const response = await fetch(link, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

       return response;
    } catch (error) {
        console.error('Error:', error);
    }
}