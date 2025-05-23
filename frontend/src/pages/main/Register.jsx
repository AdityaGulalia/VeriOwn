import React, { useState } from 'react';
import { registerProduct } from '../../utils/ApiServices';
import { FaTag, FaIndustry, FaMobileAlt } from 'react-icons/fa';

const ProductForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    serial_number: '',
    manufacturer: '',
    model: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await registerProduct(formData);
      setLoading(false);
      setSuccess('Product registered successfully!');
      setFormData({
        serial_number: '',
        manufacturer: '',
        model: '',
      });
      if (onSuccess) onSuccess(response);
    } catch (err) {
      setError(err.error || 'An error occurred during product registration');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl flex flex-col gap-6 w-full max-w-lg border border-white/20 mt-24">
        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Register New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 border border-green-300 bg-green-50 text-green-700 rounded-md">
              {success}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="serial_number" className="block text-sm font-medium mb-1">
                Serial Number
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaTag className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="serial_number"
                  name="serial_number"
                  value={formData.serial_number}
                  onChange={handleChange}
                  className="block w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-black/40 text-white placeholder-gray-300"
                  placeholder="Enter product serial number"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="manufacturer" className="block text-sm font-medium mb-1">
                Manufacturer
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIndustry className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  className="block w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-black/40 text-white placeholder-gray-300"
                  placeholder="Enter manufacturer name"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium mb-1">
                Model
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMobileAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="block w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-black/40 text-white placeholder-gray-300"
                  placeholder="Enter product model"
                  required
                />
              </div>
            </div>
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg flex justify-center items-center transition ${
                loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
              }`}
            >
              {loading ? 'Registering...' : 'Register Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
