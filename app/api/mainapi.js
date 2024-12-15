import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your actual base URL
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
    console.log(`/api/restaurants/${id}`);
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
  

  removeFromCart: async (restaurantId, orderItem) => {
    const response = await axiosInstance.delete(`/api/restaurants/${restaurantId}/cart`, {
      data: orderItem,
    });
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
    const response = await axiosInstance.get(`/api/orders/${id}`);
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

  sendToUser: async (recipientId, message) => {
    const response = await axiosInstance.post(`/api/notifications/send-to-user`, null, {
      params: { recipientId, message },
    });
    return response.data;
  },

  sendToAll: async (userIds, message) => {
    const response = await axiosInstance.post(`/api/notifications/send-to-all`, userIds, {
      params: { message },
    });
    return response.data;
  },

  getNotificationsForUser: async (recipientId) => {
    const response = await axiosInstance.get(`/api/notifications/user/${recipientId}`);
    return response.data;
  },

  markAsRead: async (notificationId) => {
    const response = await axiosInstance.put(`/api/notifications/mark-as-read/${notificationId}`);
    return response.data;
  },

  getAllNotifications: async () => {
    const response = await axiosInstance.get('/api/notifications/all');
    return response.data;
  },
};

export default api;
