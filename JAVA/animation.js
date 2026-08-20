document.addEventListener("DOMContentLoaded", () => {
    const svgIcon = document.querySelector(".Svg-Icon");
    const path = svgIcon.querySelector("path");
    const treeVideo = document.querySelector(".Tree-Video");
    const welcome = document.querySelector(".Welcome");

    // --- Split "Welcome" into individual letter spans -----------------
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

    const letters = splitLetters(welcome);

    // --- Prep the SVG path for a "hand-drawn" line animation ----------
    const pathLength = path.getTotalLength();
    gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
    });

    // Starting states — SVG stays fixed at the edge (see CSS), it never moves.
    // Only its opacity and the stroke itself are animated.
    gsap.set(svgIcon, { opacity: 1 });
    gsap.set(letters, { opacity: 0, y: 20 });
    gsap.set(treeVideo, { opacity: 0 });

    const tl = gsap.timeline();

    // 1. The line draws itself in place at the screen's edge
    tl.to(path, {
        strokeDashoffset: 0,
        duration: 1.4,
        
        ease: "power1.inOut"
    })

    // 2. Once fully drawn, the line dissolves...
    .to(svgIcon, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out"
    })

    // 3. ...a 0.5s pause/beat between the line finishing and the next part starting...
    .add(() => {
        treeVideo.classList.add("playing");
        treeVideo.play();
    }, "+=0.0")

    // 4. ...then "Welcome" reveals letter by letter in the center
    .to(letters, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out"
    }, "<")

    // 5. The tree fades in simultaneously with the letters
    .to(treeVideo, {
        opacity: 1,
        duration: 1.2
    }, "<");
});