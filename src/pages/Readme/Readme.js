import "./Readme.scss";
import Header from "../../components/Header/Header";

export default function Readme() {
  return (
    <article className="readme">
      <Header />
      <main className="readme__main">
        <h3>Welcome!</h3>
        <p>
          Notebooks is a web app to store and sort your lists. Lists are sorted
          into notebooks, which are displayed on the homepage.
        </p>
        <h3>Edit/delete or add new notebook</h3>
        <p> Use the buttons at the bottom of the homepage. </p>
        <h3> Add a new list to a notebook </h3>
        <p>
          Click onto the notebook you would like to add the list to, then use
          the plus button at the bottom of the page.
        </p>
        <h3> Edit/delete a list</h3>
        <p>
          Click onto the list title and use the edit/delete button to edit a
          list.
        </p>
      </main>
    </article>
  );
}
