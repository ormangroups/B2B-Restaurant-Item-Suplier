import React from "react";
// Admin-specific Navbar

const Dashboard = () => {
  return (
 

       
      <>
       {/* Dashboard Content */}
       <div className="p-4 bg-gray-100 flex-1">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Total Views */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-full">
                  <i className="fas fa-eye text-gray-500"></i>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold">$3.456K</div>
                  <div className="text-gray-500">Total Views</div>
                  <div className="text-green-500 text-sm">0.43% <i className="fas fa-arrow-up"></i></div>
                </div>
              </div>
            </div>
            
            {/* Total Profit */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-full">
                  <i className="fas fa-shopping-cart text-gray-500"></i>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold">$45.2K</div>
                  <div className="text-gray-500">Total Profit</div>
                  <div className="text-green-500 text-sm">4.35% <i className="fas fa-arrow-up"></i></div>
                </div>
              </div>
            </div>
            
            {/* Total Products */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-full">
                  <i className="fas fa-box text-gray-500"></i>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold">2,450</div>
                  <div className="text-gray-500">Total Products</div>
                  <div className="text-green-500 text-sm">2.59% <i className="fas fa-arrow-up"></i></div>
                </div>
              </div>
            </div>
            
            {/* Total Users */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-full">
                  <i className="fas fa-users text-gray-500"></i>
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold">3,456</div>
                  <div className="text-gray-500">Total Users</div>
                  <div className="text-green-500 text-sm">0.95% <i className="fas fa-arrow-up"></i></div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Line Chart */}
            <div className="bg-white p-4 rounded-lg shadow col-span-2">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <button className="text-blue-500 font-bold">Total Revenue</button>
                  <button className="text-gray-500 ml-4">Total Sales</button>
                </div>
                <div className="text-gray-500">12.04.2022 - 12.05.2022</div>
              </div>
              <img
                src="https://placehold.co/600x300?text=Line+Chart"
                alt="Line chart showing total revenue and total sales over time"
                className="w-full"
              />
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <div className="font-bold">Profit This Week</div>
                <div className="text-gray-500">This Week</div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-500 w-3 h-3 rounded-full mr-2"></div>
                  <div>Sales</div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-200 w-3 h-3 rounded-full mr-2"></div>
                  <div>Revenue</div>
                </div>
              </div>
              <img
                src="https://placehold.co/300x300?text=Bar+Chart"
                alt="Bar chart showing profit this week"
                className="w-full"
              />
            </div>
          </div>
        </div></>
  );
};

export default Dashboard;
