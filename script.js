// Mobile detection
const isMobile = window.innerWidth <= 768 || "ontouchstart" in window;
const isLowPerformance = window.innerWidth <= 480;

// Create spark effects inspired by the collaboration image
function createSpark(x, y) {
  // Reduce sparks on mobile for better performance
  if (isLowPerformance && Math.random() > 0.5) return;

  const spark = document.createElement("div");
  spark.className = "spark";
  spark.style.left = x + "px";
  spark.style.top = y + "px";

  // Random spark colors (blue, red, white)
  const colors = ["#3b82f6", "#ef4444", "#ffffff", "#fbbf24"];
  spark.style.background = colors[Math.floor(Math.random() * colors.length)];

  document.body.appendChild(spark);

  setTimeout(() => {
    if (spark.parentNode) {
      spark.parentNode.removeChild(spark);
    }
  }, 1000);
}

// Create sparks at the interaction point periodically
function createInteractionSparks() {
  // Reduce frequency on mobile
  if (isLowPerformance) return;

  const centerX = window.innerWidth * 0.4;
  const centerY = window.innerHeight * 0.4;

  const sparkCount = isMobile ? 2 : 3;
  for (let i = 0; i < sparkCount; i++) {
    setTimeout(() => {
      const offsetX = (Math.random() - 0.5) * 100;
      const offsetY = (Math.random() - 0.5) * 100;
      createSpark(centerX + offsetX, centerY + offsetY);
    }, i * 200);
  }
}

// Create interaction sparks every 3 seconds (less frequent on mobile)
setInterval(createInteractionSparks, isMobile ? 5000 : 3000);

// Create floating particles animation
function createParticle() {
  // Skip particles on very small screens
  if (isLowPerformance) return;

  const particle = document.createElement("div");
  particle.className = `particle ${Math.random() > 0.5 ? "blue" : "red"}`;

  // Smaller particles on mobile
  const baseSize = isMobile ? 15 : 20;
  const maxSize = isMobile ? 25 : 30;
  const size = Math.random() * maxSize + baseSize;
  particle.style.width = size + "px";
  particle.style.height = size + "px";

  // Random position
  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.top = Math.random() * window.innerHeight + "px";

  // Faster animation on mobile
  const baseDuration = isMobile ? 3 : 4;
  particle.style.animationDuration =
    Math.random() * baseDuration + baseDuration + "s";
  particle.style.animationDelay = Math.random() * 2 + "s";

  document.body.appendChild(particle);

  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 8000);
}

// Create particles periodically (less frequent on mobile)
setInterval(createParticle, isMobile ? 3000 : 2000);

// Enhanced link hover effects with collaboration-inspired animations
document.querySelectorAll(".link-item").forEach((link) => {
  // Use touchstart for mobile devices, mouseenter for desktop
  const eventType = isMobile ? "touchstart" : "mouseenter";

  link.addEventListener(eventType, function () {
    // Reduce spark effects on mobile
    const sparkCount = isMobile ? 3 : 5;

    // Create sparks around the hovered link
    const rect = this.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < sparkCount; i++) {
      setTimeout(() => {
        const angle = (i / sparkCount) * Math.PI * 2;
        const radius = isMobile ? 30 : 50;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        createSpark(x, y);
      }, i * 100);
    }

    // Add temporary glow effect (smaller on mobile)
    const glowDiv = document.createElement("div");
    glowDiv.style.position = "fixed";
    glowDiv.style.pointerEvents = "none";
    glowDiv.style.borderRadius = "50%";
    const glowSize = isMobile ? "80px" : "100px";
    const glowOffset = isMobile ? 40 : 50;
    glowDiv.style.width = glowSize;
    glowDiv.style.height = glowSize;
    glowDiv.style.zIndex = "5";
    glowDiv.style.left = centerX - glowOffset + "px";
    glowDiv.style.top = centerY - glowOffset + "px";

    if (this.classList.contains("instagram")) {
      glowDiv.style.background =
        "radial-gradient(circle, rgba(225, 48, 108, 0.3), transparent)";
    } else if (this.classList.contains("youtube")) {
      glowDiv.style.background =
        "radial-gradient(circle, rgba(255, 0, 0, 0.3), transparent)";
    } else if (this.classList.contains("linkedin")) {
      glowDiv.style.background =
        "radial-gradient(circle, rgba(0, 119, 181, 0.3), transparent)";
    } else if (this.classList.contains("email")) {
      glowDiv.style.background =
        "radial-gradient(circle, rgba(234, 67, 53, 0.3), transparent)";
    } else if (this.classList.contains("coming-soon")) {
      glowDiv.style.background =
        "radial-gradient(circle, rgba(156, 163, 175, 0.3), transparent)";
    } else {
      glowDiv.style.background =
        "radial-gradient(circle, rgba(66, 133, 244, 0.3), transparent)";
    }

    glowDiv.style.animation = "glowPulse 0.6s ease-out forwards";
    document.body.appendChild(glowDiv);

    setTimeout(() => {
      if (glowDiv.parentNode) {
        glowDiv.parentNode.removeChild(glowDiv);
      }
    }, 600);
  });
});

// Coming Soon button click handler
document.addEventListener("DOMContentLoaded", () => {
  const comingSoonBtn = document.querySelector(".coming-soon");

  if (comingSoonBtn) {
    comingSoonBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Create notification
      let notification = document.querySelector(".notification");
      if (!notification) {
        notification = document.createElement("div");
        notification.className = "notification";
        notification.innerHTML = "🚀 Website Coming Soon!";
        document.body.appendChild(notification);
      }

      // Show notification with animation
      notification.style.display = "block";
      notification.style.animation = "slideDown 0.5s ease-out forwards";

      // Create enhanced spark effects at click position
      const rect = comingSoonBtn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Create multiple sparks
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          createSpark(centerX, centerY);
        }, i * 100);
      }

      // Hide notification after 3 seconds
      setTimeout(() => {
        notification.style.animation = "slideUp 0.5s ease-in forwards";
        setTimeout(() => {
          notification.style.display = "none";
        }, 500);
      }, 3000);
    });
  }
});

// Mouse/touch move interaction with sparks
if (!isMobile) {
  // Only enable mouse tracking on desktop
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Calculate distance from center
    const distance = Math.sqrt(
      (mouseX - centerX) ** 2 + (mouseY - centerY) ** 2
    );

    // If mouse is near center, create collaboration sparks
    if (distance < 150) {
      if (Math.random() < 0.1) {
        // 10% chance per mousemove
        createSpark(mouseX, mouseY);
      }
    }
  });
} else {
  // Touch interaction for mobile
  document.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const touchX = touch.clientX;
      const touchY = touch.clientY;

      // Reduced spark generation on touch
      if (Math.random() < 0.05) {
        createSpark(touchX, touchY);
      }
    }
  });
}

// Dynamic gradient color shifting
let gradientHue = 0;
function shiftGradientColors() {
  gradientHue += 0.5;
  const afterElement = document.querySelector("body");
  afterElement.style.setProperty("--dynamic-hue", gradientHue + "deg");
}

setInterval(shiftGradientColors, 100);
