import React, { useState, useRef, useEffect, useCallback } from "react"
import { addPropertyControls } from "framer"

const PHOTOS = [
    {
        src: "https://framerusercontent.com/images/6u1VnTgjEhq7PILl5IZxY3iK1cc.png",
        caption: "India Blockchain Week 2026",
        link: null,
    },
    {
        src: "https://framerusercontent.com/images/VGbLKZMQow57MTF0oOk5KUEWLM.png",
        caption: "Fifa World Cup Final 2022",
        link: null,
    },
    {
        src: "https://framerusercontent.com/images/h8tp1oADYaCDNoPstKGSpeN1f4.png",
        caption: "Network School September 2026",
        link: null,
    },
    {
        src: "https://framerusercontent.com/images/PLZsnquxXcHIrQqE66UV9jBppU.png",
        caption: "Pitched Shipwise at Redbull Basement Final 2024",
        link: null,
    },
    {
        src: "https://framerusercontent.com/images/jaSPPJsDG5IWYptepDLDk9vnpQ.png",
        caption: "Beat this robot at chess. all levels.",
        link: null,
    },
    {
        src: "https://framerusercontent.com/images/37GaddwT5zBbtBaKxEMjaaQ1A.png",
        caption: "I sometimes make cool videos",
        link: "https://www.youtube.com/watch?si=tfR-KCVfrJTYfaQJ&v=Ev8CuepqOcs&feature=youtu.be",
    },
    {
        src: "https://framerusercontent.com/images/tE4rcFLH977LYnVP8iju7HL1Q4.png",
        caption: "Hosted Ohpop x Cold Plunge Event at Network School",
        link: "https://www.instagram.com/reel/DOqfNnnEm-6/?utm_source=ig_web_copy_link",
    },
    {
        src: "https://framerusercontent.com/images/BhstWwjJKextchZqzJPi5UGE4.png",
        caption: "Shot & directed this at NS",
        link: "https://x.com/Kritikaaaa_10/status/1981399337252102583",
    },
    {
        src: "https://framerusercontent.com/images/gZBw7La1IhpHcACyXnvdPufUSPk.png",
        caption: "NS Sports Cup Winners",
        link: null,
    },
    {
        src: "https://framerusercontent.com/images/Sv9LVKyPSoVaJtMoXEMysWWk.png",
        caption: "Speaker at Web3 Conf Goa 2022",
        link: null,
    },
]

const CARD_W = 287
const CARD_H = 415

interface AnimState {
    next: number
    dir: 1 | -1
    phase: "pre" | "active"
}

function PhotoCard({ idx }: { idx: number }) {
    const photo = PHOTOS[idx]
    const rotation = idx % 2 === 0 ? 2 : -2

    return (
        <div
            style={{
                width: CARD_W,
                height: CARD_H,
                background: "#F8F5F3",
                boxShadow:
                    "0px 4px 6px -1px rgba(0,0,0,0.10), 0px 2px 4px -2px rgba(0,0,0,0.10)",
                position: "relative",
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "center center",
                flexShrink: 0,
            }}
        >
            <img
                src={photo.src}
                alt={photo.caption}
                draggable={false}
                style={{
                    position: "absolute",
                    left: 11.7,
                    top: 15.3,
                    width: 263.6,
                    height: 333,
                    objectFit: "cover",
                    display: "block",
                    userSelect: "none",
                    pointerEvents: "none",
                }}
            />
            {photo.link && (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        window.open(photo.link!, "_blank")
                    }}
                    style={{
                        position: "absolute",
                        top: 24,
                        right: 20,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "white",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        zIndex: 10,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
                    }}
                >
                    <span
                        style={{
                            fontSize: 11,
                            marginLeft: 2,
                            color: "#171717",
                            lineHeight: 1,
                            display: "block",
                        }}
                    >
                        ▶
                    </span>
                </button>
            )}
            <div
                style={{
                    position: "absolute",
                    top: 358.3,
                    left: 11.7,
                    right: 11.7,
                    fontFamily: '"Crimson Pro", serif',
                    fontSize: 14.5,
                    fontWeight: 400,
                    color: "#000000",
                    lineHeight: 1.3,
                    userSelect: "none",
                }}
            >
                {photo.caption}
            </div>
        </div>
    )
}

export default function PhotoCarousel() {
    const [current, setCurrent] = useState(0)
    const [anim, setAnim] = useState<AnimState | null>(null)
    const isAnimating = anim !== null
    const touchX = useRef<number | null>(null)
    const mouseX = useRef<number | null>(null)
    const dragging = useRef(false)

    const navigate = useCallback(
        (dir: 1 | -1) => {
            if (isAnimating) return
            const next = (current + dir + PHOTOS.length) % PHOTOS.length
            setAnim({ next, dir, phase: "pre" })
            requestAnimationFrame(() =>
                requestAnimationFrame(() =>
                    setAnim((s) => (s ? { ...s, phase: "active" } : s))
                )
            )
            setTimeout(() => {
                setCurrent(next)
                setAnim(null)
            }, 320)
        },
        [current, isAnimating]
    )

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") navigate(-1)
            if (e.key === "ArrowRight") navigate(1)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [navigate])

    const onTouchStart = (e: React.TouchEvent) => {
        touchX.current = e.touches[0].clientX
    }
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchX.current === null) return
        const diff = touchX.current - e.changedTouches[0].clientX
        if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1)
        touchX.current = null
    }
    const onMouseDown = (e: React.MouseEvent) => {
        mouseX.current = e.clientX
        dragging.current = true
    }
    const onMouseUp = (e: React.MouseEvent) => {
        if (!dragging.current || mouseX.current === null) return
        const diff = mouseX.current - e.clientX
        if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1)
        mouseX.current = null
        dragging.current = false
    }

    type CardEntry = {
        idx: number
        tx: string
        opacity: number
        transition: string
    }
    let cards: CardEntry[]

    if (!anim) {
        cards = [{ idx: current, tx: "0%", opacity: 1, transition: "none" }]
    } else {
        const { next, dir, phase } = anim
        const startTx = `${dir === 1 ? 100 : -100}%`
        if (phase === "pre") {
            cards = [
                { idx: current, tx: "0%", opacity: 0, transition: "none" },
                { idx: next, tx: startTx, opacity: 0, transition: "none" },
            ]
        } else {
            cards = [
                {
                    idx: next,
                    tx: "0%",
                    opacity: 1,
                    transition:
                        "transform 300ms ease-out, opacity 300ms ease-out",
                },
            ]
        }
    }

    const btnStyle: React.CSSProperties = {
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        border: "none",
        cursor: isAnimating ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        color: "#171717",
        flexShrink: 0,
        opacity: isAnimating ? 0.5 : 1,
        userSelect: "none",
        transition: "opacity 150ms",
    }

    return (
        <>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;1,400&display=swap');`}</style>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 24,
                    }}
                >
                    <button
                        style={btnStyle}
                        onClick={() => navigate(-1)}
                        disabled={isAnimating}
                        aria-label="Previous"
                    >
                        ←
                    </button>

                    <div
                        style={{
                            width: CARD_W,
                            height: CARD_H,
                            position: "relative",
                            overflow: "visible",
                            cursor: "grab",
                            flexShrink: 0,
                        }}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                    >
                        {cards.map(({ idx, tx, opacity, transition }) => (
                            <div
                                key={idx}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    transform: `translateX(${tx})`,
                                    opacity,
                                    transition,
                                    willChange: "transform, opacity",
                                }}
                            >
                                <PhotoCard idx={idx} />
                            </div>
                        ))}
                    </div>

                    <button
                        style={btnStyle}
                        onClick={() => navigate(1)}
                        disabled={isAnimating}
                        aria-label="Next"
                    >
                        →
                    </button>
                </div>
            </div>
        </>
    )
}

addPropertyControls(PhotoCarousel, {})
