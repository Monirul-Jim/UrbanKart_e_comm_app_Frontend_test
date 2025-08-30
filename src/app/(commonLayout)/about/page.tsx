export default function AboutUs() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Image */}
        <div className="flex justify-center">
          <img
            src="/about-us.jpg" // 👉 Replace with your store/team image
            alt="About Shopora"
            className="rounded-2xl shadow-lg w-full max-w-md"
          />
        </div>

        {/* Right Side - Text */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900">
            About <span className="text-indigo-600">Shopora</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            At <span className="font-semibold">Shopora</span>, we’re more than just an online store — 
            we’re your trusted partner for quality products at unbeatable prices. 
            Our mission is to make shopping <span className="text-indigo-600 font-medium">easy, secure, and reliable</span> for everyone across the nation.
          </p>

          <p className="mt-3 text-gray-600">
            From electronics to lifestyle essentials, every product we deliver is{" "}
            <span className="font-medium">100% genuine</span>, backed by fast shipping 
            and friendly customer service. 
          </p>

          {/* Highlights */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white shadow rounded-xl">
              <h3 className="font-semibold text-gray-800">🔒 Trusted & Secure</h3>
              <p className="text-sm text-gray-600 mt-2">
                Safe transactions with multiple payment options.
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded-xl">
              <h3 className="font-semibold text-gray-800">⚡ Fast Nationwide Delivery</h3>
              <p className="text-sm text-gray-600 mt-2">
                Quick and reliable delivery to your doorstep.
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded-xl">
              <h3 className="font-semibold text-gray-800">✅ 100% Authentic Products</h3>
              <p className="text-sm text-gray-600 mt-2">
                We guarantee genuine quality in every order.
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded-xl">
              <h3 className="font-semibold text-gray-800">💬 24/7 Customer Support</h3>
              <p className="text-sm text-gray-600 mt-2">
                Always here to help you with your shopping needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="max-w-5xl mx-auto mt-16 text-center">
        <h3 className="text-3xl font-bold text-gray-900">Our Vision & Mission</h3>
        <p className="mt-4 text-lg text-gray-700">
          Our vision is to be the most trusted online shopping destination, delivering{" "}
          <span className="font-semibold">quality, affordability, and happiness</span> to every customer.  
          We aim to empower buyers with a seamless and joyful shopping experience.
        </p>
      </div>
    </section>
  );
}
