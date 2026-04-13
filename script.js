var timeout;

// Live clock in footer
function updateClock() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes().toString().padStart(2, "0");
    var ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    document.getElementById("clock").textContent = h + ":" + m + " " + ampm + " EST";
}
updateClock();
setInterval(updateClock, 60000);

// Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
});

// Page Loader
function loaderAnim() {
    var tl = gsap.timeline();
    tl.to("#loader h2", {
        y: "-100%",
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
        delay: 1,
    }).to("#loader", {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
        delay: -0.3,
        onComplete: function () {
            document.getElementById("loader").style.display = "none";
            firstPageAnim();
        },
    });
}

// Hero animations
function firstPageAnim() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: "expo.inOut",
    })
    .to(".boundingelem", {
        y: 0,
        ease: "expo.inOut",
        duration: 1.5,
        delay: -0.5,
        stagger: 0.15,
    })
    .from("#herofooter", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: -0.8,
        ease: "expo.inOut",
    });
}

// Custom cursor - squish effect
function circleChaptaKaro() {
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        // Show cursor on first move
        gsap.to("#minicircle", { opacity: 1, duration: 0.3 });

        clearTimeout(timeout);
        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
        xprev = dets.clientX;
        yprev = dets.clientY;
        circleMouseFollower(xscale, yscale);
        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform =
                `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);
    });
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform =
            `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    });
}

// Cursor grows on hoverable elements
document.querySelectorAll("a, h4, .elem, button").forEach(function (el) {
    el.addEventListener("mouseenter", function () {
        gsap.to("#minicircle", { scale: 4, duration: 0.3, ease: "power2.out" });
    });
    el.addEventListener("mouseleave", function () {
        gsap.to("#minicircle", { scale: 1, duration: 0.3, ease: "power2.out" });
    });
});

// Project card hover image follow
document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function () {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: "power3.out",
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: "power3.out",
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});

// Scroll-triggered fade-in for sections
gsap.from("#about", {
    scrollTrigger: { trigger: "#about", start: "top 80%" },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
});

loaderAnim();
circleChaptaKaro();
circleMouseFollower();
