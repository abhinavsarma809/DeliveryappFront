



const BACKEND_URL = 'http://localhost:5000'; // Correct URL of the backend API

export const login = async (data) => {
    console.log(BACKEND_URL); 

    const response = await fetch(`${BACKEND_URL}/api/user/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (response.status === 200 || response.status === 400) {
        return response.json();
    }
    throw new Error('Something went wrong');
};

export const register = async (data) => {
    const response = await fetch(`${BACKEND_URL}/api/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    if (response.status === 200 || response.status === 400) {
      return response.json();
    }
    throw new Error('Something went wrong');
  };
  export const getImage = async (imageId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/image/${imageId}`);
  
      if (response.status === 200) {
        const blob = await response.blob(); 
        return URL.createObjectURL(blob);  
      } else {
        throw new Error('Error fetching image');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  