document.addEventListener('DOMContentLoaded', () => {
  const videoUrls = [
    'https://titanradio.org/wp-content/uploads/2023/09/Only-eating-mall-food-for-a-full-day-in-Thailand-foodie-shorts-thailand-mallfood-eating.mp4',
    'https://titanradio.org/wp-content/uploads/2023/09/The-cutest-dress-🥹-Shorts.mp4',
    'https://titanradio.org/wp-content/uploads/2023/09/Packing-School-Lunch-CANDY-CEREAL-Bella✨-shorts.mp4',
    'https://titanradio.org/wp-content/uploads/2023/09/No-One-Saw-that-Coming-shorts.mp4',
    // ... more URLs
  ];

  let shuffledVideos = shuffleArray([...videoUrls]);
  let currentVideoIndex = 0;
  const frame = document.querySelector('.frame');

  shuffleAndInitialize();

  // Shuffle the array and initialize the video elements
  function shuffleAndInitialize() {
    shuffledVideos = shuffleArray([...videoUrls]);
    playNextVideo();
  }

  // Function to shuffle an array
  function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  function playNextVideo() {
    const currentVideo = frame.querySelector('video');
    
    if (currentVideo) {
      currentVideo.className = 'fade-out';
      setTimeout(() => {
        currentVideo.remove();
        appendNewVideo();
      }, 500);
    } else {
      appendNewVideo();
    }
  }
  
  function appendNewVideo() {
    const videoElement = createVideoElement(getVideoUrl());
    videoElement.className = 'fade-in';
    videoElement.addEventListener('ended', onVideoEnd);
    frame.appendChild(videoElement);
  }
  

  function onVideoEnd() {
    currentVideoIndex++;
    if (currentVideoIndex >= shuffledVideos.length) {
      shuffleAndInitialize();
    } else {
      playNextVideo();
    }
  }

  function getVideoUrl() {
    return shuffledVideos[currentVideoIndex];
  }


  function createVideoElement(url) {
    const video = document.createElement('video');
    video.setAttribute('controls', 'true');

    const source = document.createElement('source');
    source.setAttribute('src', url);
    source.setAttribute('type', 'video/mp4');

    video.appendChild(source);

    // Attach wheel event listener for desktop
    video.addEventListener('wheel', handleWheel);

    // Attach touch event listeners for mobile
    let touchStartY;
    video.addEventListener('touchstart', e => {
      touchStartY = e.touches[0].clientY;
    });

    video.addEventListener('touchend', e => {
      const touchEndY = e.changedTouches[0].clientY;
      handleTouch(touchStartY, touchEndY);
    });

    return video;
  }

  let accumulatedDelta = 0; // To keep track of the scrolling
  const scrollThreshold = 100; // The scroll distance required to move to the next video

  let debounceTimer;

  function handleWheel(e) {
    e.preventDefault();
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      accumulatedDelta += e.deltaY;
  
      if (Math.abs(accumulatedDelta) >= scrollThreshold) {
        const direction = accumulatedDelta > 0 ? 'down' : 'up';
        move(direction);
        accumulatedDelta = 0;  // Reset the counter
      }
    }, 200); // 200ms debounce time
  }
  

  let accumulatedTouchDelta = 0; // To keep track of touch movement
  function handleTouch(startY, endY) {
    accumulatedTouchDelta = startY - endY;

    if (Math.abs(accumulatedTouchDelta) >= scrollThreshold) {
      const direction = accumulatedTouchDelta > 0 ? 'down' : 'up';
      move(direction);
      accumulatedTouchDelta = 0;  // Reset the counter
    }
  }

  function playNextVideo() {
    const currentVideo = frame.querySelector('video');
    if (currentVideo) {
      currentVideo.className = 'fade-out';
      setTimeout(() => {
        currentVideo.remove();
      }, 500);
    }

    const videoElement = createVideoElement(getVideoUrl());
    videoElement.className = 'fade-in';
    videoElement.addEventListener('ended', onVideoEnd);
    frame.appendChild(videoElement);
  }

  let throttle = false; // Add this line to control the throttle status
  const throttleTime = 1000; // 1000 ms = 1 second, set this to the value you need
  
  // Modify the move() function to implement throttling
  function move(direction) {
    if (throttle) return; // if throttle is true, return
    throttle = true; // set throttle to true to prevent function execution
    setTimeout(() => { throttle = false }, throttleTime); // reset the throttle flag after throttleTime
    
    // Update the current video index based on the scroll direction
    currentVideoIndex = (currentVideoIndex + (direction === 'up' ? -1 : 1) + shuffledVideos.length) % shuffledVideos.length;
    
    // Play the next video in the sequence
    playNextVideo();
  }
  
});
