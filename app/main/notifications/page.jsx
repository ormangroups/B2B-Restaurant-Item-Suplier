import React from "react";

const notifications = [
  {
    id: 1,
    title: "Kitchen tools & appliances ⏳",
    description: "Trays, KOT holders, GN pans & more, all here for less. Stock up now!",
    time: "4 hours ago",
    icon: "/shopping-cart-icon.png", // Replace with your image URL
  },
  {
    id: 2,
    title: "⏳ Stock up karna na bhoolein!",
    description: "Special kitchen items khatam hone se pehle abhi order karein!",
    time: "9 hours ago",
    icon: "/shopping-cart-icon.png",
  },
  {
    id: 3,
    title: "Boost customer ratings ⭐⭐⭐⭐⭐",
    description: "Add sweet saunf sachets to every order. Shop now!",
    time: "a day ago",
    icon: "/shopping-cart-icon.png",
  },
  {
    id: 4,
    title: "Abhi tak try nahi kiya? 👀",
    description: "1,500+ khaas chuni hui kitchen items ko best prices pe order karein & paye doorstep delivery. Order now ↓",
    time: "a day ago",
    icon: "/shopping-cart-icon.png",
  },
];

const Notifications = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Notifications</h2>
        <button className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start p-4 border-b hover:bg-gray-50"
          >
            <img
              src={notification.icon}
              alt="icon"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                {notification.title}
              </h3>
              <p className="text-sm text-gray-600">{notification.description}</p>
              <span className="text-xs text-gray-400">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 text-center text-gray-500 text-sm">
        All notifications viewed
      </div>
    </div>
  );
};

export default Notifications;
