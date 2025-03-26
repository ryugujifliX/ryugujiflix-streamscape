
import React from 'react';
import { toast } from '../../components/ui/use-toast';

interface StreamingSource {
  server: string;
  url: string;
  quality?: string;
}

interface SettingsPanelProps {
  streamingData: {
    sources: StreamingSource[];
  } | undefined;
  selectedServer: string;
  setSelectedServer: (server: string) => void;
  setVideoUrl: (url: string) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  streamingData, 
  selectedServer, 
  setSelectedServer,
  setVideoUrl
}) => {
  const handleServerChange = (server: string) => {
    setSelectedServer(server);
    if (streamingData) {
      const source = streamingData.sources.find(s => s.server === server);
      if (source) {
        console.log('Changing to server:', server, 'with URL:', source.url);
        setVideoUrl(source.url);
        toast({
          title: "Server Changed",
          description: `Now playing from ${server}`,
          duration: 2000,
        });
      } else {
        console.error('No source found for server:', server);
        toast({
          title: "Server Error",
          description: `Could not find source for ${server}`,
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="mt-4 p-4 bg-white/5 rounded-lg animate-scale-in">
      <h3 className="text-sm font-medium mb-3">Video Settings</h3>
      
      <div className="space-y-4">
        {/* Server Selection */}
        <div>
          <label className="text-xs text-white/60 block mb-2">Select Server</label>
          <div className="flex flex-wrap gap-2">
            {streamingData && streamingData.sources.length > 0 ? (
              streamingData.sources.map(source => (
                <button
                  key={source.server}
                  onClick={() => handleServerChange(source.server)}
                  className={`px-3 py-1 text-xs rounded-md ${
                    selectedServer === source.server 
                      ? 'bg-ryugu-red text-white' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  title={`Play using ${source.server} server (${source.quality || 'Auto'})`}
                >
                  {source.server} {source.quality && `(${source.quality})`}
                </button>
              ))
            ) : (
              <p className="text-xs text-white/60">No servers available</p>
            )}
          </div>
        </div>
        
        {/* Quality Selection */}
        <div>
          <label className="text-xs text-white/60 block mb-2">Video Quality</label>
          <div className="flex flex-wrap gap-2">
            {["1080p", "720p", "480p", "360p", "Auto"].map(quality => (
              <button
                key={quality}
                className={`px-3 py-1 text-xs rounded-md ${
                  quality === "1080p" 
                    ? 'bg-ryugu-red text-white' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {quality}
              </button>
            ))}
          </div>
        </div>
        
        {/* Playback Settings */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input type="checkbox" className="rounded bg-white/10 border-white/30 text-ryugu-red mr-2" />
            <span className="text-xs">Auto Play</span>
          </label>
          
          <label className="flex items-center">
            <input type="checkbox" className="rounded bg-white/10 border-white/30 text-ryugu-red mr-2" />
            <span className="text-xs">Auto Next</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
