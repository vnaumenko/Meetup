import React, { useEffect, useLayoutEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { useState } from 'react';

import PromoFront from '../../public/promo-front.svg';
import PromoBackCircle1 from '../../public/promo-back_circle1.svg';
import PromoBackCircle2 from '../../public/promo-back_circle2.svg';
import PromoBackCircle3 from '../../public/promo-back_circle3.svg';
import PromoBackCircleHole from '../../public/promo-back_circleHole.svg';
import PromoBackLabel from '../../public/promo-back_label.svg';
import { useMove } from 'react-use-gesture';

const AnimatedCircle2 = animated(PromoBackCircle2);
const AnimatedCircle3 = animated(PromoBackCircle3);
const AnimatedLabel = animated(PromoBackLabel);

function Promo() {
  const calc = (x, y) => [x - window.innerWidth / 50, y - window.innerHeight / 50];
  const trans1 = (x, y) => `translate3d(${x / 50}px,${y / 50}px,0)`;
  const trans2 = (x, y) => `translate3d(${x / 10 + 3}px,${y / 15 - 2}px,0)`;
  const [props, setParallax] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  const bindParallax = useMove(({ xy }) => {
    const [x, y] = xy;
    setParallax({ xy: calc(x, y) });
  });

  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(300px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const [isLabelActive, setLabelActiveState] = useState(false);
  const { labelOpacity } = useSpring({
    labelOpacity: isLabelActive ? 1 : 0,
    config: { mass: 50, tension: 500, friction: 80 },
  });

  const [isTextActive, setTextActiveState] = useState(false);
  const { textOpacity } = useSpring({
    textOpacity: isTextActive ? 1 : 0,
    config: { mass: 50, tension: 500, friction: 80 },
  });

  const [labelRotationProps, setLabelRotation] = useSpring(() => ({
    labelRotation: 180,
    config: { mass: 50, tension: 300, friction: 170 },
  }));

  useEffect(() => {
    setTimeout(() => {
      set((state) => !state);
      setTimeout(() => {
        setLabelActiveState(true);
        setTextActiveState(true);
        setInterval(() => {
          setLabelRotation.start({
            labelRotation: labelRotationProps.labelRotation.get() === 0 ? 180 : 0,
          });
        }, 3500);
      }, 1000);
    }, 1000);
  }, []);

  const transLabel = (value) => `rotate(${value}deg)`;

  return (
    <div id={'main'} {...bindParallax()}>
      <div className="container">
        <div className="svgContainer">
          <animated.div
            className="rotatingElement"
            style={{ opacity: opacity.to((o) => 1 - o), transform }}
          >
            <PromoFront />
          </animated.div>
          <animated.div
            className={`rotatingElement rotatingElement-back`}
            style={{
              opacity,
              transform,
              rotateX: '180deg',
            }}
          >
            <div className="circles">
              <PromoBackCircle1 className={'circle1'} />
              <AnimatedCircle2
                className={'circle2'}
                style={{ transform: props.xy.interpolate(trans1) }}
              />
              <AnimatedCircle3
                className={'circle3'}
                style={{ transform: props.xy.interpolate(trans2) }}
              />
              <PromoBackCircleHole className={'circleHole'} />
            </div>
            <AnimatedLabel
              className="label"
              style={{
                opacity: labelOpacity,
                transform: labelRotationProps.labelRotation.to(transLabel),
              }}
            />
          </animated.div>
        </div>
        <animated.div className="text" style={{ opacity: textOpacity }}>
          <p>
            Успей стать <strong>лучше</strong>.
          </p>
          <p>Движение начнётся уже в пятницу</p>
        </animated.div>
      </div>
    </div>
  );
}

export default Promo;