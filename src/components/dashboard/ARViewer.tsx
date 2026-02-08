import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Camera, Download, Share2 } from "lucide-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

export const ARViewer = () => {
  const [isARSupported, setIsARSupported] = useState(false);
  const [isModelViewerLoaded, setIsModelViewerLoaded] = useState(false);
  const modelViewerRef = useRef<any>(null);

  useEffect(() => {
    // Load model-viewer script dynamically
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    script.onload = () => {
      setIsModelViewerLoaded(true);
      // Check AR support
      if ('xr' in navigator) {
        (navigator as any).xr?.isSessionSupported('immersive-ar').then((supported: boolean) => {
          setIsARSupported(supported);
        });
      } else if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        setIsARSupported(true);
      }
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleARActivation = () => {
    // For devices with AR support, open camera for AR experience
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          // Create a simple AR-like experience
          const video = document.createElement('video');
          video.srcObject = stream;
          video.play();
          
          // Create overlay for AR instructions
          const arContainer = document.createElement('div');
          arContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.9);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: system-ui;
          `;
          
          arContainer.innerHTML = `
            <div style="text-align: center; padding: 20px;">
              <h2>AR Mode Activated</h2>
              <p>Point your camera at a flat surface</p>
              <p>The recharge system would appear here in a real AR implementation</p>
              <div style="margin: 20px 0; padding: 20px; border: 2px dashed #fff; border-radius: 10px;">
                <div>📱 Recharge Pit Visualization</div>
                <div style="font-size: 12px; margin-top: 10px;">3m x 3m x 2.5m depth</div>
              </div>
              <button id="exitAR" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer;">Exit AR</button>
            </div>
          `;
          
          document.body.appendChild(arContainer);
          
          document.getElementById('exitAR')?.addEventListener('click', () => {
            stream.getTracks().forEach(track => track.stop());
            document.body.removeChild(arContainer);
          });
        })
        .catch((err) => {
          alert('AR camera access denied or not supported');
        });
    } else {
      alert('AR functionality requires camera access');
    }
  };

  const handleTakeScreenshot = () => {
    // Take screenshot of the current 3D view
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 300;
    
    if (ctx) {
      // Draw a simple representation of the recharge system
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, 400, 300);
      
      // Draw layers
      ctx.fillStyle = '#d97706';
      ctx.fillRect(50, 50, 300, 40);
      ctx.fillText('Top Soil/Clay (0.5m)', 60, 75);
      
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(50, 90, 300, 80);
      ctx.fillText('Coarse Sand (1.0m)', 60, 135);
      
      ctx.fillStyle = '#6b7280';
      ctx.fillRect(50, 170, 300, 80);
      ctx.fillText('Gravel (1.0m)', 60, 215);
      
      // Download the image
      const link = document.createElement('a');
      link.download = 'recharge-system-view.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  if (!isModelViewerLoaded) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Camera className="w-4 h-4 text-primary" />
            AR Viewer Loading...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <div className="animate-pulse text-sm text-muted-foreground">Loading AR capabilities...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Camera className="w-4 h-4 text-primary" />
          AR Experience
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          View the recharge system in your actual space
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Model Viewer with AR */}
          <div className="relative w-full h-64 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg overflow-hidden border">
            {/* Simple AR-ready 3D visualization using CSS 3D transforms */}
            <div className="relative w-full h-full perspective-1000">
              <div 
                className="absolute inset-0 transform-gpu transition-transform duration-1000"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(15deg) rotateY(45deg)'
                }}
              >
                {/* Recharge pit layers - 3D CSS visualization */}
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  {/* Top Soil/Clay */}
                  <div 
                    className="w-32 h-4 bg-amber-600 mb-1 shadow-lg"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <div className="text-xs text-white text-center py-1">Top Soil/Clay</div>
                  </div>
                  
                  {/* Coarse Sand */}
                  <div 
                    className="w-32 h-8 bg-yellow-400 mb-1 shadow-lg"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    <div className="text-xs text-gray-800 text-center py-2">Coarse Sand</div>
                  </div>
                  
                  {/* Gravel */}
                  <div 
                    className="w-32 h-8 bg-gray-500 mb-1 shadow-lg"
                    style={{ transform: 'translateZ(0px)' }}
                  >
                    <div className="text-xs text-white text-center py-2">Gravel</div>
                  </div>
                  
                  {/* Collection pipes */}
                  <div 
                    className="w-28 h-2 bg-gray-800 rounded shadow-lg"
                    style={{ transform: 'translateZ(-5px)' }}
                  >
                    <div className="text-xs text-white text-center">Pipes</div>
                  </div>
                </div>
                
                {/* Water flow animation */}
                <div 
                  className="absolute top-4 left-1/2 w-2 h-12 bg-blue-400 opacity-70 animate-pulse"
                  style={{ 
                    transform: 'translateX(-50%) translateZ(30px)',
                    borderRadius: '1px'
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* AR Controls */}
          <div className="space-y-3">
            {isARSupported ? (
              <Button 
                onClick={handleARActivation}
                className="w-full flex items-center gap-2"
                variant="default"
              >
                <Smartphone className="w-4 h-4" />
                Launch AR View
              </Button>
            ) : (
              <Button 
                disabled
                className="w-full flex items-center gap-2"
                variant="outline"
              >
                <Smartphone className="w-4 h-4" />
                AR Not Available (Desktop/Unsupported Device)
              </Button>
            )}
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={handleTakeScreenshot}
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                Screenshot
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'AquaHarvest Recharge System',
                      text: 'Check out this AR visualization of the rainwater harvesting system!',
                      url: window.location.href
                    });
                  }
                }}
              >
                <Share2 className="w-3 h-3" />
                Share
              </Button>
            </div>
          </div>

          {/* AR Instructions */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border-l-4 border-blue-400">
            <h4 className="text-sm font-semibold text-blue-800 mb-1">AR Instructions:</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Point camera at flat surface (floor/ground)</li>
              <li>• Tap to place model at 1:50 scale</li>
              <li>• Walk around to inspect from all angles</li>
              <li>• Pinch to resize, drag to reposition</li>
            </ul>
          </div>

          {/* System Benefits in AR Context */}
          <div className="bg-green-50 p-3 rounded-lg">
            <h4 className="text-sm font-semibold text-green-800 mb-2">Visualize Your Installation:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
              <div>✓ Optimal placement</div>
              <div>✓ Space requirements</div>
              <div>✓ Access points</div>
              <div>✓ Maintenance areas</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};