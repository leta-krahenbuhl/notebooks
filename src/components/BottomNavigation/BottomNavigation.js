// import "./BottomNavigation.scss";
// import { useState, useEffect } from "react";
// import { fetchNotebookTitles } from "../../utils/AxiosRequests";

// export default function BottomNavigation({ notebookId }) {
//   const [notebooks, setNotebooks] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const getNotebookTitles = async () => {
//     try {
//       const data = await fetchNotebookTitles();
//       setNotebooks(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getNotebookTitles();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   const parsedNotebookId = parseInt(notebookId);

//   const navNotebookTitle = notebooks.find(
//     (notebook) => notebook.id === parsedNotebookId
//   );

//   return (
//     <>
//       <h2 className="top-navigation">{navNotebookTitle.title}</h2>
//     </>
//   );
// }
