let highestZ = 1;

class Paper {
  holdingPaper = false;
  prevX = 0;
  prevY = 0;
  currentX = 0;
  currentY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    paper.style.touchAction = "none"; // biar gak scroll pas geser

    paper.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.prevX = e.clientX;
      this.prevY = e.clientY;
    });

    paper.addEventListener("pointermove", (e) => {
      if (!this.holdingPaper) return;

      // hitung jarak gerakan
      const dx = e.clientX - this.prevX;
      const dy = e.clientY - this.prevY;

      this.currentX += dx;
      this.currentY += dy;

      this.prevX = e.clientX;
      this.prevY = e.clientY;

      paper.style.transform =
        `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
    });

    paper.addEventListener("pointerup", () => {
      this.holdingPaper = false;
    });

    paper.addEventListener("pointercancel", () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
