import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ── Nigeria dot-matrix grid ───────────────────────────────────────────────────
// Each row: [colStart, colEnd] (inclusive) of filled dots at that row index.
// This approximates the silhouette of Nigeria on a dot grid.
const NIGERIA_ROWS: [number, number][] = [
  [10, 19], // row 0
  [8, 21],  // row 1
  [7, 23],  // row 2
  [6, 25],  // row 3
  [5, 26],  // row 4
  [4, 27],  // row 5
  [4, 28],  // row 6
  [3, 28],  // row 7
  [3, 29],  // row 8
  [3, 29],  // row 9
  [4, 29],  // row 10
  [5, 29],  // row 11
  [5, 28],  // row 12
  [6, 27],  // row 13
  [7, 26],  // row 14
  [8, 25],  // row 15
  [9, 24],  // row 16
  [10, 23], // row 17
  [11, 22], // row 18
  [12, 21], // row 19
  [13, 20], // row 20
  [14, 19], // row 21
  [14, 18], // row 22
  [15, 17], // row 23
];

const COLS = 34;
const ROWS = NIGERIA_ROWS.length;

// ── Project locations ─────────────────────────────────────────────────────────
type ProjectType = "residential" | "commercial" | "mini-grid";

type Project = {
  id: number;
  name: string;
  label: string;
  col: number; // grid column (0-indexed)
  row: number; // grid row (0-indexed)
  type: ProjectType;
  capacity: string;
};

const projects: Project[] = [
  { id: 1, name: "Lagos", label: "Lagos", col: 7, row: 14, type: "residential", capacity: "5kVA" },
  { id: 2, name: "Abuja", label: "Abuja", col: 17, row: 6, type: "commercial", capacity: "30kW" },
  { id: 3, name: "Port Harcourt", label: "Port Harcourt", col: 22, row: 19, type: "mini-grid", capacity: "100kW" },
  { id: 4, name: "Ibadan", label: "Ibadan", col: 9, row: 13, type: "residential", capacity: "10kVA" },
  { id: 5, name: "Kano", label: "Kano", col: 17, row: 2, type: "mini-grid", capacity: "200kW" },
  { id: 6, name: "Enugu", label: "Enugu", col: 20, row: 15, type: "commercial", capacity: "50kW" },
];

const colorMap: Record<ProjectType, string> = {
  residential: "#f59e0b",
  commercial: "#10b981",
  "mini-grid": "#6366f1",
};

// ── Component ─────────────────────────────────────────────────────────────────
export function ProjectsMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the dot-matrix Nigeria silhouette on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const dotR = 3.2;
    const gapX = W / (COLS + 2);
    const gapY = H / (ROWS + 2);
    const offX = gapX;
    const offY = gapY;

    // Project ids mapped to their grid position for skipping (we draw pins on top)
    const pinCells = new Set(projects.map((p) => `${p.row},${p.col}`));

    for (let r = 0; r < ROWS; r++) {
      const [cs, ce] = NIGERIA_ROWS[r];
      for (let c = cs; c <= ce; c++) {
        const cx = offX + c * gapX;
        const cy = offY + r * gapY;

        const key = `${r},${c}`;
        if (pinCells.has(key)) continue; // leave space for pin

        // Subtle depth: dots closer to center are slightly brighter
        const normX = (c - COLS / 2) / (COLS / 2);
        const normY = (r - ROWS / 2) / (ROWS / 2);
        const dist = Math.sqrt(normX * normX + normY * normY);
        const alpha = Math.max(0.12, 0.55 - dist * 0.25);

        ctx.beginPath();
        ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251,191,36,${alpha})`;
        ctx.fill();
      }
    }
  }, []);

  // Compute pixel position from grid col/row for overlay pins
  function pinPos(col: number, row: number, canvasW: number, canvasH: number) {
    const gapX = canvasW / (COLS + 2);
    const gapY = canvasH / (ROWS + 2);
    return {
      x: ((gapX + col * gapX) / canvasW) * 100,
      y: ((gapY + row * gapY) / canvasH) * 100,
    };
  }

  return (
    <div
      className="relative w-full flex items-center justify-center select-none"
      style={{ aspectRatio: "1 / 1", maxWidth: 560 }}
    >
      {/* ── Outer glow ring ───────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)",
          boxShadow: "0 0 80px 20px rgba(251,191,36,0.06)",
        }}
      />

      {/* ── Dashed orbit circles ──────────────────────────────────────────── */}
      {[98, 84].map((pct, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-dashed border-yellow-400/20"
          style={{ inset: `${(100 - pct) / 2}%` }}
        />
      ))}

      {/* ── Dark circular globe frame ─────────────────────────────────────── */}
      <div
        className="relative rounded-full overflow-hidden"
        style={{
          width: "84%",
          aspectRatio: "1/1",
          background:
            "radial-gradient(ellipse at 38% 38%, #1e2a45 0%, #0d1525 60%, #07101e 100%)",
          boxShadow:
            "0 0 0 1.5px rgba(251,191,36,0.18), inset 0 0 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* Dot-matrix canvas */}
        <canvas
          ref={canvasRef}
          width={560}
          height={480}
          className="absolute inset-0 w-full h-full"
          style={{ padding: "8%" }}
        />

        {/* ── Project pins ──────────────────────────────────────────────────── */}
        {projects.map((project, i) => {
          const { x, y } = pinPos(project.col, project.row, 560, 480);
          const color = colorMap[project.type];

          // Decide label side (left of center → label right, right → label left)
          const labelLeft = project.col > COLS / 2;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.45, ease: "backOut" }}
              className="absolute group"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}
            >
              {/* Pulse ring */}
              <motion.span
                animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
                className="absolute rounded-full"
                style={{
                  width: 10, height: 10,
                  top: -1, left: -1,
                  backgroundColor: color,
                }}
              />

              {/* Dot */}
              <div
                className="relative w-2 h-2 rounded-full border-2 border-white shadow-lg cursor-pointer"
                style={{ backgroundColor: color, boxShadow: `0 0 6px 2px ${color}55` }}
              />

              {/* Label pill */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5 whitespace-nowrap ${labelLeft ? "right-[calc(100%+8px)]" : "left-[calc(100%+8px)]"
                  }`}
              >
                <div
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold font-montserrat tracking-wide shadow-md"
                  style={{
                    backgroundColor: "rgba(7,16,30,0.88)",
                    border: `1px solid ${color}55`,
                    color: "#e2e8f0",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <span style={{ color }} className="mr-1">•</span>
                  {project.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Legend ────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-2 left-2 flex flex-col gap-1.5 bg-slate-900/80 border border-slate-700/60 rounded-xl px-3 py-2 backdrop-blur-sm">
        {(["residential", "commercial", "mini-grid"] as const).map((type) => (
          <div key={type} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colorMap[type] }} />
            <span className="text-slate-300 capitalize text-[10px] font-medium font-montserrat">{type}</span>
          </div>
        ))}
      </div>

      {/* ── Counter badge ─────────────────────────────────────────────────── */}
      <div className="absolute top-2 right-2 bg-slate-900/80 border border-slate-700/60 rounded-xl px-3 py-2 backdrop-blur-sm text-right">
        <p className="text-2xl font-bold text-white">{projects.length}+</p>
        <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider font-montserrat">Projects</p>
      </div>
    </div>
  );
}
