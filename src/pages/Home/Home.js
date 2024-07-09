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
        <BottomNavigation />
      </div>
      <main className="home__main">
        <div className="home__readme-mobile">
          <h3>Welcome :)</h3>
          <p>
            Notebooks was created as a capstone project for my software
            engineering diploma course at BrainStation London. It is a web app
            to store lists which are sorted into notebooks.
          </p>
          <br />
          <p>
            The project was built to showcase a React front end application with
            full CRUD operations, and an Express/Node.js backend, together with
            an SQL database. The database consists of three separate tables and
            I used Knex as a query builder.
          </p>
          <br />
          <p>Have a look at the source code here: </p>
          <br />

          <p>
            <a
              href="https://github.com/leta-krahenbuhl/notebooks"
              target="_blank"
              rel="noopener noreferrer"
              class="readme-mobile__link"
            >
              Front-end repo
            </a>
          </p>

          <p>
            <a
              href="https://github.com/leta-krahenbuhl/notebooks-server"
              target="_blank"
              rel="noopener noreferrer"
              class="readme-mobile__link"
            >
              Back-end repo
            </a>
          </p>
          <br />
          <br />
          <h3>User guide</h3>

          <h4 class="readme-mobile__header">Edit/delete or add new notebook</h4>
          <p> Use the buttons at the bottom of the homepage. </p>
          <h4 class="readme-mobile__header"> Add a new list to a notebook </h4>
          <p>
            Click onto the notebook you would like to add the list to, then use
            the plus button at the bottom of the page.
          </p>
          <h4 class="readme-mobile__header"> Edit/delete a list</h4>
          <p>
            Click onto the list title and use the edit/delete button to edit a
            list.
          </p>
        </div>
        <div className="home__readme-desktop">
          <h3>Welcome :)</h3>
          <p>
            Notebooks was created as a capstone project for my software
            engineering diploma course at BrainStation London. It is a web app
            to store lists which are sorted into notebooks.
          </p>
          <br />
          <p>
            The project was built to showcase a React front end application with
            full CRUD operations, and an Express/Node.js backend, together with
            an SQL database. The database consists of three separate tables and
            I used Knex as a query builder.
          </p>
          <br />

          <p>
            Have a look at the source code here:
            <br />
            <br />
          </p>

          <p>
            <a
              href="https://github.com/leta-krahenbuhl/notebooks"
              target="_blank"
              rel="noopener noreferrer"
              class="home__link"
            >
              Front-end repo
            </a>
          </p>

          <p>
            <a
              href="https://github.com/leta-krahenbuhl/notebooks-server"
              target="_blank"
              rel="noopener noreferrer"
              class="home__link"
            >
              Back-end repo
            </a>
          </p>
        </div>
      </main>
    </article>
  );
}
