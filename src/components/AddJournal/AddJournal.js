import "./AddJournal.scss";

export default function AddJournalEntry() {
  return (
    <atricle className="journal-entry">
      <form className="journal-entry__form" onSubmit={handleSubmitTitle}>
        <h2 className="journal-entry__header">EDIT LIST</h2>
        <div className="journal-entry__wrapper">
          <input
            type="text"
            id="text"
            name="text"
            placeholder="add list title"
            className="journal-entry__input-title"
            defaultValue={
              titleArr && titleArr.length > 0 ? titleArr[0].title : ""
            }
          />
          <textarea>
            type="text" id="text" name="text" placeholder="add list title"
            className="journal-entry__input-title" defaultValue=
            {titleArr && titleArr.length > 0 ? titleArr[0].title : ""}
          </textarea>
          <button className="journal-entry__button"></button>
        </div>
      </form>
    </atricle>
  );
}
