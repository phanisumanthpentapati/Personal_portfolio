
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const year = document.getElementById("year");

// Replace with your actual email address.
const recipient = "your-email@example.com";

year.textContent = new Date().getFullYear();

// Mobile menu
menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "✕" : "☰";
});

// Close mobile menu after selecting a link
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// Highlight the navigation link for the current section
const sections = document.querySelectorAll("main section[id]");
const navItems = navLinks.querySelectorAll('a[href^="#"]');

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(link => {
                    const active =
                        link.getAttribute("href") === `#${entry.target.id}`;

                    link.classList.toggle("active", active);
                });
            }
        });
    }, {
        rootMargin: "-25% 0px -60% 0px"
    });

    sections.forEach(section => observer.observe(section));
}

// Contact form: prepare an email in the visitor's email application
contactForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    if (recipient === "your-email@example.com") {
        formStatus.textContent =
            "Please update the recipient email in script.js before using this form.";
        return;
    }

    const data = new FormData(contactForm);
    const name = data.get("name").trim();
    const email = data.get("email").trim();
    const message = data.get("message").trim();

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    formStatus.textContent =
        "Opening your email application. Please send the prepared email to complete your message.";

    window.location.href =
        `mailto:${recipient}?subject=${subject}&body=${body}`;
});
