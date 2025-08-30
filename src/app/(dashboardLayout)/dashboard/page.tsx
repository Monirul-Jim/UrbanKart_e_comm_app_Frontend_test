const Dashboard=()=>{
    return (
        <div>
            <>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Welcome to your Dashboard!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example Card 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 transition-transform hover:scale-[1.01] duration-200">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Sales Overview
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Track your daily sales performance and trends.
                </p>
              </div>
              {/* Example Card 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 transition-transform hover:scale-[1.01] duration-200">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  User Activity
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor user engagement and active sessions.
                </p>
              </div>
              {/* Example Card 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 transition-transform hover:scale-[1.01] duration-200">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Revenue Growth
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Visualize your revenue growth over time with interactive charts.
                </p>
              </div>
              {/* Example Card 4 */}
              <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 transition-transform hover:scale-[1.01] duration-200">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Support Tickets
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage and respond to customer support requests efficiently.
                </p>
              </div>
              {/* Example Card 5 */}
              <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 transition-transform hover:scale-[1.01] duration-200">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Recent Orders
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  View a summary of your most recent customer orders.
                </p>
              </div>
              {/* Example Card 6 */}
              <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 transition-transform hover:scale-[1.01] duration-200">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Quick Stats
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Key performance indicators at a glance for quick insights.
                </p>
              </div>
            </div>
          </>
        </div>
    )
}
export default Dashboard;