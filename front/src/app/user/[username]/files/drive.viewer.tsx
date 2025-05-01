'use client';

import { useEffect, useRef } from 'react';

interface DriveViewerProps {
  fileurl: string;
  onClose: () => void;
}

const DriveViewer = ({ fileurl, onClose }: DriveViewerProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (viewerRef.current && !viewerRef.current.contains(event.target as Node)) {
        onClose(); // Close if click outside the viewer
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div ref={viewerRef} className="bg-white rounded-lg overflow-hidden w-[80%] h-[80%] shadow-lg">
        <iframe
          src={fileurl}
          width="100%"
          height="100%"
          allow="autoplay"
          title="Drive PDF Viewer"
        />
      </div>
    </div>
  );
};

export default DriveViewer;
