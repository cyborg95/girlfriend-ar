const target = document.querySelector('[mindar-image-target]');
const video = document.querySelector('#loveVideo');
const arVideo = document.querySelector('#arVideo');
const loading = document.querySelector('#loading');

const TARGET_WIDTH = 1;

function setVideoSize() {
    /*
     * The video should cover the entire AR target.
     *
     * The target itself is 1 unit wide.
     * We calculate the target height from the
     * original photo aspect ratio.
     */

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    if (!videoWidth || !videoHeight) {
        return;
    }

    /*
     * Get the aspect ratio of the target image.
     *
     * couple.jpg is loaded so we can determine
     * its exact dimensions.
     */

    const image = new Image();

    image.onload = function () {

        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;

        const targetAspectRatio = imageWidth / imageHeight;

        const targetHeight = TARGET_WIDTH / targetAspectRatio;

        /*
         * Make the AR video exactly the same
         * proportions as the photo.
         */

        arVideo.setAttribute('width', TARGET_WIDTH);
        arVideo.setAttribute('height', targetHeight);

        console.log(
            'Target:',
            imageWidth,
            'x',
            imageHeight
        );

        console.log(
            'AR size:',
            TARGET_WIDTH,
            'x',
            targetHeight
        );
    };

    image.src = './assets/couple.jpg';
}


video.addEventListener('loadedmetadata', setVideoSize);


target.addEventListener('targetFound', () => {

    console.log('❤️ Photo detected');

    loading.style.display = 'none';

    setVideoSize();

    video.currentTime = 0;

    video.play().catch(error => {
        console.log('Video playback requires interaction:', error);
    });
});


target.addEventListener('targetLost', () => {

    console.log('Photo lost');

    video.pause();
});