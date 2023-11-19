import "./List.scss";

export default function List({ itemsForTitles }) {
  // console.log(itemsForTitles); //works

  return (
    <>
      <div className="list">
        {itemsForTitles.map((titleObj, index) => (
          <div key={index}>
            <h2 className="list__title">{titleObj.title.title}</h2>
            <ul className="list__text">
              {titleObj.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
