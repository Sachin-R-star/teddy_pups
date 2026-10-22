import React, { useState, useEffect, useRef } from 'react';

/**
 * TeddyMascot - The signature animated SVG puppy character for TeddyPups.
 * Faithfully matches the original implementation from puppy.instabizweb.com
 * Supports 'peek', 'walk', 'sit', 'hop' poses, eye tracking, blinking, tail wag,
 * and speech bubbles ("peekaboo!", "woof!", "every puppy is family!").
 */
export default function TeddyMascot({
  pose = 'peek',
  facing = 'right',
  interactive = true,
  className = '',
  style = {},
  onPet = null,
  scrollLinked = false
}) {
  const containerRef = useRef(null);
  const bubbleRef = useRef(null);

  // Animation states
  const [currentPose, setCurrentPose] = useState(pose);
  const [bubbleText, setBubbleText] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [tailAngle, setTailAngle] = useState(-20);
  const [blink, setBlink] = useState(0);
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const [earTwitch, setEarTwitch] = useState(0);
  const [walkPhase, setWalkPhase] = useState(0);
  const [isPetting, setIsPetting] = useState(false);

  // Sync prop changes
  useEffect(() => {
    setCurrentPose(pose);
  }, [pose]);

  // Handle Natural Blinking & Ear Twitches
  useEffect(() => {
    let blinkTimeout;
    const triggerBlink = () => {
      setBlink(1);
      setTimeout(() => setBlink(0), 160);
      blinkTimeout = setTimeout(triggerBlink, 2800 + Math.random() * 3000);
    };
    blinkTimeout = setTimeout(triggerBlink, 1500);

    let earInterval = setInterval(() => {
      setEarTwitch(Math.sin(Date.now() / 200) * 8);
      setTimeout(() => setEarTwitch(0), 400);
    }, 4500 + Math.random() * 2500);

    return () => {
      clearTimeout(blinkTimeout);
      clearInterval(earInterval);
    };
  }, []);

  // Continuous animation loop for tail wag, breathing & walk cycle
  useEffect(() => {
    let animId;
    let startTime = performance.now();

    const loop = (now) => {
      const elapsed = (now - startTime) / 1000;
      const wagSpeed = isPetting ? 14 : currentPose === 'walk' ? 9 : 4;
      const wagAmplitude = isPetting ? 24 : 14;
      
      const baseTail = currentPose === 'sit' ? 34 : currentPose === 'walk' ? -6 : -20;
      setTailAngle(baseTail + Math.sin(elapsed * wagSpeed) * wagAmplitude);

      if (currentPose === 'walk') {
        setWalkPhase(elapsed * 7.5);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [currentPose, isPetting]);

  // Eye tracking: gently look towards mouse
  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);
      setGaze({
        x: Math.max(-1, Math.min(1, dx)),
        y: Math.max(-1, Math.min(1, dy))
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Speech bubble helper
  const say = (text, duration = 1800) => {
    setBubbleText(text);
    setShowBubble(true);
    setTimeout(() => {
      setShowBubble(false);
    }, duration);
  };

  const handlePointerEnter = () => {
    if (!interactive) return;
    setIsPetting(true);
    const phrases = ['peekaboo!', 'woof! 🐾', 'hi friend!', 'every puppy is family!'];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    say(phrase);
    if (onPet) onPet();
  };

  const handlePointerLeave = () => {
    if (!interactive) return;
    setIsPetting(false);
  };

  const handleClick = () => {
    if (!interactive) return;
    say('peekaboo! ✨', 2000);
  };

  // Walk cycle leg rotation calculations
  const p = 25; // leg swing range
  const legAngle1 = currentPose === 'walk' ? Math.sin(walkPhase) * p : 0;
  const legAngle2 = currentPose === 'walk' ? Math.sin(walkPhase + Math.PI) * p : 0;
  const bodyBob = currentPose === 'walk' ? Math.abs(Math.sin(walkPhase)) * 4 : 0;

  const isPeek = currentPose === 'peek';
  const isSit = currentPose === 'sit';
  const isHop = currentPose === 'hop';
  const isWalk = currentPose === 'walk';

  // Body and head transform calculations based on pose
  let bodyY = isSit ? -2 : isHop ? -10 : bodyBob;
  let bodyRot = isSit ? -24 : isHop ? -9 : 0;
  let headY = isPeek ? 4 : isSit ? -6 : isHop ? -6 : (isWalk ? Math.sin(walkPhase) * 2 : 0);
  let headX = isSit ? -10 : 0;

  return (
    <div
      ref={containerRef}
      className={`pup-buddy select-none relative ${className}`}
      style={style}
      data-facing={facing}
      data-live={interactive ? "" : undefined}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <svg
        viewBox="0 0 300 240"
        style={{ overflow: 'visible', cursor: interactive ? 'pointer' : 'default' }}
        role="img"
        aria-label="Teddy, the TeddyPups mascot puppy"
        focusable="false"
      >
        <g data-p="root">
          {/* Shadow */}
          <ellipse
            data-p="shadow"
            cx="150"
            cy="230"
            rx={isPeek ? "0" : "92"}
            ry="7"
            fill="#2a170e"
            opacity={isPeek ? 0 : 0.12}
            transform={`translate(${isWalk ? Math.sin(walkPhase) * 2 : 0} 0)`}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />

          {/* Body & Legs (visible in walk, stand, sit, hop) */}
          <g
            data-p="body"
            transform={`translate(0 ${bodyY}) rotate(${bodyRot} 196 206)`}
            opacity={isPeek ? 0 : 1}
            style={{ transition: 'opacity 0.3s ease, transform 0.35s ease' }}
          >
            {/* Back far foot */}
            <g data-p="bf" transform={`translate(94 192) rotate(${legAngle1})`} opacity={isSit ? 0 : 1}>
              <path d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14Z" fill="#e4a352" />
              <path d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
              <path d="M-3.5 29 v5 M4.5 29 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            </g>

            {/* Front far foot */}
            <g data-p="ff" transform={`translate(168 192) rotate(${legAngle2})`}>
              <path d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z" fill="#e4a352" />
              <path d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
              <path d="M-3.5 29 v5 M4.5 29 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            </g>

            {/* Tail */}
            <g data-p="tail" transform={`rotate(${tailAngle} 84 150)`}>
              <path d="M86 152 C80 146 76 140 74 136" stroke="#2a170e" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" fill="none" />
              <path d="M86 152 C80 146 76 140 74 136" stroke="#f2be6b" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            </g>

            {/* Back near foot */}
            <g data-p="bn" transform={`translate(110 194) rotate(${legAngle2})`} opacity={isSit ? 0 : 1}>
              <path d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z" fill="#f2be6b" />
              <path d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
              <path d="M-3.5 27 v5 M4.5 27 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            </g>

            {/* Torso Fluff */}
            <path d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M182.7 196.4Q169.4 196.9 166.6 183.0Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191.0 134.0Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181.0Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />

            {/* Front near foot */}
            <g data-p="fn" transform={`translate(186 194) rotate(${legAngle1})`}>
              <path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z" fill="#f2be6b" />
              <path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
              <path d="M-3.5 27 v5 M4.5 27 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            </g>
          </g>

          {/* Haunch (for Sitting pose) */}
          <g data-p="haunch" opacity={isSit ? 1 : 0}>
            <path d="M80.0 204.0Q75.1 194.9 85.7 189.9Q88.4 180.2 100.7 181.2Q110.0 174.6 119.3 181.2Q131.6 180.2 134.3 189.9Q144.9 194.9 140.0 204.0Q144.9 213.1 134.3 218.1Q131.6 227.8 119.3 226.8Q110.0 233.4 100.7 226.8Q88.4 227.8 85.7 218.1Q75.1 213.1 80.0 204.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M132 222v5M139 222v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
          </g>

          {/* Head & Face */}
          <g data-p="head" transform={`translate(${headX} ${headY}) rotate(0 212 100)`}>
            {/* Red Collar & Gold Tag */}
            <path d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />

            {/* Left Ear */}
            <path
              data-p="earL"
              d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
              fill="#e4a352"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              transform={`rotate(${-6 + earTwitch} 174 82)`}
              style={{ transition: 'transform 0.15s ease' }}
            />

            {/* Right Ear */}
            <path
              data-p="earR"
              d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
              fill="#e4a352"
              stroke="#2a170e"
              strokeWidth="3.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              transform={`rotate(${6 - earTwitch} 250 82)`}
              style={{ transition: 'transform 0.15s ease' }}
            />

            {/* Fluffy Round Head */}
            <path d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />

            {/* Topknot Hair Tuft */}
            <path d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />

            {/* Cream Snout / Muzzle */}
            <path d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z" fill="#fbe3b4" />

            {/* Rosy Cheeks */}
            <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
            <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />

            {/* Eyes (Tracking gaze + Blinking) */}
            <g data-p="eyes" transform={`translate(${gaze.x * 3.4} ${gaze.y * 2.6})`}>
              <g data-p="open" opacity={1}>
                <g data-p="blink" transform={`translate(0 ${98 * blink * 0.92}) scale(1 ${1 - 0.92 * blink})`}>
                  <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                  <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                  <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                  <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                  <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                  <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
                </g>
              </g>
            </g>

            {/* Nose */}
            <path d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z" fill="#2a170e" />

            {/* Cute Smile / Mouth */}
            <path d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none" />

            {/* Pink Tongue (visible when panting / happy) */}
            <path data-p="tongue" d="M207.6 127.4 Q212 136.6 216.4 127.4 Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" opacity="1" />
          </g>

          {/* Front Paws on Ledge (Visible in Peek Pose) */}
          <g data-p="ledge" opacity={isPeek ? 1 : 0} style={{ transition: 'opacity 0.2s ease' }}>
            <path d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
          </g>
        </g>
      </svg>

      {/* Floating Speech Bubble */}
      <span
        ref={bubbleRef}
        aria-hidden="true"
        className="pup-bubble font-scrawl text-sm text-cocoa"
        data-show={showBubble ? "true" : "false"}
      >
        {bubbleText}
      </span>
    </div>
  );
}
