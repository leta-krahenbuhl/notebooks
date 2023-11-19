// import List from "../List/List";
// import "./Notebook.scss";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { fetchListTitles } from "../../utils/AxiosRequests";
// import { fetchListItems } from "../../utils/AxiosRequests";
// import TopNavigation from "../TopNavigation/TopNavigation";
// import BottomNavigation from "../BottomNavigation/BottomNavigation";

// export default function Notebook() {
//   const [listTitleswithNotebookId, setListTitleswithNotebookId] =
//     useState(null);
//   const [allListItems, setAllListItems] = useState(null);
//   // const [isLoadingNotebooks, setisLoadingNotebooks] = useState(true);
//   // const [isLoadingListTitles, setisLoadingListTitles] = useState(true);

//   const { notebookId } = useParams();
//   // console.log(notebookId); //works

//   const getArrayOfListTitlesWithNotebookId = async () => {
//     try {
//       const data = await fetchListTitles();
//       // setisLoadingNotebooks(false);

//       const arrayOfListTitleswithNotebookId = data.filter(
//         (notebook) => notebook.notebook_id === parseInt(notebookId)
//       );
//       setListTitleswithNotebookId(arrayOfListTitleswithNotebookId);
//       // console.log(arrayOfListTitleswithNotebookId);

//       // console.log(listTitleswithNotebookId); //works! for different notebooks!
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getArrayOfListTitlesWithNotebookId();
//   }, [notebookId]);

//   const getAllListItems = async () => {
//     try {
//       const data = await fetchListItems();
//       setAllListItems(data);
//       // setisLoadingListTitles(false);

//       // console.log(allListItems);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getAllListItems();
//   }, [listTitleswithNotebookId]);

//   const getItemsForTitles = (titles, items) => {
//     const itemsByTitle = titles.map((title) => {
//       const itemsForTitle = items.filter((item) => item.list_id === title.id);
//       return { title, items: itemsForTitle };
//     });

//     return itemsByTitle;
//   };

//   const itemsForTitles = getItemsForTitles(
//     listTitleswithNotebookId || [],
//     allListItems || []
//   );

//   // console.log(itemsForTitles);

//   return (
//     <>
//       <TopNavigation notebookId={notebookId} />
//       <article className="notebook">
//         {" "}
//         {itemsForTitles && <List itemsForTitles={itemsForTitles} />}{" "}
//       </article>
//       <BottomNavigation notebookId={notebookId} />
//     </>
//   );
// }

// //--------------------- To Do
// // Add journal entries here as well
// // sort all List as well as JouralEntry components by date. Make date state in this component.
