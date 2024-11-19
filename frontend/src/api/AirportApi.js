
export async function getAllAirport() {
    const link = `http://localhost:8081/api/airport`;
    const token = localStorage.getItem('jwtToken');
    try {
        const response = await fetch(link, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}