const body = document.body;
const wrapper = document.getElementById("lvideo-wrap");

document.querySelectorAll(".lvideo").forEach(el => {
  el.addEventListener("click", function(e) {
    e.preventDefault();
    const url = this.dataset.url;
    openVideo(url);
  });
});

function openVideo(url) {
  body.classList.add("lvideo-active");
  wrapper.classList.add("active");

  const startModal = `<div class="lvideo-overlay"></div>
                      <div class="lvideo-container">`;
  const finishModal = `</div><button class="lvideo-close">×</button>`;

  let content = '';

  // YouTube
  if (/youtube\.com|youtu\.be/i.test(url)) {
    const regExp = /^.*(?:youtu\.be\/|v\/|vi\/|embed\/|watch\?v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[1]) {
      content = `<iframe src="https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    }
  }
  // Vimeo
  else if (/vimeo/i.test(url)) {
    const match = url.match(/vimeo\.com\/(\d+)/);
    if (match && match[1]) {
      content = `<iframe src="https://player.vimeo.com/video/${match[1]}?autoplay=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    }
  }
  // MP4 / M4V / WebM
  else if (url.match(/\.(mp4|m4v|webm|ogg)$/i)) {
    content = `<video controls autoplay playsinline>
                 <source src="${url}" type="video/mp4">
               </video>`;
  } else {
    alert("Video format not supported");
    return;
  }

  // Ubaci modal u wrapper
  wrapper.innerHTML = `${startModal}${content}${finishModal}`;

  // Event listener za overlay
  const overlay = wrapper.querySelector(".lvideo-overlay");
  overlay.addEventListener("click", lvideoClose);

  // Event listener za close dugme
  const closeBtn = wrapper.querySelector(".lvideo-close");
  closeBtn.addEventListener("click", lvideoClose);

  // Klikom van video container-a zatvori modal (sigurnosni dodatak)
  wrapper.addEventListener("click", (e) => {
    if (!e.target.closest(".lvideo-container") && !e.target.classList.contains("lvideo-close")) {
      lvideoClose();
    }
  });
}

// Close function
function lvideoClose() {
  body.classList.remove("lvideo-active");
  wrapper.classList.remove("active");
  wrapper.innerHTML = "";
}
