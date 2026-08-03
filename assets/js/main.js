document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // هدر شیشه‌ای هنگام اسکرول
    // ==========================================
    const header = document.querySelector(".site-header");

    const handleHeaderScroll = () => {
        if (!header) return;

        if (window.scrollY > 15) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    handleHeaderScroll();
    window.addEventListener("scroll", handleHeaderScroll);



    // ==========================================
    // منوی موبایل
    // ==========================================
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuButton && mobileMenu) {

        const icon = mobileMenuButton.querySelector("i");

        const openMenu = () => {
            mobileMenu.classList.add("show");

            if (icon) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            }
        };

        const closeMenu = () => {
            mobileMenu.classList.remove("show");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        };

        mobileMenuButton.addEventListener("click", () => {

            if (mobileMenu.classList.contains("show")) {
                closeMenu();
            } else {
                openMenu();
            }

        });

        // بستن منو هنگام کلیک روی لینک
        const mobileLinks = document.querySelectorAll(".mobile-nav-link");

        mobileLinks.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // بستن منو هنگام کلیک بیرون
        document.addEventListener("click", (event) => {

            const isInsideMenu = mobileMenu.contains(event.target);
            const isMenuButton = mobileMenuButton.contains(event.target);

            if (
                mobileMenu.classList.contains("show") &&
                !isInsideMenu &&
                !isMenuButton
            ) {
                closeMenu();
            }

        });

        // بستن منو هنگام تغییر سایز صفحه
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 768) {
                closeMenu();
            }
        });
    }



    // ==========================================
    // دکمه بازگشت به بالا
    // ==========================================
    const backToTopButton = document.getElementById("back-to-top");

    if (backToTopButton) {

        const toggleBackToTop = () => {

            if (window.scrollY > 350) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }

        };

        toggleBackToTop();

        window.addEventListener("scroll", toggleBackToTop);

        backToTopButton.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }



    // ==========================================
    // انتخاب خودکار خدمت از URL
    // contact.html?service=web-design
    // ==========================================
    const urlParams = new URLSearchParams(window.location.search);
    const selectedService = urlParams.get("service");

    if (selectedService) {

        const serviceSelect = document.getElementById("service");

        if (serviceSelect) {
            serviceSelect.value = selectedService;
        }
    }



    // ==========================================
    // فرم تماس - نسخه نمایشی
    // ==========================================
    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    if (contactForm && formMessage) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            formMessage.classList.remove("hidden");
            formMessage.classList.remove("text-red-600");

            formMessage.classList.add(
                "text-emerald-600",
                "bg-emerald-50",
                "border",
                "border-emerald-200",
                "rounded-xl",
                "px-4",
                "py-3",
                "mt-4",
                "flex",
                "items-center",
                "gap-2"
            );

            formMessage.innerHTML = `
                <i class="fa-solid fa-circle-check"></i>
                <span>
                    درخواست شما در نسخه نمایشی ثبت شد.
                    در مرحله بعد، فرم به Laravel و SQL Server متصل می‌شود.
                </span>
            `;

            contactForm.reset();

        });

    }



    // ==========================================
    // انیمیشن ورود المان‌ها
    // ==========================================
    const revealElements = document.querySelectorAll(".reveal");

    if (revealElements.length > 0) {

        const revealObserver = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    }



    // ==========================================
    // اسکرول نرم برای لینک‌های داخلی
    // ==========================================
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId.length <= 1) return;

            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});
