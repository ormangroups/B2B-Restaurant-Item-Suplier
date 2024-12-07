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
    <div className="h-screen w-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-lg p-4 flex justify-between items-center sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        <button
          className="text-gray-400 hover:text-gray-600 text-2xl transition-transform transform hover:rotate-90"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {/* Notification List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            {/* Icon */}
            <img
              src={notification.icon}
              alt="icon"
              className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-gray-200"
            />
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {notification.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {notification.description}
              </p>
              <span className="text-xs text-gray-400">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-white shadow-md p-4 text-center text-gray-500 text-sm">
        You’re all caught up! 🎉
      </div>
    </div>
  );
};

export default Notifications;
