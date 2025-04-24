import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

interface ParticleNetworkProps {
  className?: string;
  particleColor?: string;
  lineColor?: string;
  particleCount?: number;
  speed?: number;
  opacity?: number;
  lineOpacity?: number;
}

export function ParticleNetwork({
  className = "",
  particleColor = "#4856F6",
  lineColor = "#4856F6",
  particleCount = 80,
  speed = 1,
  opacity = 0.5,
  lineOpacity = 0.2
}: ParticleNetworkProps) {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Delay loading particles slightly to ensure rendering happens properly
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-0 ${className}`} style={{ pointerEvents: "none" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: false,
            zIndex: 0
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: particleCount,
              density: {
                enable: true,
                value_area: 1000
              }
            },
            color: {
              value: particleColor
            },
            shape: {
              type: "circle"
            },
            opacity: {
              value: opacity,
              random: true,
              animation: {
                enable: true,
                speed: 0.2,
                minimumValue: opacity * 0.3,
                sync: false
              }
            },
            size: {
              value: 2,
              random: true,
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.5,
                sync: false
              }
            },
            move: {
              enable: true,
              speed: speed,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "bounce"
              },
              bounce: true,
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "grab"
              },
              onClick: {
                enable: true,
                mode: "repulse"
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 200,
                links: {
                  opacity: lineOpacity * 3,
                  color: lineColor
                }
              },
              repulse: {
                distance: 200,
                duration: 0.4
              }
            }
          },
          detectRetina: true,
          background: {
            color: "transparent",
            image: "",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover"
          },
          links: {
            enable: true,
            distance: 150,
            color: lineColor,
            opacity: lineOpacity,
            width: 1,
            triangles: {
              enable: false,
              color: lineColor,
              opacity: lineOpacity * 0.1
            }
          }
        }}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
    </div>
  );
}