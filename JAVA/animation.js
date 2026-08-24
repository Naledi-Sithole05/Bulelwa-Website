document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined") return;
    if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ============================================================
       HERO — line draws in, dissolves, "Welcome" reveals letter by
       letter, tree fades in. (Unchanged from your original, with a
       scroll cue added at the end.)
       ============================================================ */
    const svgIcon = document.querySelector(".Svg-Icon");
    const path = svgIcon ? svgIcon.querySelector("path") : null;
    const treeVideo = document.querySelector(".Tree-Video");
    const welcome = document.querySelector(".Welcome");
    const scrollCue = document.querySelector(".Scroll-Cue");

    function splitLetters(el) {
        const text = el.textContent;
        el.textContent = "";
        return [...text].map((char) => {
            const span = document.createElement("span");
            span.className = "letter";
            if (char === " ") {
                span.classList.add("is-space");
                span.innerHTML = "&nbsp;";
            } else {
                span.textContent = char;
            }
            el.appendChild(span);
            return span;
        });
    }

    if (welcome && path && treeVideo) {
        const letters = splitLetters(welcome);
        const pathLength = path.getTotalLength();

        gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: prefersReducedMotion ? 0 : pathLength
        });
        gsap.set(svgIcon, { opacity: 1 });
        gsap.set(letters, { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 });
        gsap.set(treeVideo, { opacity: prefersReducedMotion ? 1 : 0 });

        const tl = gsap.timeline();

        tl.to(path, {
            strokeDashoffset: 0,
            duration: prefersReducedMotion ? 0 : 1.4,
            ease: "power1.inOut"
        })
        .to(svgIcon, {
            opacity: 0,
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: "power1.out"
        })
        .add(() => {
            treeVideo.classList.add("playing");
            treeVideo.play().catch(() => {});
        })
        .to(letters, {
            opacity: 1,
            y: 0,
            duration: prefersReducedMotion ? 0 : 0.5,
            stagger: prefersReducedMotion ? 0 : 0.08,
            ease: "power2.out"
        }, "<")
        .to(treeVideo, {
            opacity: 1,
            duration: prefersReducedMotion ? 0 : 1.2
        }, "<")
        .to(scrollCue, {
            opacity: 1,
            duration: 0.6,
            ease: "power1.out"
        }, "+=0.3");

        if (scrollCue && !prefersReducedMotion) {
            gsap.to(scrollCue.querySelector(".Scroll-Cue-Line"), {
                scaleY: 0.4,
                repeat: -1,
                yoyo: true,
                duration: 1.1,
                ease: "power1.inOut"
            });
        }
    }

    if (typeof ScrollTrigger === "undefined") return; // everything below needs it

    /* ============================================================
       SIGNATURE ELEMENT — the light-line grows down the page in
       step with scroll progress across the whole document.
       ============================================================ */
    const lightLinePath = document.querySelector(".Light-Line-Path");
    if (lightLinePath) {
        const lineLength = lightLinePath.getTotalLength();
        gsap.set(lightLinePath, {
            strokeDasharray: lineLength,
            strokeDashoffset: lineLength
        });

        ScrollTrigger.create({
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
            onUpdate: (self) => {
                gsap.set(lightLinePath, {
                    strokeDashoffset: lineLength * (1 - self.progress)
                });
            }
        });
    }

    /* ============================================================
       INTRO — bleed image parallax + quote card float-in
       ============================================================ */
    const landingImage = document.querySelector(".Landing-Page-Image");
    const landingQuote = document.querySelector(".Landing-Quote-Card");

    if (landingImage) {
        gsap.fromTo(landingImage,
            { scale: 1.15 },
            {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: ".Landing-Page",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );
    }

    if (landingQuote) {
        gsap.from(landingQuote, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: landingQuote,
                start: "top 80%"
            }
        });
    }

    /* ============================================================
       HER REASON — pinned section, each line steps into full
       opacity as the user scrolls through the pin.
       ============================================================ */
    const reasonSection = document.querySelector(".Section-2");
    const reasonLines = gsap.utils.toArray(".Her-Reason-Line");

    if (reasonSection && reasonLines.length) {
        const reasonTl = gsap.timeline({
            scrollTrigger: {
                trigger: reasonSection,
                start: "top top",
                end: `+=${reasonLines.length * 100}%`,
                scrub: 0.5,
                pin: true
            }
        });

        reasonLines.forEach((line, i) => {
            reasonTl.to(line, { opacity: 1, duration: 1 });
            if (i < reasonLines.length - 1) {
                reasonTl.to(line, { opacity: 0.12, duration: 1 }, "+=0.3");
            }
        });
    }

    /* ============================================================
       ABOUT — portrait reveal + stat count-up on scroll into view
       ============================================================ */
    const aboutPortrait = document.querySelector(".About-Portrait-Wrap");
    if (aboutPortrait) {
        gsap.from(aboutPortrait, {
            scale: 0.85,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: aboutPortrait,
                start: "top 80%"
            }
        });
    }

    gsap.utils.toArray(".Stat-Number").forEach((el) => {
        const target = Number(el.dataset.countTo || 0);
        const counter = { value: 0 };

        ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => {
                gsap.to(counter, {
                    value: target,
                    duration: prefersReducedMotion ? 0 : 1.6,
                    ease: "power1.out",
                    onUpdate: () => {
                        el.textContent = Math.round(counter.value).toLocaleString();
                    }
                });
            }
        });
    });

    /* ============================================================
       KEYNOTE — topic cards stagger in as the rail scrolls into view
       ============================================================ */
    const topicCards = gsap.utils.toArray(".Topic-Card");
    if (topicCards.length) {
        gsap.from(topicCards, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".Topic-Rail",
                start: "top 85%"
            }
        });
    }

    /* ============================================================
       TESTIMONIAL — quote fades and rises into place
       ============================================================ */
    const testimonial = document.querySelector(".Shepard-Teacher-Content");
    if (testimonial) {
        gsap.from(testimonial, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: testimonial,
                start: "top 80%"
            }
        });
    }

    /* ============================================================
       LESSONS — staggered card grid reveal + subtle hover tilt
       ============================================================ */
    const lessonCards = gsap.utils.toArray(".Lesson-Card");
    if (lessonCards.length) {
        gsap.from(lessonCards, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".Lessons-Grid",
                start: "top 85%"
            }
        });

        if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
            lessonCards.forEach((card) => {
                card.addEventListener("mousemove", (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    gsap.to(card, {
                        rotateX: y * -6,
                        rotateY: x * 6,
                        transformPerspective: 800,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });
                card.addEventListener("mouseleave", () => {
                    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
                });
            });
        }
    }
});