import "./Readme.scss";
import Header from "../../components/Header/Header";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";

export default function Readme() {
  return (
    <article className="readme">
      <div className="nav-desktop-wrapper">
        <Header />
        <BottomNavigation />
      </div>
      <main className="readme__main">
        <h3>Welcome :)</h3>
        <p>
          Notebooks was created as a capstone project for my software
          engineering diploma course. It is a web app to store and sort lists.
          Lists are sorted into notebooks, which are displayed on the homepage.
        </p>
        <br />
        <p>
          Notebooks was built as a react.js app on the front-end using HTML, CSS
          with SASS and JavaScript. The back-end is build with node.js, Express
          and an SQL database. Have a look at the source code here:
          <br />
          <br />
        </p>

        <p>
          <a
            href="https://github.com/leta-krahenbuhl/notebooks"
            target="_blank"
            rel="noopener noreferrer"
            class="readme__link"
          >
            Front-end repo
          </a>
        </p>

        <p>
          <a
            href="https://github.com/leta-krahenbuhl/notebooks-server"
            target="_blank"
            rel="noopener noreferrer"
            class="readme__link"
          >
            Back-end repo
          </a>
        </p>
        <br />
        <br />
        <h3>User guide</h3>

        <h4 class="readme__header">Edit/delete or add new notebook</h4>
        <p> Use the buttons at the bottom of the homepage. </p>
        <h4 class="readme__header"> Add a new list to a notebook </h4>
        <p>
          Click onto the notebook you would like to add the list to, then use
          the plus button at the bottom of the page.
        </p>
        <h4 class="readme__header"> Edit/delete a list</h4>
        <p>
          Click onto the list title and use the edit/delete button to edit a
          list.
        </p>
      </main>
    </article>
  );
}
