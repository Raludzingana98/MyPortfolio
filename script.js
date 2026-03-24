// DARK MODE
document.getElementById("theme-toggle").onclick = () => {
    document.body.classList.toggle("light");
    const isDark = !document.body.classList.contains("light");
    document.getElementById("theme-toggle").textContent = isDark ? "🌙" : "☀️";
};

// MOBILE MENU
document.getElementById("menu").onclick = () => {
    document.getElementById("nav").classList.toggle("active");
};

// HEADER SCROLL EFFECT
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.classList.add("header-scrolled");
    } else {
        header.classList.remove("header-scrolled");
    }
});

// SCROLL ANIMATION
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

// TYPING EFFECT
const text = [
    "Software Developer", 
    "AI Systems Designer", 
    "Full-Stack Developer",
    "Computer Science Graduate",
    "Problem Solver"
];
let i = 0, j = 0, current = "", isDeleting = false;

function type() {
    current = text[i];
    document.getElementById("typing").textContent = current.substring(0, j);

    if(!isDeleting && j < current.length){
        j++;
    } else if(isDeleting && j > 0){
        j--;
    } else {
        isDeleting = !isDeleting;
        if(!isDeleting) {
            i = (i + 1) % text.length;
            setTimeout(type, 1000); // Pause at end of word
            return;
        }
    }

    setTimeout(type, isDeleting ? 50 : 100);
}

type();

// GITHUB PROJECTS (AUTO LOAD)
fetch("https://api.github.com/users/Raludzingana98/repos")
.then(res => res.json())
.then(data => {
    const container = document.getElementById("projects-container");
    container.innerHTML = ""; // Clear loader if any

    data.filter(repo => !repo.fork).slice(0,6).forEach(repo => {
        const card = document.createElement("div");
        card.className = "card hidden";
        
        card.innerHTML = `
            <div class="card-img"></div>
            <div class="card-content">
                <h3>${repo.name.replace(/-/g, ' ')}</h3>
                <p>${repo.description || "A professional software engineering project exploring modern technologies and problem-solving."}</p>
                <div class="tags">
                    <span>${repo.language || "Tech Stack"}</span>
                    <span>⭐ ${repo.stargazers_count}</span>
                </div>
                <a href="${repo.html_url}" target="_blank">View Project →</a>
            </div>
        `;
        
        container.appendChild(card);
        observer.observe(card);
    });
});

// COPY EMAIL
document.getElementById("copy-email").onclick = () => {
    const email = "raludzingana98@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const msg = document.getElementById("copy-msg");
        msg.classList.add("show");
        setTimeout(() => msg.classList.remove("show"), 2000);
    });
};

// CONTACT FORM (AJAX Submission)
const contactForm = document.getElementById("contact-form");
contactForm.onsubmit = async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector("button");
    const originalText = btn.textContent;
    
    btn.textContent = "Sending...";
    btn.disabled = true;

    try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert("Thank you! Your message has been sent successfully.");
            contactForm.reset();
        } else {
            alert("Oops! There was a problem submitting your form. Please try again.");
        }
    } catch (error) {
        alert("Oops! There was a problem submitting your form. Please try again.");
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
};