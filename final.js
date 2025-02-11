// GSAP Animations with ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Floating Particles Animation
const particles = document.querySelectorAll('.particle');
particles.forEach((particle, index) => {
    gsap.fromTo(
        particle,
        { y: "100vh", opacity: 0 },
        { y: "-50vh", opacity: 0.5, duration: 5, repeat: -1, delay: index * 0.5 }
    );
});

// Hero Section Animation
gsap.from(".hero-title", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power2.out",
});

gsap.from(".hero-subtitle", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5,
    ease: "power2.out",
});

gsap.from(".btn-primary", {
    opacity: 0,
    scale: 0.5,
    duration: 1,
    delay: 1,
    ease: "elastic.out(1, 0.3)",
});

// Features Section Animation
gsap.from(".feature-card", {
    opacity: 0,
    y: 100,
    stagger: 0.3,
    duration: 1.5,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".features",
        start: "top 80%",
    },
});

// Pricing Section Animation
gsap.from(".pricing-card", {
    opacity: 0,
    y: 100,
    stagger: 0.3,
    duration: 1.5,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".pricing",
        start: "top 80%",
    },
});

// Parallax Effect for Sections
gsap.to(".hero", {
    backgroundPosition: "50% 0%",
    scrollTrigger: {
        trigger: ".hero",
        scrub: true,
    },
});

gsap.to(".features", {
    backgroundPosition: "50% 50%",
    scrollTrigger: {
        trigger: ".features",
        scrub: true,
    },
});

// Upload Image Validation
document.getElementById("checkImage").addEventListener("click", () => {
    const uploadResult = document.getElementById("uploadResult");
    const imageFile = document.getElementById("imageUpload").files[0];

    if (!imageFile) {
        uploadResult.textContent = "Please upload an image!";
        uploadResult.style.color = "red";
    } else {
        const isFake = Math.random() > 0.5 ? "Fake Image Detected!" : "Image is Authentic!";
        uploadResult.textContent = isFake;
        uploadResult.style.color = isFake.includes("Fake") ? "red" : "green";

        gsap.fromTo(
            uploadResult,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 }
        );
    }
});
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent form from submitting normally

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Example validation (you can add more checks if needed)
    if (name && email && subject && message) {
        // Simulate a successful submission
        document.getElementById("confirmationMessage").textContent = "Thank you for contacting us, we will get back to you soon!";
        document.getElementById("confirmationMessage").style.display = "block";

        // Clear form
        document.getElementById("contactForm").reset();
    } else {
        // Display an error message if any field is missing
        document.getElementById("confirmationMessage").textContent = "Please fill out all fields.";
        document.getElementById("confirmationMessage").style.display = "block";
        document.getElementById("confirmationMessage").style.color = "red";
    }
});