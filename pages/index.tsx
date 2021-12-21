import type { NextPage } from "next";
import Layout from "../components/Layout";
import style from "../styles/pages/index.module.scss";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={style.home_container}>
        <div className={style.home_container__home}>
          <p className={style.home_container__home__title}>
            Resist the temptation to SELL
          </p>
          <p className={style.home_container__home__content}>
            Are you tired of selling your crypto at a bad time, try CASA.
          </p>
          <p className={style.home_container__home__content}>
            Casa gives you the option to lock your crypto for your chosen amount
            of time, so you can avoid making hastey decisions.
          </p>

          <button
            className={`${style.button} ${style.button_accent} ${style.home_container__home__content__button}`}
          >
            GET STARTED
          </button>

          <div className={style.home_container__home__stats}>
            <div className={style.home_container__home__stats__data}>
              <p className={style.home_container__home__stats__data__title}>
                Total Users
              </p>
              <p className={style.home_container__home__stats__data__content}>
                587
              </p>
            </div>

            <div className={style.home_container__home__stats__data}>
              <p className={style.home_container__home__stats__data__title}>
                Locked Volume
              </p>
              <p className={style.home_container__home__stats__data__content}>
                $14K
              </p>
            </div>
          </div>
        </div>
        <div className={style.home_container__how_it_works}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolore
          temporibus sit rerum! Quis harum, sed molestiae velit aperiam
          temporibus beatae earum voluptate. Recusandae eaque qui doloremque
          similique veniam at! At eaque exercitationem culpa, nostrum, eligendi
          laboriosam eius eum rerum, ipsum sed minima est nam molestiae et sint
          in voluptatum quia veritatis! Veniam officia quis esse modi quibusdam
          natus deserunt. Culpa iusto magnam cumque quidem vel aspernatur
          voluptatem facilis officiis pariatur? Consequuntur aspernatur optio
          sapiente quas placeat sit animi sed. Provident, porro distinctio ullam
          libero fugit consequuntur quis earum fuga. Nisi sed praesentium
          blanditiis minima veritatis pariatur mollitia numquam impedit id illo
          ad atque architecto accusamus quod illum dolor deleniti fugit quaerat
          sequi, qui sint. Vitae voluptates facilis architecto ratione? Tenetur,
          dignissimos. Ipsam esse itaque ad voluptate impedit doloribus et
          possimus nobis dolores quas cum explicabo placeat commodi, libero ea
          architecto incidunt accusantium, nostrum sequi doloremque ratione quod
          ipsa deserunt.
        </div>
      </div>
    </Layout>
  );
};

export default Home;
