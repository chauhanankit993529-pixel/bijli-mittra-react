import React, { useState, useEffect } from "react";

export default function App() {
  const ADMIN_PHONE = "918545859113";

  const [electricians, setElectricians] = useState([
    { id: 1, name: "Ramesh Sharma", service: "Fan", rating: "4.8 ⭐ (120+ jobs)", price: "₹199", city: "Duhai / BBDIT Campus" },
    { id: 2, name: "Amit Verma", service: "Wiring", rating: "4.9 ⭐ (85 jobs)", price: "₹299", city: "RDC Raj Nagar, Ghaziabad" },
    { id: 3, name: "Vikram Singh", service: "Cooler", rating: "4.7 ⭐ (94 jobs)", price: "₹249", city: "Muradnagar / Meerut Rd" },
    { id: 4, name: "Suresh Prajapati", service: "AC", rating: "4.9 ⭐ (210 jobs)", price: "₹399", city: "Govindpuram, Ghaziabad" }
  ]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [userLocation, setUserLocation] = useState("Duhai, Ghaziabad (BBDIT Campus)");
  const [currentUser, setCurrentUser] = useState(null);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTechModal, setShowTechModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);

  const [otpStep, setOtpStep] = useState(false);
  const [loginForm, setLoginForm] = useState({ name: "", phone: "", otp: "" });
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [selectedTech, setSelectedTech] = useState("");
  const [bookingForm, setBookingForm] = useState({ address: "", date: "" });
  const [techForm, setTechForm] = useState({ name: "", phone: "", service: "Fan", city: "", price: "" });

  useEffect(() => {
    const saved = localStorage.getItem("bm_user");
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem("bm_user");
      }
    }
  }, []);

  const handleDetectLocation = () => {
    setUserLocation("Detecting...");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation(`Duhai, Ghaziabad (${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)})`);
        },
        () => setUserLocation("Duhai, Ghaziabad (BBDIT Campus)"),
        { timeout: 5000 }
      );
    } else {
      setUserLocation("Duhai, Ghaziabad (BBDIT Campus)");
    }
  };

  const handleSendOtp = () => {
    if (!loginForm.name || loginForm.phone.length !== 10) {
      alert("Kripya apna poora naam aur 10-digit number dalein!");
      return;
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);
    alert(`⚡ Bijli Mittra Login OTP: ${otp}`);
    setOtpStep(true);
  };

  const handleVerifyOtp = () => {
    if (loginForm.otp === generatedOtp) {
      const userObj = { name: loginForm.name, phone: loginForm.phone };
      localStorage.setItem("bm_user", JSON.stringify(userObj));
      setCurrentUser(userObj);
      setShowLoginModal(false);
      setOtpStep(false);
      alert("Login safal raha!");
    } else {
      alert("Galat OTP! Sahi OTP dalein.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("bm_user");
    setCurrentUser(null);
    alert("Aap logout ho chuke hain.");
  };

  const handleRegisterTech = (e) => {
    e.preventDefault();
    const newTech = {
      id: Date.now(),
      name: techForm.name,
      service: techForm.service,
      rating: "5.0 ⭐ (New Partner)",
      price: techForm.price.startsWith("₹") ? techForm.price : "₹" + techForm.price,
      city: techForm.city
    };

    setElectricians([newTech, ...electricians]);
    setShowTechModal(false);
    alert(`Badhai ho ${techForm.name}! Aapki profile add ho gayi.`);

    const msg = `🛠️ *Naya Electrician Registration!*%0A👤 Name: ${techForm.name}%0A📞 Phone: ${techForm.phone}%0A🔧 Service: ${techForm.service} Specialist%0A📍 Area: ${techForm.city}%0A💰 Fee: ${techForm.price}`;
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${msg}`, "_blank");
  };

  const handleOpenBooking = (techName) => {
    if (!currentUser) {
      alert("Booking karne ke liye pehle Login karein!");
      setShowLoginModal(true);
      return;
    }
    setSelectedTech(techName);
    setShowBookModal(true);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setShowBookModal(false);
    const msg = `⚡ *Bijli Mittra - Nayi Booking Request!*%0A👤 Customer: ${currentUser.name}%0A📞 Phone: ${currentUser.phone}%0A🔧 Electrician: ${selectedTech}%0A📍 Address: ${bookingForm.address}%0A📅 Date: ${bookingForm.date}`;
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${msg}`, "_blank");
  };

  const filteredElectricians = activeFilter === "All"
    ? electricians
    : electricians.filter((item) => item.service === activeFilter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans">
      <div>
        <header className="bg-white px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-40">
          <div className="text-2xl font-bold text-sky-600 flex items-center gap-1 cursor-pointer">
            ⚡ Bijli Mittra
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTechModal(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              Join as Electrician 🛠️
            </button>
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-sky-600">👤 {currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-2.5 py-1.5 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setOtpStep(false); setShowLoginModal(true); }}
                className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
              >
                Login
              </button>
            )}
          </div>
        </header>

        <section className="bg-gradient-to-r from-sky-600 to-sky-700 text-white py-12 px-4 text-center">
          <h1 className="text-3xl font-extrabold mb-2">Reliable Electricians Near You</h1>
          <p className="text-sky-100 text-sm md:text-base">Doorstep electrical repair within 30 minutes</p>

          <div className="max-w-md mx-auto mt-6 flex gap-2 bg-white p-2 rounded-xl shadow-lg">
            <input
              type="text"
              readOnly
              value={userLocation}
              className="flex-1 px-3 text-slate-700 text-sm outline-none bg-transparent"
            />
            <button
              onClick={handleDetectLocation}
              className="bg-slate-100 hover:bg-slate-200 text-sky-600 text-sm font-semibold px-3 py-1.5 rounded-lg border border-slate-300"
            >
              📍 Near Me
            </button>
          </div>
        </section>

        <div className="flex justify-center gap-2 flex-wrap py-6 px-4">
          {["All", "Fan", "Cooler", "Wiring", "AC"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                activeFilter === cat
                  ? "bg-sky-600 text-white border-sky-600"
                  : "bg-white text-slate-600 border-slate-300 hover:border-sky-500"
              }`}
            >
              {cat === "All" ? "All Services" : `${cat} Specialist`}
            </button>
          ))}
        </div>

        <main className="max-w-6xl mx-auto px-4 w-full mb-12">
          <h2 className="text-xl font-bold mb-6 text-slate-800">Available Verified Technicians</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredElectricians.map((tech) => (
              <div key={tech.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{tech.name}</h3>
                  <span className="inline-block bg-sky-50 text-sky-700 text-xs font-semibold px-2 py-0.5 rounded mt-1 mb-2">
                    {tech.service} Specialist
                  </span>
                  <p className="text-xs text-slate-500 mb-1">📍 {tech.city}</p>
                  <p className="text-xs text-slate-500 mb-3">{tech.rating}</p>
                  <p className="text-lg font-bold text-emerald-600 mb-4">
                    {tech.price} <span className="text-xs text-slate-400 font-normal">Visiting Fee</span>
                  </p>
                </div>
                <button
                  onClick={() => handleOpenBooking(tech.name)}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold py-2 rounded-lg transition"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full relative shadow-xl">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-slate-400 text-lg">✕</button>
            <h3 className="text-lg font-bold mb-4">Customer Login</h3>

            {!otpStep ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Full Name</label>
                  <input
                    type="text"
                    placeholder="Apna naam dalein"
                    className="w-full border border-slate-300 rounded-lg p-2 text-sm mt-1 outline-none"
                    value={loginForm.name}
                    onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Mobile Number</label>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit number"
                    className="w-full border border-slate-300 rounded-lg p-2 text-sm mt-1 outline-none"
                    value={loginForm.phone}
                    onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
                  />
                </div>
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold py-2 rounded-lg mt-2"
                >
                  Send OTP
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Enter 4-Digit OTP</label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="OTP"
                    className="w-full border border-slate-300 rounded-lg p-2 text-sm mt-1 outline-none text-center font-bold tracking-widest"
                    value={loginForm.otp}
                    onChange={(e) => setLoginForm({ ...loginForm, otp: e.target.value })}
                  />
                </div>
                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold py-2 rounded-lg"
                >
                  Verify & Login
                </button>
                <button
                  onClick={() => setOtpStep(false)}
                  className="w-full bg-slate-100 text-slate-600 text-sm font-semibold py-1.5 rounded-lg"
                >
                  Back
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showTechModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full relative shadow-xl">
            <button onClick={() => setShowTechModal(false)} className="absolute top-4 right-4 text-slate-400 text-lg">✕</button>
            <h3 className="text-lg font-bold mb-1">Join as Partner Electrician</h3>
            <p className="text-xs text-slate-500 mb-4">Apni profile banayein.</p>
            <form onSubmit={handleRegisterTech} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Electrician ka naam"
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm mt-1 outline-none"
                  value={techForm.name}
                  onChange={(e) => setTechForm({ ...techForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Mobile Number</label>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  placeholder="10-digit number"
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm mt-1 outline-none"
                  value={techForm.phone}
                  onChange={(e) => setTechForm({ ...techForm, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Specialization</label>
                <select
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm mt-1 outline-none"
                  value={techForm.service}
                  onChange={(e) => setTechForm({ ...techForm, service: e.target.value })}
                >
                  <option value="Fan">Fan Specialist</option>
                  <option value="Cooler">Cooler Specialist</option>
                  <option value="Wiring">Wiring Specialist</option>
                  <option value="AC">AC Specialist</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Area / Locality</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Duhai, Ghaziabad"
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm mt-1 outline-none"
                  value={techForm.city}
                  onChange={(e) => setTechForm({ ...techForm, city: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Visiting Fee</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ₹200"
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm mt-1 outline-none"
                  value={techForm.price}
                  onChange={(e) => setTechForm({ ...techForm, price: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-2 rounded-lg mt-2"
              >
                Create Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {showBookModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full relative shadow-xl">
            <button onClick={() => setShowBookModal(false)} className="absolute top-4 right-4 text-slate-400 text-lg">✕</button>
            <h3 className="text-lg font-bold mb-1">Book Technician</h3>
            <p className="text-sm font-semibold text-sky-600 mb-4">Booking with: {selectedTech}</p>
            <form onSubmit={handleConfirmBooking} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600">Service Address</label>
                <input
                  type="text"
                  required
                  placeholder="Ghar ka pata"
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm mt-1 outline-none"
                  value={bookingForm.address}
                  onChange={(e) => setBookingForm({ ...bookingForm, address: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Date</label>
                <input
                  type="date"
                  required
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm mt-1 outline-none"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold py-2 rounded-lg mt-2"
              >
                Book via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-slate-900 text-slate-400 py-8 px-4 text-center text-sm leading-relaxed">
        <p><strong className="text-white">Bijli Mittra Services Pvt. Ltd.</strong></p>
        <p>A-Block, BBDIT Campus, Delhi-Meerut Road, Duhai, Ghaziabad, UP - 201206</p>
        <p className="mt-1">📞 +91 85458 59113 | ✉️ contact@bijlimittra.com</p>
        <p className="mt-3 text-xs text-slate-500">&copy; 2026 Bijli Mittra. All rights reserved.</p>
      </footer>
    </div>
  );
}