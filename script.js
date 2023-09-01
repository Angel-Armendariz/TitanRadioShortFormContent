const replayBoxes = document.querySelectorAll(".replay-box");
const colorObjects = [
  { name: "Red", hex: "#ff5733" },
  { name: "Green", hex: "#33ff57" },
  { name: "Blue", hex: "#5733ff" }
  // Add more color objects as needed
];

let currentColorIndexReplay = Math.floor(Math.random() * colorObjects.length);

function changeReplayBoxColor() {
  // Generate a random index to select a color object
  const randomIndex = Math.floor(Math.random() * colorObjects.length);

  // Apply the selected color to all replay boxes
  replayBoxes.forEach((box) => {
    box.style.backgroundColor = colorObjects[randomIndex].hex;
  });

  currentColorIndexReplay = randomIndex;

  // Check if the scroll has reached the bottom
  const replayContainer = document.querySelector(".replays-container");
  if (
    replayContainer.scrollTop + replayContainer.clientHeight >=
    replayContainer.scrollHeight
  ) {
    // Reset the scroll position to the top
    replayContainer.scrollTop = 0;
  }
}

window.addEventListener("scroll", changeReplayBoxColor);
