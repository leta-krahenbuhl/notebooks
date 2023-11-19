import "./ListItems.scss";

export default function ListItems({ itemsForTitles }) {
  return (
    <>
      <div className="list-items">
        {itemsForTitles.map((titleObj, index) => (
          <div key={index}>
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
