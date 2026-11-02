import React, { useState } from 'react';

export default function CheckoutModal({ isOpen, onClose, cartItems, subtotal, onOrderSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    paymentMethod: 'cod'
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address || !formData.phone) {
      alert('Please fill in all required shipping fields.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      onOrderSuccess();
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl">
          &times;
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-5xl mb-2">✓</div>
            <h3 className="text-xl font-bold text-gray-800">Order Placed Successfully!</h3>
            <p className="text-gray-600 mt-1">Thank you for shopping with Miyanda. Redirecting...</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Checkout</h2>
            
            <div className="mb-4 bg-gray-50 p-3 rounded text-sm">
              <span className="font-semibold">Order Total: </span>
              <span className="text-blue-600 font-bold">${subtotal.toFixed(2)}</span> ({cartItems.length} items)
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-blue-500"
                  placeholder="e.g. Tinashe Moyo"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-blue-500"
                  placeholder="e.g. tinashe@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Delivery Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="2"
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-blue-500"
                  placeholder="Street address, city, region"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-sm focus:outline-blue-500"
                  placeholder="+263..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm bg-white"
                >
                  <option value="cod">Cash on Delivery / Pickup</option>
                  <option value="ecocash">EcoCash / Mobile Money</option>
                  <option value="card">Credit / Debit Card</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded hover:bg-blue-700 transition"
                >
                  Confirm & Place Order
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}