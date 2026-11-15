
/* ==========================================
   MAHEERA'S PORTFOLIO - MAIN JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       1. NAVBAR TOGGLE
    ========================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll(".nav-links a");
    const menuIcon = menuToggle?.querySelector("i");

    if (menuToggle && nav && menuIcon) {

        menuToggle.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("menu-open");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuIcon.classList.toggle("fa-bars", !isOpen);
            menuIcon.classList.toggle("fa-xmark", isOpen);

        });

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("menu-open");

                menuToggle.setAttribute("aria-expanded", "false");

                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");

            });

        });

    }


    /* ==========================================
       2. TOAST ELEMENTS
    ========================================== */

    const toast = document.getElementById("toast");
    const toastTitle = document.getElementById("toast-title");
    const toastMessage = document.getElementById("toast-message");
    const toastIcon = document.getElementById("toast-icon");
    const toastClose = document.getElementById("toast-close");
    const toastProgress = document.getElementById("toast-progress");

    let toastTimer;


    /* ==========================================
       3. SHOW TOAST NOTIFICATION
    ========================================== */

    function showToast(type, title, message) {

        if (
            !toast ||
            !toastTitle ||
            !toastMessage ||
            !toastIcon ||
            !toastProgress
        ) {
            console.error("Toast notification HTML is missing!");
            return;
        }

        clearTimeout(toastTimer);

        toast.classList.remove("show", "success", "error");

        toastProgress.style.animation = "none";

        void toastProgress.offsetWidth;

        toast.classList.add(type);

        toastTitle.textContent = title;
        toastMessage.textContent = message;

        if (type === "success") {

            toastIcon.innerHTML = '<i class="fas fa-check"></i>';

        } else {

            toastIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';

        }

        toast.classList.add("show");

        toastProgress.style.animation =
            "toastCountdown 5s linear forwards";

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 5000);

    }


    /* ==========================================
       4. CLOSE TOAST
    ========================================== */

    if (toastClose) {

        toastClose.addEventListener("click", () => {

            clearTimeout(toastTimer);

            toast.classList.remove("show");

        });

    }


    /* ==========================================
       5. CONTACT FORM SUBMISSION
    ========================================== */

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", async function (e) {

            e.preventDefault();

            const submitBtn = contactForm.querySelector(".submit-btn");

            if (!submitBtn) {
                console.error("Submit button not found!");
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";

            try {

                const response = await fetch(
                    "https://formsubmit.co/ajax/maheerabatool27@gmail.com",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },

                        body: JSON.stringify(
                            Object.fromEntries(
                                new FormData(contactForm).entries()
                            )
                        )
                    }
                );

                const result = await response.json();

                console.log("FormSubmit response:", result);

                if (
                    response.ok &&
                    String(result.success) === "true"
                ) {

                    showToast(
                        "success",
                        "Message Sent!",
                        "Thank you for reaching out! I'll get back to you soon."
                    );

                    contactForm.reset();

                } else {

                    console.error("FormSubmit rejected:", result.message);

                    showToast(
                        "error",
                        "Message Not Sent!",
                        result.message ||
                        "Something went wrong. Please try again."
                    );

                }

            } catch (error) {

                console.error("Contact Form Error:", error);

                showToast(
                    "error",
                    "Connection Error!",
                    "Unable to send your message. Please check your internet connection."
                );

            } finally {

                submitBtn.disabled = false;
                submitBtn.textContent = "Send Message";

            }

        });

    } else {

        console.error("Contact form not found!");

    }

});
