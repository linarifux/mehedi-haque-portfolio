import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // This opens the user's default email client with the message pre-filled
    window.location.href = `mailto:mehedihque@gmail.com?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Get in Touch</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Whether you are looking for a collaboration, a workshop, or just want to say hi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Contact Info (Left Side) */}
          <div className="bg-gray-900 text-white p-8 rounded-xl shadow-lg h-fit">
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Fill up the form and I will get back to you within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="text-red-500 mt-1 mr-4" size={20} />
                <div>
                  <p className="text-sm font-semibold text-gray-300">Email</p>
                  <p className="text-base">mehedihque@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="text-red-500 mt-1 mr-4" size={20} />
                <div>
                  <p className="text-sm font-semibold text-gray-300">Location</p>
                  <p className="text-base">Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="text-red-500 mt-1 mr-4" size={20} />
                <div>
                  <p className="text-sm font-semibold text-gray-300">Social</p>
                  <p className="text-base">@mehedi.haque.cartoons</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Side) */}
          <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition"
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  rows="6" 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="flex items-center bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition transform hover:-translate-y-1">
                  Send Message <Send size={18} className="ml-2" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;