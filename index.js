(async function(){
    try {
        const localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        const videoElement = document.getElementById('my-video');
        videoElement.srcObject = localStream;
        videoElement.play();
    }catch(error){
        alert(error);
    }

    const peer = new Peer({
        key: 'd9547008-e4bd-4d2e-b44d-bfa733153a8b',
        debug: 3
    });
    //PeerID取得
    peer.on('open', () => {
        document.getElementById('my-id').textContent = peer.id;
    });
})();
