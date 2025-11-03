// app/relax-session/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type OpenverseTrack = {
  id: number | string;
  title?: string;
  creator?: string;
  license?: string;
  url?: string;
  preview_url?: string;
};

type PexelsVideoFile = {
  id: number;
  quality: string; // "sd" | "hd" | "hls"
  link: string;
  file_type?: string; // "video/mp4" etc.
};

type PexelsVideo = {
  id: number;
  url: string;
  video_files: PexelsVideoFile[];
};

export default function RelaxSession() {
  // ---------- Openverse (AUDIO) ----------
  const [tracks, setTracks] = useState<OpenverseTrack[]>([]);
  const [audioLoading, setAudioLoading] = useState(true);
  const [audioError, setAudioError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setAudioLoading(true);
        setAudioError(null);
        const res = await fetch(
          "https://api.openverse.org/v1/audio/?q=relaxing%20music&license_type=all&page_size=10"
        );
        if (!res.ok) throw new Error(`Openverse error: ${res.status}`);
        const data = await res.json();
        if (!alive) return;
        setTracks(data?.results || []);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (!alive) return;
        setAudioError(e?.message || "Failed to load tracks");
      } finally {
        if (!alive) return;
        setAudioLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // ---------- Pexels (VIDEOS) ----------
  const [videos, setVideos] = useState<PexelsVideo[]>([]);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setVideoLoading(true);
        setVideoError(null);

        // Use your free Pexels API key from .env.local
        const key = process.env.NEXT_PUBLIC_PEXELS_KEY || "";
        if (!key) {
          setVideoError("Missing NEXT_PUBLIC_PEXELS_KEY (Pexels free API key).");
          setVideos([]);
          return;
        }

        const res = await fetch(
          "https://api.pexels.com/videos/search?query=relaxing+nature&per_page=10",
          { headers: { Authorization: key } }
        );
        if (!res.ok) throw new Error(`Pexels error: ${res.status}`);
        const data = await res.json();
        if (!alive) return;
        setVideos(data?.videos || []);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (!alive) return;
        setVideoError(e?.message || "Failed to load videos");
      } finally {
        if (!alive) return;
        setVideoLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // ---------- Single-Playback Logic (videos & audios) ----------
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const audioRefs = useRef<HTMLAudioElement[]>([]);

  const setVideoRef = (el: HTMLVideoElement | null, index: number) => {
    videoRefs.current[index] = el as HTMLVideoElement;
  };
  const setAudioRef = (el: HTMLAudioElement | null, index: number) => {
    audioRefs.current[index] = el as HTMLAudioElement;
  };

  const handlePlay = (type: "video" | "audio", index: number) => {
    // Pause all videos except the current one
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (type === "video") {
        if (i !== index && !v.paused) v.pause();
      } else {
        // if audio started, pause all videos
        if (!v.paused) v.pause();
      }
    });

    // Pause all audios except the current one
    audioRefs.current.forEach((a, i) => {
      if (!a) return;
      if (type === "audio") {
        if (i !== index && !a.paused) a.pause();
      } else {
        // if video started, pause all audios
        if (!a.paused) a.pause();
      }
    });
  };

  return (
    <div className="min-h-screen">
      {/* ---------- AUDIO: Openverse ---------- */}
      <section className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-semibold mb-6 text-[#237591]">
          Relaxing Music Session 🎶
        </h1>

        {audioLoading && <p>Loading relaxing tracks...</p>}
        {audioError && <p className="text-red-600">Error: {audioError}</p>}

        {!audioLoading && !audioError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tracks.map((track, i) => (
              <div
                key={track.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white"
              >
                <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">
                  {track.title || "Untitled"}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {track.creator || "Unknown Artist"}
                </p>

                <audio
                  ref={(el) => setAudioRef(el, i)}
                  controls
                  src={track.preview_url || track.url}
                  className="w-full"
                  onPlay={() => handlePlay("audio", i)}
                />

                <p className="text-xs text-gray-500 mt-2">
                  License: {track.license || "Unknown"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------- VIDEO: Pexels (with sound) ---------- */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-[#237591]">
          Relax Nature Session 🌿
        </h2>

        {videoLoading && <p>Loading relaxing videos...</p>}

        {videoError && (
          <div className="rounded-lg border p-4 bg-white">
            <p className="text-red-600 font-medium mb-2">Video section unavailable</p>
            <p className="text-sm text-gray-700">
              {videoError}
              <br />
              Get a free key from Pexels and put it in <code>.env.local</code> as:
            </p>
            <pre className="bg-gray-100 rounded p-2 mt-2 text-xs overflow-auto">
              NEXT_PUBLIC_PEXELS_KEY=YOUR_PEXELS_API_KEY
            </pre>
          </div>
        )}

        {!videoLoading && !videoError && (
          <div style={{columns: "300px"}} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {videos.map((v, i) => (
              <VideoItem
                key={v.id}
                index={i}
                data={v}
                setRef={setVideoRef}
                onPlay={(idx) => handlePlay("video", idx)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ----------------------- Child component for each video ----------------------- */
function VideoItem({
  data,
  index,
  setRef,
  onPlay,
}: {
  data: PexelsVideo;
  index: number;
  setRef: (el: HTMLVideoElement | null, index: number) => void;
  onPlay: (index: number) => void;
}) {
  const vidRef = useRef<HTMLVideoElement | null>(null);
  const [unmuted, setUnmuted] = useState(false);
  const [hasAudio, setHasAudio] = useState<boolean | null>(null);

  // Pick an MP4 (prefer HD)
  const file =
    data.video_files?.find(
      (f) => f.file_type === "video/mp4" && f.quality === "hd"
    ) ||
    data.video_files?.find((f) => f.file_type === "video/mp4") ||
    data.video_files?.[0];

  // Expose ref to parent so it can pause others
  useEffect(() => {
    setRef(vidRef.current, index);
  }, [index, setRef]);

  // Detect if this clip has an audio track
  const checkHasAudio = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const el = vidRef.current as any;
    if (!el) return;
    try {
      // multiple browser heuristics
      const has =
        !!el.mozHasAudio ||
        !!el.webkitAudioDecodedByteCount ||
        (el.audioTracks && el.audioTracks.length > 0) ||
        // fallback: if readyState >= 2 and no audioTracks, we can't be sure
        false;
      setHasAudio(Boolean(has));
    } catch {
      setHasAudio(null);
    }
  };

  const unmuteAndPlay = async () => {
    const el = vidRef.current;
    if (!el) return;
    try {
      el.muted = false;
      el.volume = 1;
      setUnmuted(true);
      await el.play(); // user gesture => allowed
    } catch {
      // ignore
    }
  };

  if (!file) return null;

  return (
    <div className="relative">
      <video
        ref={vidRef}
        src={file.link}
        controls
        loop
        playsInline
        className="rounded-xl w-full shadow-md"
        // IMPORTANT: do not set muted, we want sound after user action
        onPlay={() => onPlay(index)}
        onLoadedMetadata={checkHasAudio}
      />

      {/* Tap-to-unmute overlay (visible until user unmutes/plays with sound) */}
      {!unmuted && (
        <button
          onClick={unmuteAndPlay}
          className="absolute inset-x-0 bottom-3 mx-auto w-40 rounded-full bg-black/60 text-white text-sm py-2"
        >
          🔊 Tap to unmute
        </button>
      )}

      {/* Badge if the clip appears to have no audio track */}
      {hasAudio === false && (
        <span className="absolute top-2 right-2 text-xs bg-gray-900/70 text-white px-2 py-1 rounded">
          No audio
        </span>
      )}
    </div>
  );
}
