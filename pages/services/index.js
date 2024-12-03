

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

 

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

 
  export const getFood = async (data) => {
    const response = await fetch(`${BACKEND_URL}/api/food`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    });
  
    if (response.status === 200 || response.status === 400) {
      return response.json();
    }
    throw new Error('Something went wrong');
  };
  export const getFoodById = async (id) => {
    const response = await fetch(`${BACKEND_URL}/api/food/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

    });
  
    if (response.status === 200 || response.status === 400) {
      return response.json();
    }
    throw new Error('Something went wrong');
  };

  export const updateUser = async (id, data) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user details');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  