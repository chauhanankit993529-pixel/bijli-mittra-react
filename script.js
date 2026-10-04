const electricians = [
    { name: "Ravi Electricals", city: "Agra", services: ["Fan", "Cooler", "Wiring"], phone: "9876543210", rating: 4.8, lat: 27.1767, lon: 78.0081 },
    { name: "Sharma Electrician", city: "Agra", services: ["Fan", "AC", "Cooler"], phone: "9876543211", rating: 4.7, lat: 27.185, lon: 78.015 },
    { name: "Aman Electrical Works", city: "Delhi", services: ["Wiring", "Fan", "Inverter"], phone: "9876543212", rating: 4.9, lat: 28.6139, lon: 77.209 },
    { name: "Gupta Electrician", city: "Jaipur", services: ["Cooler", "Fan", "Wiring"], phone: "9876543213", rating: 4.6, lat: 26.9124, lon: 75.7873 }
];

let currentList = electricians;

function render(list = electricians) {
    currentList = list;
    const box = document.getElementById("electricianList");
    box.innerHTML = list.map((e, i) => `
    <div class="card">
      <h3>⚡ ${e.name}</h3>
      <div>${e.city}</div>
      <div class="rating">⭐ ${e.rating}/5</div>
      <div class="tags">Services: ${e.services.join(", ")}</div>
      <div class="actions">
        <a href="tel:${e.phone}"><button class="call">📞 Call</button></a>
        <button class="book" onclick="openBooking(${i})">📅 Book</button>
      </div>
    </div>`).join("");
}

function findElectricians() {
    const q = document.getElementById("searchInput").value.toLowerCase().trim();
    const list = electricians.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.services.some(s => s.toLowerCase().includes(q))
    );
    render(list);
}

function filterService(service) {
    render(service === "All" ? electricians : electricians.filter(e => e.services.includes(service)));
}

function sortByLocation() {
    if (!navigator.geolocation) {
        alert("Location is not supported by this browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        const distance = (e) => Math.sqrt((e.lat - latitude) ** 2 + (e.lon - longitude) ** 2);
        render([...electricians].sort((a, b) => distance(a) - distance(b)));
    }, () => alert("Please allow location access to use Near Me."));
}

function openBooking(index) {
    const e = currentList[index];
    document.getElementById("electricianName").value = e.name;
    document.getElementById("service").value = e.services[0];
    document.getElementById("bookingModal").classList.remove("hidden");
}

function closeBooking() { document.getElementById("bookingModal").classList.add("hidden"); }

document.getElementById("bookingForm").addEventListener("submit", function(ev) {
    ev.preventDefault();
    const booking = {
        id: Date.now(),
        customer: document.getElementById("customerName").value,
        mobile: document.getElementById("mobile").value,
        service: document.getElementById("service").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        electrician: document.getElementById("electricianName").value,
        status: "Pending"
    };
    const bookings = JSON.parse(localStorage.getItem("bm_bookings") || "[]");
    bookings.push(booking);
    localStorage.setItem("bm_bookings", JSON.stringify(bookings));
    alert("Booking request submitted successfully!");
    this.reset();
    closeBooking();
    showBookings();
});

function showBookings() {
    const bookings = JSON.parse(localStorage.getItem("bm_bookings") || "[]");
    const box = document.getElementById("bookings");
    if (!bookings.length) { box.innerHTML = "<p>No bookings yet.</p>"; return; }
    box.innerHTML = bookings.slice().reverse().map(b => `
    <div class="booking">
      <b>${b.electrician}</b> — ${b.service}<br>
      ${b.date} at ${b.time} • ${b.customer}
      <div class="status ${b.status.toLowerCase()}">Status: ${b.status}</div>
    </div>`).join("");
}
render();
showBookings();