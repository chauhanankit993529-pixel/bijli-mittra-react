import React, { useState } from 'react';

const initialElectricians = [
  {
    id: 1,
    name: "Anshu Chauhan",
    phone: "919580786144",
    displayPhone: "+91 95807 86144",
    email: "anshu.chauhan@bijlimittra.com",
    rating: 4.9,
    reviews: 142,
    experience: "7 Years",
    hourlyRate: "₹299",
    skills: ["Full House Wiring", "Short Circuit Repair", "MCB & DB Box Setup"],
    about: "Certified senior electrical technician specializing in fault detection, high-voltage load balancing, and residential power setups."
  },
  {
    id: 2,
    name: "Ankit",
    phone: "918381994175",
    displayPhone: "+91 83819 94175",
    email: "ankit.tech@bijlimittra.com",
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
    email: "mayank.sharma@bijlimittra.com",
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
    email: "satendra.chauhan@bijlimittra.com",
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
    email: "sunny.chauhan@bijlimittra.com",
    rating: 4.6,
    reviews: 74,
    experience: "4 Years",
    hourlyRate: "₹229",
    skills: ["Routine Maintenance", "Cooler & Motor Rewinding", "Power Sockets"],
    about: "Reliable local electrician for fast home visits, wiring inspections, and quick switchboard repairs."
  }
];

export default function App() {
  const [electricians, setElectricians] = useState(initialElectricians);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const [selectedElectrician, setSelectedElectrician] = useState(null);
  const [bookingElectrician, setBookingElectrician] = useState(null);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showElectricianJoinModal, setShowElectricianJoinModal] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [newElecName, setNewElecName] = useState("");
  const [newElecPhone, setNewElecPhone] = useState("");
  const [newElecEmail, setNewElecEmail] = useState("");
  const [newElecExp, setNewElecExp] = useState("");
  const [newElecRate, setNewElecRate] = useState("");
  const [newElecSkills, setNewElecSkills] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingAddress, setBookingAddress] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      setIsLoggedIn(true);
      setUserRole("customer");
      setShowLoginModal(false);
    }
  };

  const handleElectricianRegister = (e) => {
    e.preventDefault();
    const cleanNum = newElecPhone.replace(/\D/g, "");
    const formattedPhone = cleanNum.startsWith("91") ? cleanNum : `91${cleanNum}`;

    const newWorker = {
      id: Date.now(),
      name: newElecName,
      phone: formattedPhone,
      displayPhone: `+91 ${cleanNum.slice(-10)}`,
      email: newElecEmail || `${newElecName.toLowerCase().replace(/\s+/g, '')}@bijlimittra.com`,
      rating: 5.0,
      reviews: 1,
      experience: `${newElecExp} Years`,
      hourlyRate: `₹${newElecRate}`,
      skills: newElecSkills.split(",").map((s) => s.trim()).filter(Boolean),
      about: "Verified skilled electrical professional registered on the Bijli Mittra platform."
    };

    setElectricians([newWorker, ...electricians]);
    setIsLoggedIn(true);
    setUserRole("electrician");
    setShowElectricianJoinModal(false);

    setNewElecName("");
    setNewElecPhone("");
    setNewElecEmail("");
    setNewElecExp("");
    setNewElecRate("");
    setNewElecSkills("");
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

    const message = `*NEW BOOKING ALERT - BIJLI MITTRA*%0A%0A` +
      `*Electrician:* ${bookingElectrician.name}%0A` +
      `*Customer Name:* ${customerName}%0A` +
      `*Customer Phone:* ${customerPhone}%0A` +
      `*Schedule Date & Time:* ${bookingDate}%0A` +
      `*Service Address:* ${bookingAddress}%0A%0A` +
      `_Please confirm availability and contact the customer._`;

    const whatsappUrl = `https://wa.me/${bookingElectrician.phone}?text=${message}`;

    setBookingSuccess(true);

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
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-sm">
              ⚡
            </div>
            <div>
              <span className="text-2xl font-black text-blue-600 tracking-tight block">Bijli Mittra</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block -mt-1">Verified Electrician Network</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isLoggedIn && (
              <button
                onClick={() => setShowElectricianJoinModal(true)}
                className="hidden sm:inline-flex items-center gap-1.5 border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition cursor-pointer"
              >
                <span>🔧</span>
                <span>Join as Electrician</span>
              </button>
            )}

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {userRole === "electrician" ? "Electrician Partner" : "Customer Account"}
                </span>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setUserRole(null);
                  }}
                  className="text-xs sm:text-sm font-semibold text-rose-600 hover:text-rose-700 ml-1 cursor-pointer"
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

      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-14 px-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-3 tracking-tight">
          On-Demand Verified Electricians at Your Doorstep
        </h1>
        <p className="text-blue-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Transparent rates, instant booking notifications directly via WhatsApp, and fully verified professional electricians ready to serve you.
        </p>

        <div className="mt-5 sm:hidden">
          <button
            onClick={() => setShowElectricianJoinModal(true)}
            className="inline-block bg-white text-blue-700 font-bold text-xs px-4 py-2 rounded-lg shadow-sm"
          >
            🔧 Are you an electrician? Register here
          </button>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-200 gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Verified Electricians Directory
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Click on profile to review certifications or book instantly.</p>
          </div>
          <span className="self-start sm:self-auto text-xs sm:text-sm text-blue-700 font-bold bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full">
            ● {electricians.length} Professionals Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {electricians.map((elec) => {
            const initials = elec.name.split(" ").map(n => n[0]).join("").slice(0, 2);
            return (
              <div
                key={elec.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-sm flex-shrink-0 border-2 border-white">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold text-lg text-gray-900 truncate">{elec.name}</h3>
                        <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-md flex-shrink-0">
                          ★ {elec.rating}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                        ✓ Background Verified
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 mb-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-medium flex items-center gap-1.5">
                        <span>💼</span> Experience:
                      </span>
                      <span className="font-bold text-gray-900">{elec.experience}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-medium flex items-center gap-1.5">
                        <span>💰</span> Visiting Fee:
                      </span>
                      <span className="font-bold text-blue-600 text-sm">{elec.hourlyRate}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                      <span className="text-gray-500 font-medium flex items-center gap-1.5">
                        <span>📞</span> Phone:
                      </span>
                      <span className="font-bold text-gray-900">{elec.displayPhone}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-medium flex items-center gap-1.5">
                        <span>✉️️</span> Email:
                      </span>
                      <span className="font-medium text-gray-700 truncate max-w-[150px]">{elec.email}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {elec.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 text-[11px] font-semibold px-2.5 py-1 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setSelectedElectrician(elec)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-gray-800 font-bold text-xs sm:text-sm py-2.5 rounded-xl transition cursor-pointer"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => initiateBooking(elec)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>💬</span>
                    <span>{isLoggedIn ? "Book Now" : "Login to Book"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* MODAL 1: VIEW FULL PROFILE */}
      {selectedElectrician && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedElectrician(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-black shadow-md">
                {selectedElectrician.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedElectrician.name}</h3>
                <p className="text-xs text-gray-500 font-medium">{selectedElectrician.email}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    ★ {selectedElectrician.rating} ({selectedElectrician.reviews} Reviews)
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ID Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-y border-gray-200 py-4 my-4 text-sm">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">About Technician</h4>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">{selectedElectrician.about}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-gray-500 font-semibold uppercase">Total Experience</span>
                  <p className="font-extrabold text-gray-900 text-sm sm:text-base mt-0.5">{selectedElectrician.experience}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-gray-500 font-semibold uppercase">Standard Visiting Fee</span>
                  <p className="font-extrabold text-blue-600 text-sm sm:text-base mt-0.5">{selectedElectrician.hourlyRate}</p>
                </div>
              </div>

              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100">
                <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">Direct Contact & WhatsApp:</span>
                <p className="text-sm font-bold text-blue-700 mt-0.5">{selectedElectrician.displayPhone}</p>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">Core Specializations:</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedElectrician.skills.map((s, i) => (
                    <span key={i} className="bg-slate-100 text-gray-800 text-xs px-2.5 py-1 rounded-md font-medium">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedElectrician(null)}
                className="w-1/2 bg-slate-100 hover:bg-slate-200 text-gray-800 font-bold py-3 rounded-xl text-sm transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => initiateBooking(selectedElectrician)}
                className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>💬</span>
                <span>{isLoggedIn ? "Book via WhatsApp" : "Login to Book"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: JOIN AS ELECTRICIAN */}
      {showElectricianJoinModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowElectricianJoinModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl font-bold cursor-pointer"
            >
              &times;
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔧</span>
              <h3 className="text-xl font-extrabold text-gray-900">Electrician Partner Registration</h3>
            </div>
            <p className="text-xs text-gray-500 mb-5">Create your verified profile to receive instant customer bookings directly on WhatsApp.</p>

            <form onSubmit={handleElectricianRegister}
            