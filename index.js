(async function(){
    let localStream;
    try {
        localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
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

    // イベントリスナを設置する関数
    const setEventListener = mediaConnection => {
        mediaConnection.on('stream', stream => {
            // video要素にカメラ映像をセットして再生
            const videoElm = document.getElementById('their-video')
            videoElm.srcObject = stream;
            videoElm.play();
        });
    }

    // 発信処理
    document.getElementById('make-call').onclick = () => {
        const theirID = document.getElementById('their-id').value;
        const mediaConnection = peer.call(theirID, localStream);
        setEventListener(mediaConnection);
    };

    //着信処理
    peer.on('call', mediaConnection => {
        mediaConnection.answer(localStream);
        setEventListener(mediaConnection);
    });
})();
