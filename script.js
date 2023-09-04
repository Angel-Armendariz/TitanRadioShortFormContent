/*
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
Feel free to remove these once you come back, was not getting anything other than an empty box from the code*/ 

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // List of video URLs
  const videoUrls = [
    'https://titanradio.org/wp-content/uploads/2023/09/Only-eating-mall-food-for-a-full-day-in-Thailand-foodie-shorts-thailand-mallfood-eating.mp4',
    'https://titanradio.org/wp-content/uploads/2023/09/The-cutest-dress-🥹-Shorts.mp4',
    'https://titanradio.org/wp-content/uploads/2023/09/Packing-School-Lunch-CANDY-CEREAL-Bella✨-shorts.mp4',
    'https://titanradio.org/wp-content/uploads/2023/09/No-One-Saw-that-Coming-shorts.mp4',
    // ... more URLs
  ];
  // Function to shuffle an array
  function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    // Shuffle the array
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
    // Swap the current element with a randomly chosen one
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]
      ];
    }
    return array;
  }
// Shuffle the video URLs and initialize variables
  let shuffledVideos = shuffleArray([...videoUrls]);
  let currentVideoIndex = 0;
  const videoContainer = document.getElementById('video-container');
// Function to populate the videos on the page
  function populateVideos(initial = false) {
    if (initial) {
      // Remove all existing videos if it's the initial population
      while (videoContainer.firstChild) {
        videoContainer.removeChild(videoContainer.firstChild);
      }
  // Create and append video elements for the previous, current, and next videos
      const prevVideoElement = createVideoElement(shuffledVideos[(currentVideoIndex - 1 + shuffledVideos.length) % shuffledVideos.length]);
      const currentVideoElement = createVideoElement(shuffledVideos[currentVideoIndex]);
      const nextVideoElement = createVideoElement(shuffledVideos[(currentVideoIndex + 1) % shuffledVideos.length]);
  
      prevVideoElement.classList.add('video-wrapper', 'previous');
      currentVideoElement.classList.add('video-wrapper', 'current');
      nextVideoElement.classList.add('video-wrapper', 'next');
  
      videoContainer.appendChild(prevVideoElement);
      videoContainer.appendChild(currentVideoElement);
      videoContainer.appendChild(nextVideoElement);
    } else {
      // Update the src attributes for existing video elements if it's not the initial population
      const current = document.querySelector('.video-wrapper.current video source');
      const next = document.querySelector('.video-wrapper.next video source');
      const previous = document.querySelector('.video-wrapper.previous video source');
      
      current.setAttribute('src', shuffledVideos[currentVideoIndex]);
      next.setAttribute('src', shuffledVideos[(currentVideoIndex + 1) % shuffledVideos.length]);
      previous.setAttribute('src', shuffledVideos[(currentVideoIndex - 1 + shuffledVideos.length) % shuffledVideos.length]);
      // Reload the videos to apply the new src
      document.querySelectorAll('.video-wrapper video').forEach(video => video.load());
    }
  }
  // Function to create a video element for a given URL
  function createVideoElement(url) {
    const videoWrapper = document.createElement('div');
    videoWrapper.innerHTML = `
      <video controls>
        <source src="${url}" type="video/mp4" />
      </video>
    `;
    return videoWrapper;
  }
// Function to handle swipe or scroll direction
  function move(direction) {
    // Get the video elements for the current, next, and previous videos
    const current = document.querySelector('.video-wrapper.current');
    const next = document.querySelector('.video-wrapper.next');
    const previous = document.querySelector('.video-wrapper.previous');

  // Move the videos according to the swipe or scroll direction
    current.classList.replace('current', direction === 'up' ? 'next' : 'previous');
    next.classList.replace('next', direction === 'up' ? 'previous' : 'current');
    previous.classList.replace('previous', direction === 'up' ? 'current' : 'next');

// Force reflow to make the above changes take effect immediately
    current.offsetHeight;

// Update the current video index based on the move direction
    if (direction === 'up') {
      currentVideoIndex = (currentVideoIndex - 1 + shuffledVideos.length) % shuffledVideos.length;
    } else if (direction === 'down') {
      currentVideoIndex = (currentVideoIndex + 1) % shuffledVideos.length;
    }
// Repopulate the videos based on the new current index
    populateVideos();
  }
// Initialize variables for touch events
  let touchStartY = 0;

// Record the Y-coordinate when the touch starts
  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });
// Handle the end of the touch event
  document.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
  // Determine swipe direction and move accordingly  
    if (touchEndY < touchStartY) {
      move('down');
    } else if (touchEndY > touchStartY) {
      move('up');
    }
  });
// Handle mouse wheel events for scrolling
  document.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
      move('down');
    } else {
      move('up');
    }
  });
// Initially populate the videos on the page
  populateVideos(true);
});

