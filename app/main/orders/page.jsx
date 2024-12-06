const OrderHistory = () => {
  const orders = [
      { name: "Kicks Carrier", status: "Out for delivery", date: "", img: "https://placehold.co/300x300", statusColor: "text-blue-600" },
      { name: "Micro Backpack", status: "Delivered on June 21, 2021", date: "June 21, 2021", img: "https://placehold.co/300x300", statusColor: "text-gray-900" },
      { name: "Drawtop Canister", status: "Cancelled", date: "", img: "https://placehold.co/300x300", statusColor: "text-gray-900" },
      { name: "High Wall Tote", status: "Delivered on May 24, 2021", date: "May 24, 2021", img: "https://placehold.co/300x300", statusColor: "text-gray-900" },
      { name: "Laptop Sleeve", status: "Delivered on May 21, 2021", date: "May 21, 2021", img: "https://placehold.co/300x300", statusColor: "text-gray-900" },
      { name: "Shoulder Sling", status: "Cancelled", date: "", img: "https://placehold.co/300x300", statusColor: "text-gray-900" },
      { name: "Crushed Carrier", status: "Delivered on January 9, 2021", date: "January 9, 2021", img: "https://placehold.co/300x300", statusColor: "text-gray-900" },
      { name: "Wrap Clutch", status: "Delivered on January 4, 2021", date: "January 4, 2021", img: "https://placehold.co/300x300", statusColor: "text-gray-900" },
  ];

  return (
      <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-gray-900">Order history</h1>
          <p className="text-gray-500 mt-2">Check the status of recent orders, manage returns, and discover similar products.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {orders.map((order, index) => (
                  <div key={index} className="bg-white shadow rounded-lg p-4">
                      <img src={order.img} alt={`${order.name} image`} className="w-full h-48 object-cover rounded-lg mb-4" />
                      <h2 className="text-lg font-medium text-gray-900">{order.name}</h2>
                      <p className={`mt-1 ${order.statusColor}`}>{order.status}</p>
                  </div>
              ))}
          </div>
      </div>
  );
};
export default OrderHistory;