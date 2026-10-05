import React, { useState } from 'react';

const electriciansData = [
  {
    id: 1,
    name: "Anshu Chauhan",
    phone: "919580786144",
    displayPhone: "+91 95807 86144",
    email: "anshu.chauhan@bijlimittra.com",
    rating: 4.9,
    reviews: 142,
    experience: "7 Years",
    rate: "₹299",
    skills: ["Full House Wiring", "Short Circuit Repair", "MCB Setup"],
    about: "Certified senior electrical technician specializing in fault detection and residential wiring."
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
    rate: "₹249",
    skills: ["Inverter Setup", "Ceiling Fan Repair", "Switchboard Fitting"],
    about: "Quick response technician for household appliances and emergency line faults."
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
    rate: "₹279",
    skills: ["Appliance Repair", "Geyser Setup", "Lighting Design"],
    about: "Expert in decorative lighting and home electrical appliance servicing."
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
    rate: "₹349",
    skills: ["Industrial Wiring", "Solar Inverter Grid", "Heavy Machinery"],
    about: "Specialist with extensive background in commercial and industrial electrical setups."
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
    rate: "₹229",
    skills: ["Routine Maintenance", "Motor Rewinding", "Power Sockets"],
    about: "Reliable local electrician for fast home visits and wiring inspections."
  }
];

export default function App() {
  const [electricians, setElectricians] = useState(electriciansData);
  const [user, setUser] = useState(null);

  // Modals
  const [selectedElectrician, setSelectedElectrician] = useState(null);
  const [bookingTarget, setBookingTarget] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  // Auth Inputs
  const [userNameInput, setUserNameInput] = useState("");
  const [userEmailInput, setUserEmailInput] = useState("");

  // Join Electrician Inputs
  const [elecName, setElecName] = useState("");
  const [elecPhone, setElecPhone] = useState("");
  const [elecExp, setElecExp] = useState("");
  const [elecRate, setElecRate] = useState("");
  const [elecSkills, setElecSkills] = useState("");

  // Booking Inputs
  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookDateTime, setBookDateTime] = useState("");
  const [bookAddress, setBookAddress] = useState("");

  // Handle Login/Signup
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setUser(authMode === "signup" ? (userNameInput || "User") : "Customer");
    setAuthModalOpen(false);
    setUserNameInput("");
    setUserEmailInput("");
  };

  // Handle Electrician Join
  const handleElectricianSubmit = (e) => {
    e.preventDefault();
    const cleanNumber = elecPhone.replace(/\D/g, "");
    const formattedPhone = cleanNumber.startsWith("91") ? cleanNumber : `91${cleanNumber}`;

    const newWorker = {
      id: Date.now(),
      name: elecName,
      phone: formattedPhone,
      displayPhone: `+91 ${cleanNumber.slice(-10)}`,
      email: `${elecName.toLowerCase().replace(/\s+/g, '')}@bijlimittra.com`,
      rating: 5.0,
      reviews: 1,
      experience: `${elecExp} Years`,
      rate: `₹${elecRate}`,
      skills: elecSkills.split(",").map((s) => s.trim()).filter(Boolean),
      about: "Verified electrician registered on Bijli Mittra platform."
    };

    setElectricians([newWorker, ...electricians]);
    setUser(elecName);
    setJoinModalOpen(false);
    setElecName("");
    setElecPhone("");
    setElecExp("");
    setElecRate("");
    setElecSkills("");
  };

  // Handle Booking Submit to WhatsApp
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const textMsg = `*NEW BOOKING - BIJLI MITTRA*%0A%0A` +
      `*Electrician:* ${bookingTarget.name}%0A` +
      `*Customer Name:* ${bookName}%0A` +
      `*Contact Phone:* ${bookPhone}%0A` +
      `*Date/Time:* ${bookDateTime}%0A` +
      `*Address:* ${bookAddress}`;

    const waLink = `https://wa.me/${bookingTarget.phone}?text=${textMsg}`;
    window.open(waLink, '_blank');
    setBookingTarget(null);
    setBookName("");
    setBookPhone("");
    setBookDateTime("");
    setBookAddress("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <div>
              <h1 className="text-xl font-bold text-blue-600 leading-tight">Bijli Mittra</h1>
              <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Electrician Network</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!user && (
              <button
                onClick={() => setJoinModalOpen(true)}
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-bold px-3 py-1.5 rounded-lg"
              >
                Join as Electrician
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                  ● {user}
                </span>
                <button
                  onClick={() => setUser(null)}
                  className="text-xs text-rose-600 font-bold hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-1.5">
                <button
                  onClick={() => { setAuthMode("login"); setAuthModalOpen(true); }}
                  className="bg-blue-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg hover:bg-blue-700"
                >
                  Login
                </button>
                <button
                  onClick={() => { setAuthMode("signup"); setAuthModalOpen(true); }}
                  className="bg-gray-200 text-gray-800 text-xs font-bold px-3.5 py-1.5 rounded-lg hover:bg-gray-300"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-blue-600 text-white py-12 px-4 text-center">
        <h2 className="text-3xl font-extrabold mb-2">Verified Electricians at Your Doorstep</h2>
        <p className="text-blue-100 text-sm max-w-xl mx-auto">
          Direct WhatsApp booking, transparent fees, and professional background-checked technicians.
        </p>
      </section>

      {/* Directory Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Available Electricians</h3>
          <span className="text-xs bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full">
            {electricians.length} Technicians
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {electricians.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold text-base flex items-center justify-center">
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
                      <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                        ★ {item.rating}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold">✓ Background Verified</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-1.5 mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">💼 Experience:</span>
                    <span className="font-bold text-gray-900">{item.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">💰 Visiting Fee:</span>
                    <span className="font-bold text-blue-600">{item.rate}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-1">
                    <span className="text-gray-500">📞 Contact:</span>
                    <span className="font-bold text-gray-900">{item.displayPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">✉️ Email:</span>
                    <span className="text-gray-700 truncate max-w-[150px]">{item.email}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {item.skills.map((sk, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 text-[11px] font-medium px-2 py-0.5 rounded">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
                <button
                  onClick={() => setSelectedElectrician(item)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2 rounded-lg"
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    if (!user) {
                      setAuthMode("login");
                      setAuthModalOpen(true);
                    } else {
                      setBookingTarget(item);
                    }
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-lg"
                >
                  {user ? "Book Now" : "Login to Book"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal 1: View Profile */}
      {selectedElectrician && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 relative shadow-xl">
            <button onClick={() => setSelectedElectrician(null)} className="absolute top-3 right-3 text-gray-500 text-lg font-bold">&times;</button>
            <h3 className="text-lg font-bold text-gray-900">{selectedElectrician.name}</h3>
            <p className="text-xs text-gray-500 mb-3">{selectedElectrician.email}</p>
            <p className="text-xs text-gray-700 mb-4">{selectedElectrician.about}</p>
            
            <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1 mb-4">
              <div className="flex justify-between">
                <span>Experience:</span>
                <span className="font-bold">{selectedElectrician.experience}</span>
              </div>
              <div className="flex justify-between">
                <span>Visiting Charge:</span>
                <span className="font-bold text-blue-600">{selectedElectrician.rate}</span>
              </div>
              <div className="flex justify-between">
                <span>Direct Mobile:</span>
                <span className="font-bold">{selectedElectrician.displayPhone}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedElectrician(null)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal 2: Auth (Login / Sign Up) */}
      {authModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 relative shadow-xl">
            <button onClick={() => setAuthModalOpen(false)} className="absolute top-3 right-3 text-gray-500 text-lg font-bold">&times;</button>
            
            <div className="flex border-b border-gray-200 mb-4">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`flex-1 pb-2 text-xs font-bold ${authMode === "login" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className={`flex-1 pb-2 text-xs font-bold ${authMode === "signup" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              {authMode === "signup" && (
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter name"
                    value={userNameInput}
                    onChange={(e) => setUserNameInput(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900"
                  />
                </div>
              )}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Email or Mobile</label>
                <input
                  type="text"
                  required
                  placeholder="Enter email or mobile"
                  value={userEmailInput}
                  onChange={(e) => setUserEmailInput(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg text-xs"
              >
                {authMode === "login" ? "Sign In" : "Register"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Join as Electrician */}
      {joinModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 relative shadow-xl">
            <button onClick={() => setJoinModalOpen(false)} className="absolute top-3 right-3 text-gray-500 text-lg font-bold">&times;</button>
            <h3 className="text-base font-bold text-gray-900 mb-1">Join as Electrician</h3>
            <p className="text-xs text-gray-500 mb-3">Add your details to get listed.</p>

            <form onSubmit={handleElectricianSubmit} className="space-y-2.5">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={elecName}
                onChange={(e) => setElecName(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900"
              />
              <input
                type="tel"
                required
                placeholder="WhatsApp Number (10 digits)"
                value={elecPhone}
                onChange={(e) => setElecPhone(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  required
                  placeholder="Experience (Yrs)"
                  value={elecExp}
                  onChange={(e) => setElecExp(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900"
                />
                <input
                  type="number"
                  required
                  placeholder="Visiting Fee (₹)"
                  value={elecRate}
                  onChange={(e) => setElecRate(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900"
                />
              </div>
              <input
                type="text"
                required
                placeholder="Skills (e.g. Wiring, MCB, Inverter)"
                value={elecSkills}
                onChange={(e) => setElecSkills(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg text-xs"
              >
                Register Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 4: WhatsApp Booking Form */}
      {bookingTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 relative shadow-xl">
            <button onClick={() => setBookingTarget(null)} className="absolute top-3 right-3 text-gray-500 text-lg font-bold">&times;</button>
            <h3 className="text-base font-bold text-gray-900">Book {bookingTarget.name}</h3>
            <p className="text-xs text-blue-600 mb-3 font-semibold">Visiting Fee: {bookingTarget.rate}</p>

            <form onSubmit={handleBookingSubmit} className="space-y-2.5">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900"
                />
                <input
                  type="tel"
                  required
                  placeholder="Your Mobile Number"
                  value={bookPhone}
                  onChange={(e) => setBookPhone(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900"
                />
                <input
                  type="datetime-local"
                  required
                  value={bookDateTime}
                  onChange={(e) => setBookDateTime(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900"
                />
                <textarea
                  required
                  rows={2}
                  placeholder="Your Address"
                  value={bookAddress}
                  onChange={(e) => setBookAddress(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded p-2 text-xs text-gray-900"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-xs cursor-pointer"
                >
                  Send Request via WhatsApp
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }