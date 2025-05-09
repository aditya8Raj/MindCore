"use client";

import React, { useEffect, useState, useRef } from "react";

interface LoaderProps {
  onLoadingComplete: () => void;
}

export const Loader = ({ onLoadingComplete }: LoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Loader visible for 5 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      const fadeOutTimer = setTimeout(() => {
        onLoadingComplete();
      }, 500); // This duration should match your CSS transition duration
      return () => clearTimeout(fadeOutTimer);
    }
  }, [isVisible, onLoadingComplete]);

  return (
    <div
      className={`grid h-screen w-full place-content-center bg-neutral-950 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {isVisible && <PathFinder />}
    </div>
  );
};

export const PathFinder = () => {
  const [loaded, setLoaded] = useState(false);
  const isMountedRef = useRef(true); // Ref to track mounted state

  // Effect for setting initial loaded state and cleanup for isMountedRef
  useEffect(() => {
    setLoaded(true);
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      // Cleanup game boxes on unmount
      document.querySelectorAll(".game-box").forEach((el) => {
        if (el) {
          (el as HTMLElement).style.background = "transparent";
          (el as HTMLElement).dataset.visited = "false";
        }
      });
    };
  }, []); // Runs once on mount and cleans up on unmount

  // Effect to run the game loop when loaded and component is mounted
  useEffect(() => {
    if (loaded) {
      const gameAnimationLoop = async () => {
        while (isMountedRef.current) {
          await playGameIteration();
          if (!isMountedRef.current) {
            // Check again after async operation
            break;
          }
        }
      };
      gameAnimationLoop();
    }
  }, [loaded]); // Depends on `loaded` to start the loop

  // One iteration of the game animation (original playGame logic without recursion)
  const playGameIteration = async () => {
    if (!isMountedRef.current) return;

    const startTop = Math.floor(Math.random() * ROWS);
    const startLeft = Math.floor(Math.random() * COLS);
    const endTop = Math.floor(Math.random() * ROWS);
    const endLeft = Math.floor(Math.random() * COLS);

    const startEl = document.getElementById(`${startTop}-${startLeft}`);
    const endEl = document.getElementById(`${endTop}-${endLeft}`);

    if (!startEl || !endEl) return;
    if (!isMountedRef.current) return;

    startEl.style.background = START_COLOR;
    startEl.dataset.visited = "true";
    endEl.style.background = START_COLOR;

    const answer = await bfs({ startTop, startLeft, endTop, endLeft });
    if (!isMountedRef.current) return;

    await paintPath(answer);
    if (!isMountedRef.current) return;

    await reset();
  };

  // Restored original paintPath logic
  const paintPath = async (answer: Coordinate[]) => {
    for (let i = 1; i < answer.length; i++) {
      if (!isMountedRef.current) return;
      const { top, left } = answer[i];
      const el = document.getElementById(`${top}-${left}`);
      if (!el) continue;

      if (i === answer.length - 1) {
        el.style.background = GOAL_COLOR;
      } else {
        el.style.background = FOUND_PATH_COLOR;
      }
      await sleep(25);
    }
  };

  // Restored original reset logic
  const reset = async () => {
    if (!isMountedRef.current) return;
    await sleep(1500);
    if (!isMountedRef.current) return;
    document.querySelectorAll(".game-box").forEach((el) => {
      (el as HTMLElement).style.background = "transparent";
      (el as HTMLElement).dataset.visited = "false";
    });
    await sleep(1000);
  };

  // Restored original bfs (DFS-like) logic
  const bfs = async ({
    startTop,
    startLeft,
    endTop,
    endLeft,
  }: {
    startTop: number;
    startLeft: number;
    endTop: number;
    endLeft: number;
  }): Promise<Coordinate[]> => {
    let possiblePaths: Coordinate[][] = [[{ top: startTop, left: startLeft }]];
    let answer: Coordinate[] = [];

    while (possiblePaths.length) {
      if (!isMountedRef.current) return [];
      const curPath = possiblePaths.pop();
      if (!curPath) continue;

      const curStep = curPath[curPath.length - 1];
      if (!curStep) continue;

      await sleep(5);
      if (!isMountedRef.current) return [];

      const curStepEl = document.getElementById(
        `${curStep.top}-${curStep.left}`
      );
      if (!curStepEl) continue;

      const newPathsRaw = getPossibleNextSteps(curStep);
      const newPaths = newPathsRaw.map((s) => [...curPath, s]);

      for (const p of newPaths) {
        if (!isMountedRef.current) return [];
        const target = p[p.length - 1];
        const el = document.getElementById(`${target.top}-${target.left}`);
        if (!el) continue;

        el.dataset.visited = "true";

        if (target.top === endTop && target.left === endLeft) {
          answer = p;
          break;
        } else {
          // Avoid coloring start/end nodes during flood
          if (
            !(
              (target.top === startTop && target.left === startLeft) ||
              (target.top === endTop && target.left === endLeft)
            )
          ) {
            el.style.background = FLOOD_COLOR;
          }
        }
      }

      if (answer.length) {
        break;
      }
      possiblePaths = [...newPaths, ...possiblePaths];
    }
    return answer;
  };

  // Restored original getPossibleNextSteps logic
  const getPossibleNextSteps = ({ top, left }: Coordinate): Coordinate[] => {
    const canGoLeft = left > 0;
    const canGoRight = left < COLS - 1;
    const canGoUp = top > 0;
    const canGoDown = top < ROWS - 1;
    const newSteps: Coordinate[] = [];

    if (canGoUp && canGoLeft) newSteps.push({ top: top - 1, left: left - 1 });
    if (canGoUp) newSteps.push({ top: top - 1, left });
    if (canGoUp && canGoRight) newSteps.push({ top: top - 1, left: left + 1 });
    if (canGoLeft) newSteps.push({ top, left: left - 1 });
    if (canGoRight) newSteps.push({ top, left: left + 1 });
    if (canGoDown && canGoLeft) newSteps.push({ top: top + 1, left: left - 1 });
    if (canGoDown) newSteps.push({ top: top + 1, left });
    if (canGoDown && canGoRight)
      newSteps.push({ top: top + 1, left: left + 1 });

    return newSteps.filter((s) => {
      const el = document.getElementById(`${s.top}-${s.left}`);
      return el?.dataset.visited === "false";
    });
  };

  // Restored original generateBoxes logic with transition classes
  const generateBoxes = () => {
    const els = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        els.push(
          <div
            data-visited="false"
            id={`${r}-${c}`}
            className="game-box col-span-1 aspect-square w-full border-b border-r border-neutral-800 transition-colors duration-1000"
            key={`${r}-${c}`}
          />
        );
      }
    }
    return <>{els}</>;
  };

  if (!loaded) {
    return null;
  }

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
      }}
      className="grid w-[75vmin] border-l border-t border-neutral-800 bg-neutral-950 shadow-2xl shadow-neutral-900"
    >
      {generateBoxes()}
    </div>
  );
};

const START_COLOR = "#8b5cf6";
const GOAL_COLOR = "#10b981";
const FLOOD_COLOR = "#404040";
const FOUND_PATH_COLOR = "#FFFFFF";

const ROWS = 16;
const COLS = 16;

type Coordinate = {
  top: number;
  left: number;
};

const sleep = async (ms: number) => new Promise((r) => setTimeout(r, ms));
