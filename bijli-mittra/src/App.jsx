import React, { useState } from 'react';

const electriciansData = [
  {
    id: 1,
    name: "Anshu Chauhan",
    phone: "919580786144",
    displayPhone: "+91 95807 86144",
    rating: 4.9,
    reviews: 142,
    experience: "7 Years",
    hourlyRate: "₹299",
    skills: ["Full House Wiring", "Short Circuit Repair", "MCB & DB Box Setup"],
    about: "Certified senior electrician specializing in fault detection, high-voltage load balancing, and residential electrical wiring."
  },
  {
    id: 2,
    name: "Ankit",
    phone: "918381994175",
    displayPhone: "+91 83819 94175",
    rating: 4.8,
    reviews: 110,
    experience: "5 Years",
    hourlyRate: "₹249",
    skills: ["Inverter Setup", "Ceiling Fan Repair", "Switchboard Fitting"],
    about: "Quick response technician for household appliance servicing, emergency line fault troubleshooting, and modern fittings."
  },
  {
    id: 3,
    name: "Mayank Sharma",
    phone: "918545859113",
    displayPhone: "+91 85458 59113",
    rating: 4.7,
    reviews: 86,
    experience: "6 Years",
    hourlyRate: "₹279",
    skills: ["Appliance Repair", "Geyser & Heater Setup", "LED & Lighting Design"],
    about: "Expert in decorative and architectural lighting, heavy home appliance servicing, and safety earth testing."
  },
  {
    id: 4,
    name: "Satendra Chauhan",
    phone: "917738958045",
    displayPhone: "+91 77389 58045",
    rating: 4.9,
    reviews: 165,
    experience: "9 Years",
    hourlyRate: "₹349",
    skills: ["Industrial Wiring", "Solar Inverter Grid", "Heavy Machinery Supply"],
    about: "Industrial electrical specialist with extensive background in single-phase and 3-phase commercial electrical systems."
  },
  {
    id: 5,
    name: "Sunny Chauhan",
    phone: "916386215641",
    displayPhone: "+91 63862 15641",
    rating: 4.6,
    reviews: 74,
    experience: "4 Years",
    hourlyRate: "₹229",
    skills: ["Routine Maintenance", "Cooler & Motor Rewinding", "Power Sockets"],
    about: "Reliable local electrician for fast home visits, wiring inspections, and quick switchboard repairs."
  }
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedElectrician, setSelectedElectrician] = useState(null);
  const [bookingElectrician, setBookingElectrician] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Auth State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Booking State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingAddress, setBookingAddress] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
    }
  };

  const initiateBooking = (electrician) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setSelectedElectrician(null);
    setBookingElectrician(electrician);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    // Prepare WhatsApp Message content
    const message = `*NEW BOOKING ALERT - BIJLI MITTRA*%0A%0A` +
      `*Electrician:* ${bookingElectrician.name}%0A` +
      `*Customer Name:* ${customerName}%0A` +
      `*Customer Phone:* ${customerPhone}%0A` +
      `*Schedule Date & Time:* ${bookingDate}%0A` +
      `*Service Address:* ${bookingAddress}%0A%0A` +
      `_Please confirm availability and contact the customer._`;

    // Direct WhatsApp chat link
    const whatsappUrl = `https://wa.me/${bookingElectrician.phone}?text=${message}`;

    setBookingSuccess(true);

    // Open WhatsApp in a new tab
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setBookingElectrician(null);
      setBookingSuccess(false);
      setCustomerName("");
      setCustomerPhone("");
      setBookingDate("");
      setBookingAddress("");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-blue-600 tracking-tight">⚡ Bijli Mittra</span>
          </div>

          <div>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  ● Verified User
                </span>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-xs sm:text-sm font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm cursor-pointer"
              >
                Login / Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
          On-Demand Verified Electricians at Your Doorstep
        </h1>
        <p className="text-blue-100 max-w-2xl mx-auto text-sm sm:text-base">
          View full profiles, compare transparent pricing, and send instant booking requests directly to your chosen electrician.
        </p>
      </section>

      {/* Professionals Directory */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Verified Electricians
          </h2>
          <span className="text-xs sm:text-sm text-gray-600 font-semibold bg-white border border-gray-200 px-3 py-1 rounded-md">
            5 Professionals Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {electriciansData.map((elec) => (
            <div
              key={elec.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-900">{elec.name}</h3>
                  <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-1 rounded-md">
                    ★ {elec.rating} ({elec.reviews})
                  </span>
                </div>

                <div className="space-y-1 mb-4 text-sm text-gray-600">
                  <p><span className="font-semibold text-gray-800">Experience:</span> {elec.experience}</p>
                  <p><span className="font-semibold text-gray-800">Visiting Fee:</span> {elec.hourlyRate}</p>
                  <p><span className="font-semibold text-gray-800">Contact:</span> {elec.displayPhone}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {elec.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-md font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setSelectedElectrician(elec)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm py-2.5 rounded-lg transition cursor-pointer"
                >
                  View Profile
                </button>
                <button
                  onClick={() => initiateBooking(elec)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-lg transition shadow-xs cursor-pointer"
                >
                  {isLoggedIn ? "Book Now" : "Login to Book"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL 1: VIEW PROFILE */}
      {selectedElectrician && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedElectrician(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-extrabold text-xl">
                {selectedElectrician.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedElectrician.name}</h3>
                <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  ★ {selectedElectrician.rating} ({selectedElectrician.reviews} Verified Customer Reviews)
                </span>
              </div>
            </div>

            <div className="space-y-3.5 border-y border-gray-200 py-4 my-4 text-sm">
              <p className="text-gray-600 leading-relaxed">{selectedElectrician.about}</p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <span className="text-xs text-gray-500 font-semibold uppercase">Total Experience</span>
                  <p className="font-bold text-gray-900">{selectedElectrician.experience}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <span className="text-xs text-gray-500 font-semibold uppercase">Standard Visiting Fee</span>
                  <p className="font-bold text-gray-900">{selectedElectrician.hourlyRate}</p>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">Direct WhatsApp / Contact</span>
                <p className="text-sm font-semibold text-blue-600 mt-0.5">{selectedElectrician.displayPhone}</p>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">Key Specializations</span>
                <ul className="list-disc list-inside text-gray-600 text-xs mt-1.5 space-y-1">
                  {selectedElectrician.skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedElectrician(null)}
                className="w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 rounded-lg text-sm transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => initiateBooking(selectedElectrician)}
                className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition shadow-xs cursor-pointer"
              >
                {isLoggedIn ? "Proceed to Book" : "Login to Book"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: BRIGHT LOGIN FORM */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-1">Sign In to Continue</h3>
            <p className="text-sm text-gray-600 mb-5">Please authenticate to book verified electricians.</p>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Email Address or Mobile
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter email or mobile"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-white border border-gray-300 text-gray-900 text-sm font-medium rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-white border border-gray-300 text-gray-900 text-sm font-medium rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-sm transition shadow-sm cursor-pointer"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: BOOKING FORM & DIRECT WHATSAPP NOTIFICATION */}
      {bookingElectrician && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setBookingElectrician(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>

            {bookingSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-gray-900">Redirecting to WhatsApp...</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Connecting you directly with <strong>{bookingElectrician.name}</strong> ({bookingElectrician.displayPhone}).
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Confirm Service Booking</h3>
                <p className="text-xs text-gray-600 mb-4">
                  Technician: <span className="font-bold text-gray-900">{bookingElectrician.name}</span> • Rate: <span className="font-semibold text-blue-600">{bookingElectrician.hourlyRate}</span>
                </p>

                <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-white border border-gray-300 text-gray-900 text-sm font-medium rounded-lg p-2.5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Your Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-white border border-gray-300 text-gray-900 text-sm font-medium rounded-lg p-2.5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Preferred Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-white border border-gray-300 text-gray-900 text-sm font-medium rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Service Address
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House/Street No., Landmark, City"
                      value={bookingAddress}
                      onChange={(e) => setBookingAddress(e.target.value)}
                      className="w-full bg-white border border-gray-300 text-gray-900 text-sm font-medium rounded-lg p-2.5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Booking Request via WhatsApp</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}