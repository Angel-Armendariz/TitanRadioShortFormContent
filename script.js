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
  // Shuffle the video URLs and store them
  let shuffledVideos = shuffleArray([...videoUrls]);
  // Shuffle the video URLs and store them
  let currentVideoIndex = 0;
  // Get the video frame from the DOM
  const frame = document.querySelector('#video-container .frame');

  // Shuffle the array and initialize the video elements
  shuffleAndInitialize();

  // Function to shuffle the array and initialize the videos
  function shuffleAndInitialize() {
    shuffledVideos = shuffleArray([...videoUrls]);
    populateVideos(true);
    attachEventListenersToCurrentVideo();
  }
// Function to shuffle an array
  function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle
    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // Swap the elements
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }
// Function to populate videos into the frame
  function populateVideos(initial = false) {
    if (initial) {
      frame.innerHTML = '';  // Clear the frame
    // Create video elements for the previous, current, and next videos
      const prevVideoElement = createVideoElement(getVideoUrl(-1));
      const currentVideoElement = createVideoElement(getVideoUrl(0));
      const nextVideoElement = createVideoElement(getVideoUrl(1));
    // Add classes for easier CSS and JS manipulation
      prevVideoElement.classList.add('video-wrapper', 'previous');
      currentVideoElement.classList.add('video-wrapper', 'current');
      nextVideoElement.classList.add('video-wrapper', 'next');
    // Append the created elements to the frame
      frame.append(prevVideoElement, currentVideoElement, nextVideoElement);
    } else {
      // Update the source URLs for the current, next, and previous videos
      updateSrc('.video-wrapper.current video source', getVideoUrl(0));
      updateSrc('.video-wrapper.next video source', getVideoUrl(1));
      updateSrc('.video-wrapper.previous video source', getVideoUrl(-1));
      // Reload the videos to reflect the new sources
      reloadVideos();
    }
  }
  // Function to update the source URL of a video element
  function updateSrc(selector, newSrc) {
    const element = frame.querySelector(selector);
    element.setAttribute('src', newSrc);
  }
  // Function to get the video URL based on the offset from the current index
  function getVideoUrl(offset) {
    return shuffledVideos[(currentVideoIndex + offset + shuffledVideos.length) % shuffledVideos.length];
  }

  function reloadVideos() {
    frame.querySelectorAll('.video-wrapper video').forEach(video => video.load());
  }

// Function to create a video element with the given URL
  function createVideoElement(url) {
    const videoWrapper = document.createElement('div');
    videoWrapper.innerHTML = `
      <video controls>
        <source src="${url}" type="video/mp4" />
      </video>
    `;
    return videoWrapper;
  }

  function attachEventListenersToCurrentVideo() {
    const currentVideo = frame.querySelector('.video-wrapper.current video');
    currentVideo.addEventListener('touchstart', handleTouchStart);
    currentVideo.addEventListener('touchend', handleTouchEnd);
    currentVideo.addEventListener('wheel', handleWheel);
  }

// Variable to store the Y coordinate of the initial touch point
  let touchStartY;
// Function to handle touch start event
function handleTouchStart(e) {
  e.preventDefault();  // Prevent page from scrolling
  touchStartY = e.touches[0].clientY;
}

// Function to handle touch end event
function handleTouchEnd(e) {
  e.preventDefault();  // Prevent page from scrolling
  const touchEndY = e.changedTouches[0].clientY;
  move(touchEndY < touchStartY ? 'down' : 'up');
}

// Function to handle wheel scroll event
function handleWheel(e) {
  e.preventDefault();  // Prevent page from scrolling
  move(e.deltaY > 0 ? 'down' : 'up');
}

// Function to swap the current, next, and previous videos based on the scroll direction
  function move(direction) {
    const classesToSwap = {
      current: direction === 'up' ? 'next' : 'previous',
      next: direction === 'up' ? 'previous' : 'current',
      previous: direction === 'up' ? 'current' : 'next',
    };
// Swap classes of video elements based on scroll direction
    Object.keys(classesToSwap).forEach(oldClass => {
      const newClass = classesToSwap[oldClass];
      const element = frame.querySelector(`.video-wrapper.${oldClass}`);
      element.classList.replace(oldClass, newClass);
    });

    // Update the current video index based on the scroll direction
    currentVideoIndex = (currentVideoIndex + (direction === 'up' ? -1 : 1) + shuffledVideos.length) % shuffledVideos.length;
    // Repopulate the videos and re-attach the event listeners
    populateVideos();
    attachEventListenersToCurrentVideo();
  }
});