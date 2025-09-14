let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  currentX = 0;
  currentY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    const activePointers = new Map(); // simpan multi touch

    paper.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      activePointers.set(e.pointerId, e);

      if (!this.holdingPaper) {
        this.holdingPaper = true;
        paper.style.zIndex = highestZ++;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.prevX = this.startX;
        this.prevY = this.startY;
      }
    });

    paper.addEventListener("pointermove", (e) => {
      if (!this.holdingPaper) return;
      activePointers.set(e.pointerId, e);

      if (activePointers.size === 1) {
        // drag dengan 1 jari / mouse
        this.velX = e.clientX - this.prevX;
        this.velY = e.clientY - this.prevY;
        this.currentX += this.velX;
        this.currentY += this.velY;
        this.prevX = e.clientX;
        this.prevY = e.clientY;
      }

      if (activePointers.size === 2) {
        // rotasi dengan 2 jari
        const pts = Array.from(activePointers.values());
        const dx = pts[1].clientX - pts[0].clientX;
        const dy = pts[1].clientY - pts[0].clientY;
        this.rotation = Math.atan2(dy, dx) * (180 / Math.PI);
      }

      paper.style.transform =
        `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
    });

    paper.addEventListener("pointerup", (e) => {
      activePointers.delete(e.pointerId);
      if (activePointers.size === 0) {
        this.holdingPaper = false;
      }
    });

    paper.addEventListener("pointercancel", (e) => {
      activePointers.delete(e.pointerId);
      if (activePointers.size === 0) {
        this.holdingPaper = false;
      }
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
