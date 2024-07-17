import "./Home.scss";
import Header from "../../components/Header/Header";
import NotebookTitles from "../../components/NotebookTitles/NotebookTitles";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";

export default function Home() {
  return (
    <article className="home">
      <div className="home__nav-desktop-wrapper">
        <Header />
        <nav className="home__nav">
          <NotebookTitles />
        </nav>
        <div className="home__bottom-nav-desk">
          <BottomNavigation />
        </div>
      </div>

      <article className="home__main">
        <div className="home__readme">
          <h3 className="home__header">Welcome</h3>
          <p className="home__text">
            Notebooks was created as a capstone project for my software
            engineering diploma course at BrainStation London. It is a web app
            to store lists which are sorted into notebooks.
          </p>
          <br />
          <p className="home__text">
            The project was built to showcase a fully responsive React front end
            application with CRUD operations, and an Express/Node.js backend
            linked to an SQL database. The database consists of three separate
            tables and I've used Knex as a query builder.
          </p>
          <br />

          <p className="home__text">
            Feel free to a look at the source code on GitHub here:
            <br />
            <br />
          </p>
          <p className="home__text">
            <a
              href="https://github.com/leta-krahenbuhl/notebooks"
              target="_blank"
              rel="noopener noreferrer"
              class="home__link home__link--mobile"
            >
              Front-end repo
            </a>
          </p>
          <p className="home__text">
            <a
              href="https://github.com/leta-krahenbuhl/notebooks-server"
              target="_blank"
              rel="noopener noreferrer"
              class="home__link home__link--mobile"
            >
              Back-end repo
            </a>
          </p>
        </div>
      </article>

      <div className="home__bottom-nav-mobile">
        <BottomNavigation />
      </div>
    </article>
  );
}
