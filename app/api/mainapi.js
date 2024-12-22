import axios from 'axios';
import Cookies from 'js-cookie';
const getAuthHeaders = () => {
  const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
  const username = userData.username;
  const password = userData.password; // Retrieve password from cookies
  if (username && password) {
    const token = btoa(`${username}:${password}`); // Encode credentials to Base64
    return { Authorization: `Basic ${token}` };
  }
  return {};
};

const axiosInstance = axios.create({
  baseURL: 'https://orman-backend.onrender.com', // Replace with your actual base URL
});

// Request interceptor to attach Basic Auth headers dynamically
axiosInstance.interceptors.request.use((config) => {
  const authHeaders = getAuthHeaders();
  config.headers = {
    ...config.headers,
    ...authHeaders,
  };
  return config;
});

export const api = {
  // Product APIs

  createProduct: async (product) => {
    const response = await axiosInstance.post('/api/products/create', product);
    return response.data;
  },
  fetchCategories: async () => {
    const response = await axiosInstance.get('/api/products/categories');
    return response.data;
  },

  getProductById: async (id) => {
    const response = await axiosInstance.get(`/api/products/${id}`);
    return response.data;
  },

  getAllProducts: async () => {
    const response = await axiosInstance.get('/api/products');
    return response.data;
  },

  updateProduct: async (id, product) => {
    const response = await axiosInstance.put(`/api/products/${id}`, product);
    return response.data;
  },

  deleteProduct: async (id) => {
    await axiosInstance.delete(`/api/products/${id}`);
  },

  // Restaurant APIs

  createRestaurant: async (restaurant) => {
    const response = await axiosInstance.post('/api/restaurants', restaurant);
    return response.data;
  },

  getRestaurantById: async (id) => {
    // console.log(`/api/restaurants/${id}`);
    const response = await axiosInstance.get(`/api/restaurants/${id}`);
    return response.data;
  },

  getAllRestaurants: async () => {
    const response = await axiosInstance.get('/api/restaurants');
    return response.data;
  },

  updateRestaurant: async (id, restaurant) => {
    const response = await axiosInstance.put(`/api/restaurants/${id}`, restaurant);
    return response.data;
  },

  deleteRestaurant: async (id) => {
    await axiosInstance.delete(`/api/restaurants/${id}`);
  },
  addToCart: async (productId, quantity) => {
    const response = await axiosInstance.post("/cart", { productId, quantity });
    return response.data;
  },
  getCartItems:async (restaurantId)=>{
    const response = await axiosInstance.get(`/${restaurantId}/cart`);
    return response.data;
  },
  getFavoriteList:async (restaurantId)=>{
    const response = await axiosInstance.get(`/${restaurantId}/favorites`);
    return response.data;
  },
  addFavorite: async (restaurantId, product) => {
    const response = await axiosInstance.post(`/api/restaurants/${restaurantId}/favorites`, product);
    return response.data;
  },
  
  removeFavorite: async (restaurantId, product) => {
    const response = await axiosInstance.delete(`/api/restaurants/${restaurantId}/favorites`, {
      data: product,
  });
    return response.data;
  },
  getFavoriteList: async (id) => {
    const response = await axiosInstance.get(`/api/restaurants/${id}/favorites`);
    return response.data;
  },
  addToCart: async (restaurantId, orderItem) => {
    const response = await axiosInstance.post(`/api/restaurants/${restaurantId}/cart`, orderItem);
    return response.data;
  },
  

  removeFromCart: async (restaurantId, productId) => {
    const response = await axiosInstance.delete(`/api/restaurants/${restaurantId}/${productId}`);
    console.log(response.data)
    return response.data;
  },
  

  getCartItems: async (id) => {
    const response = await axiosInstance.get(`/api/restaurants/${id}/cart`);
    return response.data;
  },

  // Payment Transaction APIs

  createPaymentTransaction: async (restaurantId, paymentTransaction) => {
    const response = await axiosInstance.post(`/api/payment-transactions/${restaurantId}`, paymentTransaction);
    return response.data;
  },

  getAllPaymentTransactions: async () => {
    const response = await axiosInstance.get('/api/payment-transactions');
    return response.data;
  },

  updatePaymentTransaction: async (id, paymentTransaction) => {
    const response = await axiosInstance.put(`/api/payment-transactions/${id}`, paymentTransaction);
    return response.data;
  },

  deletePaymentTransaction: async (id) => {
    await axiosInstance.delete(`/api/payment-transactions/${id}`);
  },

  // Order APIs

  createOrder: async (restaurantId, order) => {
    const response = await axiosInstance.post(`/api/orders/${restaurantId}`, order);
    return response.data;
  },
 
  getOrderById: async (id) => {
    const response = await axiosInstance.get(`/api/orders/restaurant/${id}`);
    return response.data;
  },

  getAllOrders: async () => {
    const response = await axiosInstance.get('/api/orders');
    return response.data;
  },

  updateOrder: async (id, order) => {
    const response = await axiosInstance.put(`/api/orders/${id}`, order);
    return response.data;
  },

  deleteOrder: async (id) => {
    await axiosInstance.delete(`/api/orders/${id}`);
  },

  getOrdersByStatus: async (status) => {
    const response = await axiosInstance.get(`/api/orders/status/${status}`);
    return response.data;
  },

  // Notification APIs

    // Notification APIs

    createNotification: async (notification) => {
     
        const response = await axiosInstance.post("/api/notifications", notification);
        return response.data; // The created notification
     
    },
  
    // Get all notifications
    getAllNotifications: async () => {
     
        const response = await axiosInstance.get("/api/notifications/all");
        return response.data; // List of all notifications
     
    },
  
    // Get notifications for a specific user (by recipientId)
    getNotificationsForUser: async (recipientId) => {
   
        const response = await axiosInstance.get(`/api/notifications/user/${recipientId}`);
        return response.data; // List of notifications for the user
     
    },
  
    // Get notifications that have no recipient (null recipientId)
    getUnassignedNotifications: async () => {
        const response = await axiosInstance.get("/api/notifications/unassigned");
        return response.data; // List of notifications with null recipientId
      
    },
    getDailyScheduledOrders: async (restaurantId) => {
       const response = await axiosInstance.get(`/api/daily-scheduled-orders/${restaurantId}`); return response.data; 
      }, 
    addToDailyScheduledOrders: async (restaurantId, orderItem) => {
       const response = await axiosInstance.post(`/api/daily-scheduled-orders/${restaurantId}`, orderItem); return response.data; 
    },
    removeFromDailyScheduledOrders: async (restaurantId, productId) => { 
      const response = await axiosInstance.delete(`/api/daily-scheduled-orders/${restaurantId}/${productId}`); 
      return response.data;
     },

};

export default api;
