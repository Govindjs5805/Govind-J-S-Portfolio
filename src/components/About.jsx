import { useState, useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

import {
  Code2,
  Layers,
  Award,
  Users,
  MapPin,
  GraduationCap,
  Sparkles,
  Terminal,
  Heart,
} from 'lucide-react';


/* =========================================================
   ANIMATED COUNTER
========================================================= */

function Counter({ to, suffix = '' }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const duration = 1600;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      setVal(
        parseFloat(
          (eased * to).toFixed(Number.isInteger(to) ? 0 : 1)
        )
      );

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [to]);

  return (
    <>
      {val}
      {suffix}
    </>
  );
}


/* =========================================================
   INTERACTIVE PHOTO
========================================================= */

function PhotoCard() {
  const ref = useRef(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [9, -9]),
    {
      stiffness: 160,
      damping: 22,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-9, 9]),
    {
      stiffness: 160,
      damping: 22,
    }
  );

  const glowX = useTransform(
    mouseX,
    [0, 1],
    ['0%', '100%']
  );

  const glowY = useTransform(
    mouseY,
    [0, 1],
    ['0%', '100%']
  );

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();

    if (!rect) return;

    mouseX.set(
      (e.clientX - rect.left) / rect.width
    );

    mouseY.set(
      (e.clientY - rect.top) / rect.height
    );
  };

  const reset = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 900,
      }}
      className="
        relative
        w-72
        h-80
        mx-auto
        lg:mx-0
      "
    >
      {/* glow behind image */}

      <div
        className="
          absolute
          inset-0
          scale-105
          rounded-[2rem]
          bg-gradient-to-br
          from-mint-500/30
          to-emerald-400/5
          blur-2xl
          pointer-events-none
        "
      />

      {/* image */}

      <div
        className="
          relative
          w-full
          h-full
          rounded-[2rem]
          overflow-hidden
          border
          border-mint-500/30
          shadow-2xl
          shadow-black/20
        "
      >
        <img
          src="/image.jpg"
          alt="Govind J S"
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            hover:scale-[1.03]
          "
        />

        {/* mouse light */}

        <motion.div
          className="
            absolute
            inset-0
            pointer-events-none
          "
          style={{
            background: `
              radial-gradient(
                circle at ${glowX} ${glowY},
                rgba(255,255,255,0.18),
                transparent 55%
              )
            `,
          }}
        />

        {/* bottom gradient */}

        <div
          className="
            absolute
            bottom-0
            inset-x-0
            h-24
            bg-gradient-to-t
            from-black/90
            via-black/45
            to-transparent
          "
        />

        <div
          className="
            absolute
            bottom-4
            left-5
          "
        >
          <p className="text-white font-bold">
            Govind J S
          </p>

          <p
            className="
              text-mint-400
              text-xs
              font-mono
              mt-0.5
            "
          >
            CS Undergrad · Developer
          </p>
        </div>
      </div>
    </motion.div>
  );
}


/* =========================================================
   INTERESTS
========================================================= */

const interests = [
  {
    label: 'Software Development',
    icon: Code2,
  },
  {
    label: 'Machine Learning',
    icon: Sparkles,
  },
  {
    label: 'UI/UX Design',
    icon: Layers,
  },
  {
    label: 'Problem Solving',
    icon: Terminal,
  },
  {
    label: 'Team Leadership',
    icon: Users,
  },
  {
    label: 'Always Learning',
    icon: Heart,
  },
];


function InterestTags() {
  return (
    <div>

      <p
        className="
          text-[10px]
          font-mono
          tracking-[0.2em]
          text-gray-400
          dark:text-gray-600
          uppercase
          mb-3
        "
      >
        Interests
      </p>

      <div className="flex flex-wrap gap-2">

        {interests.map(
          ({ label, icon: Icon }, index) => (

            <motion.div
              key={label}
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                y: -3,
                scale: 1.04,
              }}
              className="
                group
                flex
                items-center
                gap-1.5
                px-3
                py-1.5
                rounded-full

                border
                border-black/5
                dark:border-white/10

                bg-black/[0.025]
                dark:bg-white/[0.035]

                text-xs
                text-gray-600
                dark:text-gray-300

                hover:border-mint-500/40
                hover:bg-mint-500/5
                hover:text-mint-600

                dark:hover:text-mint-400

                transition-colors
                cursor-default
              "
            >

              <Icon
                size={12}
                className="
                  group-hover:rotate-6
                  transition-transform
                "
              />

              {label}

            </motion.div>
          )
        )}

      </div>

    </div>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon: Icon,
  to,
  suffix = '',
  label,
  delay,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      onViewportEnter={() =>
        setVisible(true)
      }
      viewport={{
        once: true,
      }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -5,
      }}
      className="
        group
        relative
        overflow-hidden

        rounded-2xl
        p-4

        bg-black/[0.025]
        dark:bg-white/[0.035]

        border
        border-black/5
        dark:border-white/[0.07]

        hover:border-mint-500/30

        transition-colors
      "
    >

      {/* hover glow */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-br
          from-mint-500/10
          to-transparent

          opacity-0
          group-hover:opacity-100

          transition-opacity
          duration-300
        "
      />

      <div className="relative z-10">

        <Icon
          size={17}
          className="
            text-mint-500
            mb-3
            transition-transform
            duration-300
            group-hover:scale-110
          "
        />

        <p
          className="
            text-2xl
            font-black
            tracking-tight
          "
        >
          {visible ? (
            <Counter
              to={to}
              suffix={suffix}
            />
          ) : (
            `0${suffix}`
          )}
        </p>

        <p
          className="
            text-[10px]
            text-gray-500
            dark:text-gray-400
            mt-1
          "
        >
          {label}
        </p>

      </div>

    </motion.div>
  );
}


/* =========================================================
   BUILD / DESIGN / LEARN / LEAD
========================================================= */

const manifesto = [
  {
    number: '01',
    word: 'BUILD',
    description:
      'I turn ideas into useful digital products that solve real problems.',
    tags:
      'React · Firebase · Full-stack',
  },

  {
    number: '02',
    word: 'DESIGN',
    description:
      'I care about how technology feels, not only about how it works.',
    tags:
      'UI/UX · Figma · Visual Systems',
  },

  {
    number: '03',
    word: 'LEARN',
    description:
      'Curiosity keeps me experimenting with better tools, systems and ideas.',
    tags:
      'Machine Learning · DSA · CS',
  },

  {
    number: '04',
    word: 'LEAD',
    description:
      'I enjoy turning creative teams into people who build great things together.',
    tags:
      'Design Teams · Campaigns · Collaboration',
  },
];


function InteractiveManifesto() {
  const [active, setActive] =
    useState(0);

  const sectionRef =
    useRef(null);

  const mouseX =
    useMotionValue(-500);

  const mouseY =
    useMotionValue(-500);

  const smoothX =
    useSpring(mouseX, {
      stiffness: 100,
      damping: 25,
      mass: 0.5,
    });

  const smoothY =
    useSpring(mouseY, {
      stiffness: 100,
      damping: 25,
      mass: 0.5,
    });


  const handleMouseMove = (e) => {

    const rect =
      sectionRef.current?.getBoundingClientRect();

    if (!rect) return;

    mouseX.set(
      e.clientX - rect.left
    );

    mouseY.set(
      e.clientY - rect.top
    );
  };


  return (

    <motion.div
      ref={sectionRef}
      onMouseMove={
        handleMouseMove
      }

      initial={{
        opacity: 0,
        y: 35,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      viewport={{
        once: true,
        amount: 0.15,
      }}

      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}

      className="
      relative
      mt-20
      overflow-hidden

      max-w-[1500px]
      mx-auto

      border-y
      border-black/10
      dark:border-white/10
    "
    >

      {/* =========================================
          MOUSE FOLLOWING LIGHT
      ========================================= */}

      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
        }}

        className="
          absolute
          -translate-x-1/2
          -translate-y-1/2

          w-[480px]
          h-[480px]

          rounded-full
          bg-mint-500/10

          blur-[100px]

          pointer-events-none
        "
      />


      {/* =========================================
          GIANT BACKGROUND NUMBER
      ========================================= */}

      <AnimatePresence mode="wait">

        <motion.div
          key={
            manifesto[active].number
          }

          initial={{
            opacity: 0,
            scale: 0.85,
            x: 30,
          }}

          animate={{
            opacity: 0.035,
            scale: 1,
            x: 0,
          }}

          exit={{
            opacity: 0,
            scale: 1.08,
            x: -20,
          }}

          transition={{
            duration: 0.45,
          }}

          className="
            absolute
            right-0
            top-1/2
            -translate-y-1/2

            text-[13rem]
            sm:text-[18rem]
            md:text-[23rem]

            leading-none
            font-black

            text-black
            dark:text-white

            pointer-events-none
            select-none
          "
        >
          {
            manifesto[active]
              .number
          }
        </motion.div>

      </AnimatePresence>


      {/* =========================================
          ROWS
      ========================================= */}

      <div className="relative z-10">

        {manifesto.map(
          (
            item,
            index
          ) => {

            const isActive =
              active === index;

            return (

              <motion.div
                key={
                  item.word
                }

                onMouseEnter={() =>
                  setActive(index)
                }

                className="
                  relative
                  group

                  border-b
                  last:border-b-0

                  border-black/10
                  dark:border-white/[0.08]

                  cursor-default
                "
              >

                <motion.div
                  animate={{
                    paddingLeft:
                      isActive
                        ? 18
                        : 0,
                  }}

                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 28,
                  }}

                  className="
                    grid

                    md:grid-cols-[70px_1fr_1fr]

                    items-center

                    gap-3
                    md:gap-6

                    py-7
                    md:py-8
                  "
                >

                  {/* number */}

                  <span
                    className={`
                      font-mono
                      text-[10px]

                      transition-colors
                      duration-300

                      ${
                        isActive
                          ? 'text-mint-500'
                          : 'text-gray-400 dark:text-gray-600'
                      }
                    `}
                  >
                    / {item.number}
                  </span>


                  {/* MAIN WORD */}

                  <motion.h3

                    animate={{
                      x:
                        isActive
                          ? 8
                          : 0,
                    }}

                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 28,
                    }}

                    className={`
                      text-[3.4rem]
                      sm:text-6xl
                      md:text-7xl

                      leading-[0.85]

                      font-black

                      tracking-[-0.06em]

                      transition-colors
                      duration-300

                      ${
                        isActive
                          ? 'text-mint-500'
                          : `
                            text-gray-200
                            dark:text-white/[0.10]
                          `
                      }
                    `}
                  >
                    {
                      item.word
                    }
                  </motion.h3>


                  {/* DESCRIPTION */}

                  <div
                    className="
                      md:pl-6
                      min-h-[65px]

                      flex
                      items-center
                    "
                  >

                    <AnimatePresence
                      mode="wait"
                    >

                      {isActive && (

                        <motion.div
                          key={
                            item.word
                          }

                          initial={{
                            opacity: 0,
                            x: 25,
                            filter:
                              'blur(5px)',
                          }}

                          animate={{
                            opacity: 1,
                            x: 0,
                            filter:
                              'blur(0px)',
                          }}

                          exit={{
                            opacity: 0,
                            x: -12,
                            filter:
                              'blur(5px)',
                          }}

                          transition={{
                            duration: 0.4,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          }}
                        >

                          <p
                            className="
                              text-sm
                              md:text-base

                              text-gray-700
                              dark:text-gray-200

                              max-w-sm

                              leading-relaxed
                            "
                          >
                            {
                              item.description
                            }
                          </p>


                          <p
                            className="
                              mt-2

                              font-mono

                              text-[10px]
                              sm:text-xs

                              text-mint-600
                              dark:text-mint-400
                            "
                          >
                            {
                              item.tags
                            }
                          </p>

                        </motion.div>
                      )}

                    </AnimatePresence>

                  </div>

                </motion.div>


                {/* =====================================
                    MOVING GREEN UNDERLINE
                ===================================== */}

                <motion.div
                  initial={false}

                  animate={{
                    width:
                      isActive
                        ? '100%'
                        : '0%',
                  }}

                  transition={{
                    duration: 0.55,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}

                  className="
                    absolute
                    bottom-0
                    left-0

                    h-[2px]

                    bg-gradient-to-r
                    from-mint-600
                    via-mint-400
                    to-transparent

                    shadow-[0_0_12px_rgba(34,197,94,0.35)]
                  "
                />

              </motion.div>
            );
          }
        )}

      </div>


      {/* =========================================
          SMALL FOOTER
      ========================================= */}

      <div
        className="
          relative
          z-10

          flex
          justify-between
          items-center

          py-4

          font-mono
          text-[9px]
          sm:text-[10px]

          tracking-widest

          text-gray-400
          dark:text-gray-600
        "
      >

        <span>
          WHAT DRIVES MY WORK
        </span>


        <motion.span
          animate={{
            x: [
              0,
              6,
              0,
            ],
          }}

          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}

          className="
            hidden
            sm:block
          "
        >
          HOVER TO EXPLORE →
        </motion.span>

      </div>

    </motion.div>
  );
}


/* =========================================================
   MAIN ABOUT COMPONENT
========================================================= */

export default function About() {

  const [
    typedText,
    setTypedText,
  ] = useState('');


  const fullText =
    'CS undergrad @ CEC · passionate about shipping real-world software, training ML models, and leading creative teams. I build things people actually enjoy using.';


  /* typing animation */

  useEffect(() => {

    let index = 0;

    setTypedText('');

    const timer =
      setInterval(() => {

        if (
          index <
          fullText.length
        ) {

          setTypedText(
            fullText.slice(
              0,
              index + 1
            )
          );

          index++;

        } else {

          clearInterval(
            timer
          );
        }

      }, 22);


    return () =>
      clearInterval(
        timer
      );

  }, []);


  return (

    <section
      id="about"

      className="
        relative
        py-28
        px-6
        overflow-hidden
      "
    >

      {/* background glows */}

      <div
        className="
          absolute
          top-20
          left-1/4

          w-96
          h-96

          bg-mint-500/[0.06]

          rounded-full
          blur-3xl

          pointer-events-none
        "
      />


      <div
        className="
          absolute
          bottom-10
          right-1/4

          w-80
          h-80

          bg-emerald-400/[0.05]

          rounded-full
          blur-3xl

          pointer-events-none
        "
      />


      <div
        className="
          max-w-6xl
          mx-auto
        "
      >

        {/* =========================================
            SECTION LABEL
        ========================================= */}

        <motion.div

          initial={{
            opacity: 0,
            y: 16,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
          }}

          className="
            flex
            items-center
            gap-3

            mb-14
          "
        >

          <motion.span
            initial={{
              width: 0,
            }}

            whileInView={{
              width: 32,
            }}

            viewport={{
              once: true,
            }}

            transition={{
              duration: 0.6,
            }}

            className="
              h-[2px]
              bg-mint-500
            "
          />


          <p
            className="
              font-mono
              text-mint-500
              text-sm

              tracking-widest
            "
          >
            ABOUT ME
          </p>

        </motion.div>


        {/* =========================================
            MAIN CONTENT
        ========================================= */}

        <div
          className="
            grid

            lg:grid-cols-[288px_1fr]

            gap-14

            items-start
          "
        >

          {/* =====================================
              LEFT
          ===================================== */}

          <div
            className="
              flex
              flex-col
              items-center
              lg:items-start

              gap-6
            "
          >

            <PhotoCard />


            {/* location / college */}

            <div
              className="
                flex
                flex-col

                gap-2.5

                w-full
                max-w-[288px]
              "
            >

              {[
                {
                  icon:
                    MapPin,
                  text:
                    'Kollam, Kerala',
                },
                {
                  icon:
                    GraduationCap,
                  text:
                    'College of Engineering Chengannur',
                },
              ].map(
                (
                  {
                    icon:
                      Icon,
                    text,
                  },
                  index
                ) => (

                  <motion.div
                    key={
                      text
                    }

                    initial={{
                      opacity: 0,
                      x: -16,
                    }}

                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}

                    viewport={{
                      once: true,
                    }}

                    transition={{
                      delay:
                        index *
                        0.1,
                    }}

                    whileHover={{
                      x: 4,
                    }}

                    className="
                      flex
                      items-center

                      gap-2.5

                      text-xs

                      text-gray-500
                      dark:text-gray-400

                      cursor-default
                    "
                  >

                    <Icon
                      size={
                        13
                      }

                      className="
                        text-mint-500
                        flex-shrink-0
                      "
                    />

                    {text}

                  </motion.div>

                )
              )}

            </div>

          </div>


          {/* =====================================
              RIGHT
          ===================================== */}

          <div>

            {/* title */}

            <motion.h2

              initial={{
                opacity: 0,
                y: 24,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
              }}

              transition={{
                duration: 0.65,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}

              className="
                text-4xl
                sm:text-5xl

                font-extrabold

                tracking-tight
                leading-tight

                mb-5
              "
            >

              Turning ideas into{' '}

              <span
                className="
                  text-gradient
                "
              >
                real products
              </span>

            </motion.h2>


            {/* typed bio */}

            <motion.div

              initial={{
                opacity: 0,
              }}

              whileInView={{
                opacity: 1,
              }}

              viewport={{
                once: true,
              }}

              transition={{
                delay: 0.15,
              }}

              className="
                font-mono

                text-sm

                text-gray-500
                dark:text-gray-400

                leading-relaxed

                mb-8

                min-h-[48px]
              "
            >

              <span
                className="
                  text-mint-500/60
                "
              >
                {'// '}
              </span>

              {typedText}

              <span
                className="
                  border-r-2
                  border-mint-500

                  ml-0.5

                  animate-pulse
                "
              />

            </motion.div>


            {/* interests */}

            <motion.div

              initial={{
                opacity: 0,
                y: 15,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
              }}

              transition={{
                delay: 0.25,
              }}

              className="
                mb-8
              "
            >

              <InterestTags />

            </motion.div>


            {/* stats */}

            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-4
                gap-3
              "
            >

              <StatCard
                icon={
                  Award
                }
                to={9.6}
                label="CGPA"
                delay={0.05}
              />


              <StatCard
                icon={
                  Code2
                }
                to={2}
                suffix="+"
                label="Major Projects"
                delay={0.1}
              />


              <StatCard
                icon={
                  Layers
                }
                to={70}
                suffix="+"
                label="Design Assets Led"
                delay={0.15}
              />


              <StatCard
                icon={
                  Users
                }
                to={40}
                suffix="+"
                label="Campaigns Directed"
                delay={0.2}
              />

            </div>

          </div>

        </div>


        {/* =========================================
            INTERACTIVE BOTTOM
        ========================================= */}

        <div className="relative left-1/2 w-screen -translate-x-1/2 px-6 lg:px-10 xl:px-16">
  <InteractiveManifesto />
</div>


      </div>

    </section>
  );
}