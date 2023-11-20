// import "./EditListTitle.scss";
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AddListTitle({ notebookId }) {
//   const [isTitle, setIsTitle] = useState(false);
//   const [title, setTitle] = useState("");
//   const navigate = useNavigate();

//   const handleSubmitTitle = async (event) => {
//     event.preventDefault();

//     const parsedNotebookId = parseInt(notebookId);
//     // console.log(parsedNotebookId); //works

//     const newListTitle = {
//       title: event.target.text.value,
//       notebook_id: parsedNotebookId,
//     };
//     // put front-end form evaluation here

//     const baseURL = process.env.REACT_APP_BASE_URL;

//     try {
//       const response = await axios.post(
//         `${baseURL}/api/list-titles`,
//         newListTitle
//       );
//       const newListTitleId = response.data.id;

//       setIsTitle(true);
//       setTitle(newListTitle);

//       // Update the URL
//       // navigate(`/lists/add/${newListTitleId}`); OLD
//       navigate(`/notebooks/${notebookId}/create/list/${newListTitleId}`);

//       event.target.reset();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (!isTitle) {
//     return (
//       <>
//         <form className="add-list-title-form" onSubmit={handleSubmitTitle}>
//           <h2 className="add-list-title-form__header">EDIT LIST</h2>
//           <div className="add-list-title-form__wrapper">
//             <input
//               type="text"
//               id="text"
//               name="text"
//               placeholder="add list title"
//               className="add-list-title-form__input"
//               //   value={title}
//               //   onChange={(event) => {
//               //     setTitle({
//               //       title: event.target.value,
//               //     });
//               //   }}
//             />
//             <button className="add-list-title-form__button"></button>
//           </div>
//         </form>
//       </>
//     );
//   }

//   if (isTitle) {
//     return (
//       <>
//         <h2 className="add-list-title-form__header">ADD LIST</h2>
//         <h3 className="add-list-title-form__list-title">{title.title}</h3>
//       </>
//     );
//   }
// }
