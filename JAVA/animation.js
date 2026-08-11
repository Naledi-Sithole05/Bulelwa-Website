const Circle = document.querySelector(".Circle");
const treeVideo = document.querySelector(".Tree-Video");
const stage = document.querySelector(".Animation-Stage");


// Figure out the center of the stage, so the ball lands dead-center
// where the video will appear
const stageWidth = stage.offsetWidth;
const stageHeight = stage.offsetHeight;
const circleSize = 50; // matches .Circle width/height in CSS

const targetX = (stageWidth / 200) - (circleSize / 200);
const targetY = (stageHeight / 200) - (circleSize / 200);

// Starting state: off-screen to the left, invisible
gsap.set(Circle, { x: -300, y: targetY, opacity: 0 });

// Animate the ball in, landing at the center of the stage with an elastic settle
gsap.to(Circle, {
    x: targetX,
    opacity: 1,
    duration: 1.5,
    ease: "elastic.out(1, 0.5)",
    onComplete: () => {
        // Ball disappears...
        gsap.to(Circle, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                // ...then the video fades in and starts playing
                treeVideo.classList.add("playing");
                treeVideo.play();
            }
        });
    }

 
});

const Welcome = document.querySelector(".Welcome");
gsap.FromTo(Welcome,{
    
})