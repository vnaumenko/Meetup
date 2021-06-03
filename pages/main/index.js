/* eslint-disable no-magic-numbers */
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDrag, useMove } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';
import Men1 from '../../public/men1.svg';
import Men2 from '../../public/men2.svg';
import Men3 from '../../public/men3.svg';
import PeopleBg from '../../public/people_bg.svg';
import { useRouter } from 'next/router';

const AnimatedMen1 = animated(Men1);
const AnimatedMen2 = animated(Men2);
const AnimatedMen3 = animated(Men3);

function Main() {
  const router = useRouter();

  const calc = (x, y) => [x - window.innerWidth / 50, y - window.innerHeight / 50];
  const trans1 = (x, y) => `translate3d(${x / 50}px,${y / 50}px,0)`;
  const trans2 = (x, y) => `translate3d(${x / 15 + 35}px,${y / 15 - 230}px,0)`;
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  const bind = useMove(({ xy }) => {
    const [x, y] = xy;
    set({ xy: calc(x, y) });
  });

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bindDrag = useDrag(({ down, movement: [mx, my] }) => {
    api.start({ x: down ? mx : 0, y: down ? my : 0 });
  });

  useEffect(() => {
    router.push('/promo');
  }, []);

  return (
    <div id="main" {...bind()}>
      {/*<div className="container">*/}
      {/*  <section className="main">*/}
      {/*    <div className="lead">*/}
      {/*      <img src="lifeit_logo.png" className="logo" alt="LIFE IT" />*/}
      {/*      <h1>*/}
      {/*        LIFEIT Meetups*/}
      {/*        <br />*/}
      {/*        <span>#1 летний</span>*/}
      {/*      </h1>*/}
      {/*      <p>*/}
      {/*        Две недели концентрированного*/}
      {/*        <br />*/}
      {/*        знания, идей и общения с коллегами*/}
      {/*      </p>*/}
      {/*      <div className="actions">*/}
      {/*        <Link href="/schedule">*/}
      {/*          <button className="btn btn-lg btn-primary">Расписание</button>*/}
      {/*        </Link>*/}
      {/*        <Link href="/faq">*/}
      {/*          <button className="btn btn-lg btn-link">FAQ</button>*/}
      {/*        </Link>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="illustration">*/}
      {/*      <AnimatedMen1 className="men1" style={{ transform: props.xy.interpolate(trans1) }} />*/}
      {/*      <p className="hiddenText">Hello</p>*/}
      {/*      <AnimatedMen2 className="men2" {...bindDrag()} style={{ x, y }} />*/}
      {/*      <AnimatedMen3 className="men3" style={{ transform: props.xy.interpolate(trans2) }} />*/}
      {/*      <PeopleBg className="bg" />*/}
      {/*    </div>*/}
      {/*  </section>*/}
      {/*  <section className="counters">*/}
      {/*    <div className="row">*/}
      {/*      <div className="col-12 col-lg-5 col-xl-4">*/}
      {/*        <p className="count">20 докладов</p>*/}
      {/*      </div>*/}
      {/*      <div className="col-12 col-lg-4 col-xl-4">*/}
      {/*        <p className="count">16 спикеров</p>*/}
      {/*      </div>*/}
      {/*      <div className="col-12 col-lg-3 col-xl-4">*/}
      {/*        <p className="count">5 дней</p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </section>*/}
      {/*</div>*/}
      {/*<footer>*/}
      {/*  <div className="container">*/}
      {/*    <div className="row align-items-center">*/}
      {/*      <div className="col-12 col-lg-8">*/}
      {/*        <h2>Серии митапов в Lifeit</h2>*/}
      {/*        <p>*/}
      {/*          Товарищи! постоянный количественный рост и сфера нашей активности позволяет*/}
      {/*          выполнять важные задания по разработке дальнейших направлений развития. Повседневная*/}
      {/*          практика показывает, что сложившаяся структура организации позволяет оценить*/}
      {/*          значение позиций, занимаемых участниками в отношении поставленных задач. Идейные*/}
      {/*          соображения высшего порядка, а также постоянный количественный рост и сфера нашей*/}
      {/*          активности в значительной степени обуславливает создание новых предложений.*/}
      {/*          Повседневная практика показывает, что сложившаяся структура организации играет*/}
      {/*          важную роль в формировании систем массового участия.*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*      <div className="col-12 col-lg-4">*/}
      {/*        <p className="sign">*/}
      {/*          сделано <br />*/}
      {/*          коллегами <br />*/}
      {/*          для <br />*/}
      {/*          коллег*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</footer>*/}
    </div>
  );
}

export default Main;
