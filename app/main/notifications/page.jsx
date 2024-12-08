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
    <div className="h-screen w-full  flex flex-col">
      {/* Header */}
      <div className=" s p-4 flex justify-between items-center sticky top-0 z-10">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Notifications
        </h2>
        
      </div>

      {/* Notification List */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Icon */}
            <img
              src={notification.icon}
              alt="icon"
              className="w-12 h-12 rounded-full object-cover mr-4 border border-gray-300"
            />
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-medium text-gray-800 mb-1">
                {notification.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                {notification.description}
              </p>
              <span className="text-xs text-gray-400">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-white shadow-inner p-4 text-center text-gray-500 text-sm">
        You’re all caught up! 🎉
      </div>
    </div>
  );
};

export default Notifications;
