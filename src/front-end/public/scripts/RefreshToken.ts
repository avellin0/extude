export async function RefreshToken(userId: string) {
    try {
        const token = await fetch(
            `http://localhost:3000/api/refresh/${userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            },
        );

        if (!token.ok) {
            throw new Error("Failed to refresh token");
        }

        const data = await token.json();
        localStorage.setItem("token", data.access_token);
        return data.access_token;

    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
}
