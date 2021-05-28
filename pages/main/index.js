import Link from 'next/link'
import Men1 from '../../public/men1.svg';
import Men2 from '../../public/men2.svg';
import Men3 from '../../public/men3.svg';
import PeopleBg from '../../public/people_bg.svg';


function Main() {
    return (
        <div id={'main'}>
            <div className="container">
                <section className="main">
                    <div className="lead">
                        <img src="lifeit_logo.png" className="logo" alt={'LIFE IT'}/>
                        <h1>
                            LIFEIT Meetups
                            <br/>
                            <span>#1 летний</span>
                        </h1>
                        <p>
                            Две недели концентрированного
                            <br/>
                            знания, идей и общения с коллегами
                        </p>
                        <div className="actions">
                            <Link href="/schedule">
                                <button className="btn btn-lg btn-primary">Расписание</button>
                            </Link>
                            <Link href="/faq">
                                <button className="btn btn-lg btn-link">FAQ</button>
                            </Link>
                        </div>
                    </div>
                    <div className="illustration">
                        <Men1 className={'men1'} />
                        <Men2 className={'men2'} />
                        <Men3 className={'men3'} />
                        <PeopleBg className={'bg'} />
                    </div>
                </section>
                <section className="counters">
                    <div className="row">
                        <div className="col-12 col-lg-5 col-xl-4">
                            <p className="count">20 докладов</p>
                        </div>
                        <div className="col-12 col-lg-4 col-xl-4">
                            <p className="count">16 спикеров</p>
                        </div>
                        <div className="col-12 col-lg-3 col-xl-4">
                            <p className="count">5 дней</p>
                        </div>
                    </div>
                </section>
            </div>
            <footer>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-8">
                            <h2>Серии митапов в Lifeit</h2>
                            <p>
                                Товарищи! постоянный количественный рост и сфера нашей активности позволяет выполнять
                                важные задания по разработке дальнейших направлений развития.
                                Повседневная практика показывает, что сложившаяся структура организации позволяет
                                оценить значение позиций, занимаемых участниками в отношении поставленных задач.
                                Идейные соображения высшего порядка, а также постоянный количественный рост и сфера
                                нашей активности в значительной степени обуславливает создание новых
                                предложений. Повседневная практика показывает, что сложившаяся структура организации
                                играет важную роль в формировании систем массового участия.
                            </p>
                        </div>
                        <div className="col-12 col-lg-4">
                            <p className="sign">сделано <br/>коллегами <br/>для <br/>коллег</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Main;
