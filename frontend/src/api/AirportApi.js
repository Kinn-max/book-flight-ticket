
export async function getAllAirport() {
    const link = `http://localhost:8080/api/add-cart`;
    try {
        const response = await fetch(link, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer `,
                'Content-Type': 'application/json',
            },
            
        });

        if (response.ok) {
           console.log(response.json())
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
    }
    return null;
}