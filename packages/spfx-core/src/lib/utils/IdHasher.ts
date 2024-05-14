// Function to generate a random string of given length
function generateRandomString(length): string {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to encode the sequential ID into a random string
export function encodeId(id: number): string {
    const encodedId = btoa(id.toString()); // Encode ID to base64
    return generateRandomString(6) + encodedId; // Concatenate random string and encoded ID
}

// Function to decode the random string back to the sequential ID
export function decodeId(randomString: string): number {
    const encodedId = randomString.substring(6); // Extract the encoded part from the random string
    return parseInt(atob(encodedId)); // Decode base64 and parse to integer
}
