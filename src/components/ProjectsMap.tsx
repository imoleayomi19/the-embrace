import { motion, useReducedMotion } from "framer-motion";

// The map artwork. Save the image in your /public folder with this name
// (other assets on the site use the same "./" style paths).
const MAP_IMAGE_SRC = "./map-project.png";
const MAP_IMAGE_SIZE = { width: 919, height: 541 };

// Animation timing (seconds). Higher = slower.
const ORBIT_DURATION = 10; // light travelling around the frame
const FLOAT_DURATION = 6; // gentle up-and-down drift

// Gold comet: a short bright tail that fades out behind its head.
const COMET =
  "conic-gradient(from 0deg, rgba(255,199,89,0) 0deg, rgba(255,199,89,0) 235deg, rgba(255,199,89,0.25) 275deg, rgba(255,199,89,0.95) 352deg, rgba(255,199,89,0) 360deg)";

export function ProjectsMap() {
  const reduceMotion = useReducedMotion();

  return (
    <figure className="w-full">
      {/* The title is part of the image, so a text equivalent is kept for screen readers */}
      <figcaption className="sr-only">
        Project locations across Nigeria. Lagos, Ogun, Osun and Oyo are shown in blue for residential and commercial
        projects. All other states and the FCT are orange for mini-grid and commercial and industrial projects.
      </figcaption>

      {/* Padding leaves room for the glow and the float movement */}
      <div className="mx-auto w-full max-w-[680px] px-1 py-5">
        <div className="relative">
          {/* Breathing glow behind the map */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 rounded-3xl bg-secondary/25 blur-3xl"
            animate={reduceMotion ? undefined : { opacity: [0.35, 0.75, 0.35], scale: [0.96, 1.05, 0.96] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Frame and map float together so the light never drifts from the edge */}
          <motion.div
            className="relative"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: FLOAT_DURATION, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Orbit frame: a faint ring with a gold comet running around its edge */}
            <div className="relative overflow-hidden rounded-3xl bg-primary/10 p-[3px] shadow-xl ring-1 ring-slate-200">
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[170%]"
                style={{ background: COMET, x: "-50%", y: "-50%" }}
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative overflow-hidden rounded-[21px] bg-white">
                <img
                  src={MAP_IMAGE_SRC}
                  alt="Map of Nigeria showing project locations by state: Lagos, Ogun, Osun and Oyo in blue (residential and commercial), all other states and the FCT in orange (mini-grid and commercial and industrial)."
                  width={MAP_IMAGE_SIZE.width}
                  height={MAP_IMAGE_SIZE.height}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </figure>
  );
}
