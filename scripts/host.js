const videoElem = document.getElementById("video");
const videoStartElem = document.getElementById("video-start");
const videoStopElem = document.getElementById("video-stop");

videoStartElem.addEventListener(
  "click",
  (evt) => {
    startCapture();
  },
  false,
);

videoStopElem.addEventListener(
  "click",
  (evt) => {
    stopCapture();
  },
  false,
);

const displayMediaOptions = {
  video: true,
  audio: {
    suppressLocalAudioPlayback: false,
  },
  preferCurrentTab: false,
  selfBrowserSurface: "exclude",
  systemAudio: "exclude",
  surfaceSwitching: "include",
  monitorTypeSurfaces: "include",
};

async function startCapture() {
  try {
    videoElem.srcObject =
      await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
  } catch (err) {
    console.error(err);
  }
}

function stopCapture(evt) {
  let tracks = videoElem.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  videoElem.srcObject = null;
}

