import React from 'react';
import styled from 'styled-components';

 export const ButtonHome = () => {
  return (
    <StyledWrapper>
      <div>
        <div className="wireframe-bg">
          <div className="wireframe-line" />
          <div className="wireframe-line" />
          <div className="wireframe-line" />
          <div className="wireframe-line" />
          <div className="wireframe-line" />
        </div>
        <div className="button-container">
          <button data-text="Decrypt" className="hacker-button">
            My Day in Short
            <div className="cyber-edges" />
            <div className="data-pulses">
              <div className="data-pulse" />
              <div className="data-pulse" />
              <div className="data-pulse" />
              <div className="data-pulse" />
            </div>
            <div className="terminal-scan">
              <div className="scan-line" />
              <div className="scan-line" />
            </div>
            <div className="encryption-bits">
              <span className="encryption-bit">1</span>
              <span className="encryption-bit">0</span>
              <span className="encryption-bit">1</span>
              <span className="encryption-bit">0</span>
              <span className="encryption-bit">X</span>
            </div>
            <div className="noise-overlay" />
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .wireframe-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  }

  .wireframe-line {
    position: absolute;
    background: linear-gradient(to right, transparent, #4b0082, transparent);
    height: 1px;
    width: 100%;
    animation: wireframe-shift 4s infinite ease-in-out;
  }

  .wireframe-line:nth-child(1) {
    top: 10%;
  }
  .wireframe-line:nth-child(2) {
    top: 30%;
    animation-delay: -1s;
  }
  .wireframe-line:nth-child(3) {
    top: 50%;
    animation-delay: -2s;
  }
  .wireframe-line:nth-child(4) {
    top: 70%;
    animation-delay: -3s;
  }
  .wireframe-line:nth-child(5) {
    top: 90%;
    animation-delay: -0.5s;
  }

  /* Button container */
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    position: relative;
    z-index: 1;
  }

  /* Main button styles */
  .hacker-button {
    position: relative;
    width: 260px;
    height: 75px;
    font-size: 1.7em;
    font-family: "Courier New", monospace;
    color: #d8bfd8; /* Thistle for clarity */
    background: #04001b00; /* Dark indigo */
    border: 2px solid #d8bfd8;
    cursor: pointer;
    overflow: hidden;
    text-transform: uppercase;
    letter-spacing: 6px;
    transition:
      transform 0.2s ease,
      box-shadow 0.3s ease,
      background 0.3s ease,
      color 0.3s ease;
    z-index: 2;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: polygon(0 20%, 100% 0, 100% 80%, 0 100%);
    text-shadow:
      0 0 6px #6a0dad,
      0 0 12px #4b0082;
  }

  /* Cyber edges */
  .cyber-edges {
    position: absolute;
    top: -4px;
    left: -4px;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    background: transparent;
    border-top: 2px solid #6a0dad;
    border-bottom: 2px solid #6a0dad;
    clip-path: polygon(0 20%, 100% 0, 100% 80%, 0 100%);
    animation: edge-flicker 2s infinite;
    z-index: -1;
  }

  /* Data pulses */
  .data-pulses {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .data-pulse {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #8a2be2;
    border-radius: 50%;
    opacity: 0;
    animation: pulse-travel 1.8s infinite;
  }

  .data-pulse:nth-child(1) {
    left: 10%;
    top: 50%;
  }
  .data-pulse:nth-child(2) {
    right: 10%;
    top: 50%;
    animation-delay: -0.6s;
  }
  .data-pulse:nth-child(3) {
    left: 30%;
    top: 20%;
    animation-delay: -1.2s;
  }
  .data-pulse:nth-child(4) {
    right: 30%;
    bottom: 20%;
    animation-delay: -1.8s;
  }

  /* Terminal scan */
  .terminal-scan {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .scan-line {
    position: absolute;
    width: 2px;
    height: 100%;
    background: #6a0dad;
    opacity: 0.5;
    animation: scan-sweep 2.5s infinite;
  }

  .scan-line:nth-child(1) {
    left: 0;
  }
  .scan-line:nth-child(2) {
    right: 0;
    animation-delay: -1.25s;
    animation-direction: reverse;
  }

  /* Encryption bits */
  .encryption-bits {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .encryption-bit {
    position: absolute;
    font-size: 0.7em;
    color: #d8bfd8;
    opacity: 0;
    animation: bit-flip 1.5s infinite;
    text-shadow: 0 0 4px #6a0dad;
  }

  .encryption-bit:nth-child(1) {
    top: 15%;
    left: 15%;
    content: "1";
  }
  .encryption-bit:nth-child(2) {
    top: 25%;
    right: 20%;
    content: "0";
    animation-delay: -0.3s;
  }
  .encryption-bit:nth-child(3) {
    bottom: 15%;
    left: 25%;
    content: "1";
    animation-delay: -0.6s;
  }
  .encryption-bit:nth-child(4) {
    bottom: 25%;
    right: 15%;
    content: "0";
    animation-delay: -0.9s;
  }
  .encryption-bit:nth-child(5) {
    top: 50%;
    left: 50%;
    content: "X";
    animation-delay: -1.2s;
  }

  /* Noise overlay */
  .noise-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(106, 13, 173, 0.1),
      transparent,
      rgba(106, 13, 173, 0.1)
    );
    animation: noise-shift 1s infinite;
    z-index: 1;
    opacity: 0;
  }

  /* Hover effects */
  .hacker-button:hover {
    transform: scale(1.1) translateY(-5px);
    box-shadow:
      0 0 70px #6a0dad,
      0 0 140px rgba(106, 13, 173, 0.6),
      inset 0 0 35px rgba(106, 13, 173, 0.3);
    background: #2f2a5a;
    color: #ffffff;
    text-shadow:
      0 0 10px #8a2be2,
      0 0 20px #6a0dad;
  }

  .hacker-button:hover .cyber-edges {
    animation: edge-flicker 0.5s infinite;
    border-color: #8a2be2;
  }

  .hacker-button:hover .data-pulse {
    opacity: 0.7;
    animation: pulse-travel 0.8s infinite;
  }

  .hacker-button:hover .scan-line {
    animation: scan-sweep 1s infinite;
    opacity: 0.8;
  }

  .hacker-button:hover .encryption-bit {
    opacity: 0.9;
    animation: bit-flip 0.7s infinite;
  }

  .hacker-button:hover .noise-overlay {
    opacity: 0.4;
    animation: noise-shift 0.3s infinite;
  }

  /* Click effects */
  .hacker-button:active {
    transform: scale(0.95) translateY(2px);
    box-shadow: 0 0 30px #6a0dad;
    background: #3f3a7a;
    color: #d8bfd8;
    text-shadow: 0 0 15px #8a2be2;
  }

  .hacker-button:active .cyber-edges {
    border-color: #8a2be2;
  }

  /* Animations */
  @keyframes wireframe-shift {
    0% {
      transform: translateX(-100%) skew(20deg);
      opacity: 0;
    }
    50% {
      transform: translateX(0) skew(0deg);
      opacity: 0.5;
    }
    100% {
      transform: translateX(100%) skew(-20deg);
      opacity: 0;
    }
  }

  @keyframes edge-flicker {
    0%,
    100% {
      opacity: 1;
      box-shadow: 0 0 10px rgba(106, 13, 173, 0.4);
    }
    25% {
      opacity: 0.6;
      box-shadow: 0 0 5px rgba(106, 13, 173, 0.2);
    }
    50% {
      opacity: 0.9;
      box-shadow: 0 0 15px rgba(106, 13, 173, 0.6);
    }
    75% {
      opacity: 0.7;
      box-shadow: 0 0 8px rgba(106, 13, 173, 0.3);
    }
  }

  @keyframes pulse-travel {
    0% {
      transform: scale(0) translateX(-50px);
      opacity: 0;
    }
    50% {
      transform: scale(1) translateX(0);
      opacity: 0.7;
    }
    100% {
      transform: scale(0) translateX(50px);
      opacity: 0;
    }
  }

  @keyframes scan-sweep {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes bit-flip {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.2) rotate(180deg);
      opacity: 0.9;
    }
    100% {
      transform: scale(0) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes noise-shift {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }`;


