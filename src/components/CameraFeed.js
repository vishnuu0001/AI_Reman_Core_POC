import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera } from 'lucide-react';

const CameraFeed = ({ onCapture }) => {
    const webcamRef = useRef(null);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "environment" // Uses rear camera on phones
    };

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            onCapture(imageSrc);
        }
    }, [webcamRef, onCapture]);

    return (
        <div className="webcam-wrapper" style={{position: 'relative', height: '100%', background: 'black'}}>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="webcam-feed"
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />

            {/* OVERLAY UI - Forced Z-Index to ensure visibility */}
            <div className="camera-overlay" style={{
                position: 'absolute', bottom: '20px', left: 0, width: '100%',
                display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999
            }}>
                <button
                    className="capture-btn"
                    onClick={capture}
                    style={{
                        background: '#ef4444', color: 'white', padding: '15px 30px',
                        borderRadius: '50px', border: '4px solid white', fontSize: '1.2rem',
                        fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px',
                        cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                    }}
                >
                    <Camera size={24} /> CAPTURE
                </button>
            </div>
        </div>
    );
};

export default CameraFeed;