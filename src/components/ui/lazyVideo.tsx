"use client"

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
    src: string;
    poster?: string;
    className?: string;
};

// Poster image convention: /videos/foo.mp4 -> /videos/posters/foo.jpg
export function posterFor(src: string): string | undefined {
    if (!src || !src.startsWith("/videos/") || !src.endsWith(".mp4")) return undefined;
    return src.replace("/videos/", "/videos/posters/").replace(/\.mp4$/, ".jpg");
}

/**
 * A muted, looping video that only downloads once it scrolls near the viewport,
 * and pauses when it leaves the viewport. Shows a lightweight poster until then.
 */
export default function LazyVideo({ src, poster, className }: LazyVideoProps) {
    const ref = useRef<HTMLVideoElement>(null);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        if (typeof IntersectionObserver === "undefined") {
            setLoad(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoad(true);
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { rootMargin: "200px 0px" }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (load) ref.current?.play().catch(() => {});
    }, [load]);

    return (
        <video
            ref={ref}
            className={className}
            poster={poster ?? posterFor(src)}
            src={load ? src : undefined}
            preload="none"
            loop
            muted
            playsInline
        />
    );
}
