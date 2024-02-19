// /src/utils/verifyBusinessEmail.js
export const verifyBusinessEmail = async (email) => {
  try {
    const response = await fetch('https://young-ravine-47125-71f43e0f6395.herokuapp.com/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return response.json(); // This should return { success: true/false, message: "..." }
  } catch (error) {
    console.error("Error verifying business email:", error);
    throw error; // Rethrow to be caught by the caller
  }
};