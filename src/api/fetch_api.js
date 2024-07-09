
export const fetchWithAuth = async (url, options = {}) => {
    const token = sessionStorage.getItem('token');
    console.log("token: "+token)
  
    // Agregar el token de acceso a las cabeceras de la petición
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    let response = await fetch(url, options);
  
    // Si el token ha expirado, intentar refrescar el token
    if (response.status === 401) {
      const refreshToken = sessionStorage.getItem('refresh');
      console.log("refresh:"+refreshToken)
      const refreshResponse = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
  
      if (!refreshResponse.ok) {
        // Si no se puede refrescar el token, redirigir al login
        sessionStorage.clear();
        throw new Error('Token expired and refresh failed');
      }
  
      const refreshData = await refreshResponse.json();
      console.log(refreshData)
      console.log("token:"+refreshData.access)
      const refresh = sessionStorage.getItem('refresh');
      console.log("refresh:"+refresh)
      sessionStorage.setItem('token', refreshData.access);
  
      // Reintentar la petición original con el nuevo token
      options.headers['Authorization'] = `Bearer ${refreshData.access}`;
      response = await fetch(url, options);
    }
  
    return response;
  };


  // auth.js (o en un archivo similar)
export const logout = async (navigate) => {
    try {
      const token = sessionStorage.getItem('token');
      const refresh = sessionStorage.getItem('refresh');
  
      // Intenta cerrar sesión en el backend
      let response = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ refresh_token: refresh }),
      });

      // Si el token de acceso está vencido, intenta actualizarlo y vuelve a intentar el logout
      if (response.status === 401) {
        console.log("Estoy Aqui! 1")
        const responseData = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refresh }),
          });

          if (!responseData.ok) {
            throw new Error('Failed to logout');
          }

          const tokenResponse = await responseData.json();
          
          response = await fetch('http://127.0.0.1:8000/api/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokenResponse.access}`,
            },
            body: JSON.stringify({ refresh_token: refresh }),
          });
      }
      
      if(response.status === 204){
        console.log("Estoy Aqui! 2")
        sessionStorage.clear()
        navigate('/login');
      }else{
        throw new Error('Algo ah esta mal!');
      }
      
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };