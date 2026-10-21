import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HeroStage() {
  const [activeHover, setActiveHover] = useState(null);

  const seats = [
    {
      id: 'maltipoo-max-male',
      x: '9%',
      w: '8.6rem',
      peek: 0.62,
      tilt: '-5deg',
      i: 0,
      name: 'Max',
      breed: 'Maltipoo',
      image: 'https://puppy.instabizweb.com/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp',
      alt: 'Max, male Maltipoo puppy'
    },
    {
      id: 'korean-teacup-maltipoo-female',
      x: '22.5%',
      w: '10.4rem',
      peek: 0.8,
      tilt: '3deg',
      i: 1,
      name: 'Toy Poodle',
      tag: 'Toy Poodle',
      breed: 'Korean Teacup Maltipoo',
      image: 'https://puppy.instabizweb.com/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg',
      alt: 'Female Korean Teacup Maltipoo puppy'
    },
    {
      id: 'korean-teacup-poodle-female',
      x: '35%',
      w: '9.2rem',
      peek: 0.7,
      tilt: '-2deg',
      i: 2,
      name: 'Korean Teacup Poodle',
      breed: 'Korean Teacup Poodle',
      image: 'https://puppy.instabizweb.com/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg',
      alt: 'Female Korean Teacup Poodle puppy'
    },
    {
      id: 'maltipoo-cavapoo-male',
      x: '65%',
      w: '9.4rem',
      peek: 0.74,
      tilt: '3deg',
      i: 3,
      name: 'Maltipoo & Cavapoo',
      breed: 'Maltipoo & Cavapoo',
      image: 'https://puppy.instabizweb.com/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg',
      alt: 'Male Maltipoo & Cavapoo puppy'
    },
    {
      id: 'toy-poodle-male-female',
      x: '77.5%',
      w: '10.6rem',
      peek: 0.82,
      tilt: '-3deg',
      i: 4,
      name: 'Toy Poodle',
      breed: 'Toy Poodle',
      image: 'https://puppy.instabizweb.com/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg',
      alt: 'Toy Poodle puppy'
    },
    {
      id: 'maltipoo-female-2',
      x: '91%',
      w: '8.4rem',
      peek: 0.6,
      tilt: '4deg',
      i: 5,
      name: 'Maltipoo',
      breed: 'Maltipoo',
      image: 'https://puppy.instabizweb.com/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg',
      alt: 'Female Maltipoo puppy'
    }
  ];

  return (
    <div className="tp-hero__stage relative w-full h-[22rem] sm:h-[26rem] md:h-[28rem] mt-6 select-none overflow-hidden">
      {/* Arched Puppy Windows Lineup */}
      <ul className="tp-lineup" aria-label="Some of the puppies in our showroom">
        {seats.map((seat) => (
          <li
            key={seat.id}
            className="tp-lineup__seat"
            style={{
              '--x': seat.x,
              '--w': seat.w,
              '--peek': seat.peek,
              '--tilt': seat.tilt,
              '--i': seat.i
            }}
            onMouseEnter={() => setActiveHover(seat.id)}
            onMouseLeave={() => setActiveHover(null)}
          >
            {/* Tag / Speech Bubble (like "Toy Poodle") */}
            {seat.tag && (
              <span
                className="tp-lineup__name font-scrawl opacity-100 translate-y-0"
                style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 0.5rem)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#fffdf8',
                  border: '2px solid #2a170e',
                  borderRadius: '999px',
                  padding: '0.15rem 0.8rem',
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  color: '#2a170e',
                  boxShadow: '0 2px 4px rgba(42,23,14,0.1)',
                  zIndex: 35,
                  whiteSpace: 'nowrap'
                }}
              >
                {seat.tag}
              </span>
            )}

            <Link
              to={`/puppies/${seat.id}`}
              className="tp-lineup__pup block group cursor-pointer"
              aria-label={`Meet ${seat.name}, ${seat.breed}`}
            >
              <span className="tp-lineup__photo shadow-md group-hover:scale-105 transition-transform">
                <img
                  src={seat.image}
                  alt={seat.alt}
                  className="size-full object-cover object-center"
                  loading="eager"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Illustrated Cartoon Teddy peeking out in the center */}
      <div
        data-pup-stop="true"
        data-pose="peek"
        className="pup-stop tp-hero__teddy absolute left-1/2 -translate-x-1/2 z-30"
        style={{
          bottom: 'calc(var(--quilt-h, 5.5rem) - 1.2rem)',
          width: '180px',
          height: '144px'
        }}
      >
        <div className="pup-buddy relative size-full">
          <svg
            viewBox="0 0 300 240"
            style={{ overflow: 'visible' }}
            role="img"
            aria-label="Teddy, the TeddyPups puppy, peeking over the quilt"
            className="size-full drop-shadow-md"
          >
            {/* Illustrated Head, Ears, and Paws resting on quilt */}
            <g data-p="head" transform="translate(0, 4)">
              {/* Ears */}
              <path
                d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
                fill="#e4a352"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                transform="rotate(-6 174 82)"
              />
              <path
                d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
                fill="#e4a352"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
                transform="rotate(6 250 82)"
              />

              {/* Head shape */}
              <path
                d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
                fill="#f2be6b"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Snout area */}
              <path d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z" fill="#fbe3b4" />
              {/* Pink blush cheeks */}
              <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
              <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />

              {/* Happy eyes */}
              <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
              <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
              <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
              <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />

              {/* Nose & Mouth */}
              <path d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z" fill="#2a170e" />
              <path d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none" />
              {/* Tongue */}
              <path d="M207.6 127.4 Q212 136.6 216.4 127.4 Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" />
            </g>

            {/* Paws resting on the fence ledge */}
            <g data-p="ledge" opacity="1">
              <path
                d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z"
                fill="#f2be6b"
                stroke="#2a170e"
                strokeWidth="3.4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
            </g>
          </svg>
        </div>
      </div>

      {/* Quilted diamond-stitched fence with scalloped top edge */}
      <div aria-hidden="true" className="tp-quilt">
        <svg className="tp-quilt__edge" width="100%" height="40" preserveAspectRatio="none">
          <defs>
            <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#fbe3b4" />
              <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
              <path d="M11 33A27 19 0 0 1 65 33" fill="none" stroke="#2a170e" strokeWidth="1.6" strokeDasharray="3.5 5.5" strokeLinecap="round" opacity=".42" />
            </pattern>
          </defs>
          <rect width="100%" height="40" fill="url(#tp-scallop)" />
        </svg>
      </div>
    </div>
  );
}
