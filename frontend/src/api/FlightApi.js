
export async function getAllFlights() {
    const link = `http://localhost:8080/api/flight`;
    const token = localStorage.getItem('jwtToken');
    try {
        const response = await fetch(link, {
            method: 'POST',
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