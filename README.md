# Overview: Notebooks

- A to do list app where users can sort to do lists into notebooks
- To be extended into a combination of lists, trackers and journals (see 'Nice to Haves')
- Designed for mobile only at the moment!

### Problem

Physical notebooks take up space and are time consuming to maintain. A notebook on your phone can be udpated quickly, on the go, and doesn't use any extra space in your bag or bookshelf.

### User Profile

People who like usings lists to organise their lifes.

### Features

#### General

- Clicking on the notebooks logo will re-direct back to the landing page

#### Landing Page

- Displays a list of all notebooks
- Click on a notebook title will show its lists
- Bottom nav bar:
  - Plus icon: Add a new notebook
  - Pen icon: Edit the name of an existing notebook
  - Bin icon: Delete an existing notebook and all it's content

#### Add notebook page

- Type in new title and save
- Cancel to get back to landing page

#### Notebook page

- Under each list title are its corresponding list items, lists separated by dotted line
- All lists displayed as endless scroll
- Every list item has an empty square next to it, marking it as not done
- Clicking on empty square fills out the square and marks the list item as done
- Clicking on list title shows individual list page (place to edit list)
- Top navigation shows title of the notebook
- Bottom navigation
  - Plus icon: Add a new list Users

#### Add list page

- Add a title
- Add list items
- Done button re-directs to notebook page

#### List page

- Top navigation
  - shows notebook title and list title
  - click on notebook title links to notebook page
- Bottom navigation:
  - Bin icon: delete list
  - Edit icon: edit list title or items

#### Edit list page

- Edit list title or list items
- Done button redirects back to list page
- Top navigation:
  - Click on list title redirects to list page
  - Click on notebook title redirects to notebook page

## Implementation

### Tech Stack

- HTML, CSS, SASS/BEM, JavaScript, React JS, Node/Express server
- Use of local MySQL database with knex.js

### APIs

Three API endpoints:

- api/notebooks
- api/list-titles
- api/list-items

### Sitemap

#### /

- Landing page with list of all notebooks as links

#### /create/notebook

- Add a new notebook

#### /notebooks/:notebook-id

- All lists of one specific notebook

#### /notebooks/:notebook-id/lists/:list-id

- A single list

#### /notebooks/:notebookId/create/lists

- Add a new list to a notebook

#### /notebooks/:notebookId/lists/:listId/edit

- Edit existing list

### Screenshots

<img src="./src/assets/mock-ups/home.png" alt="Alt Text" width="210" >
<img src="./src/assets/mock-ups/add-notebook.png" alt="Alt Text" width="210" >
<img src="./src/assets/mock-ups/notebook.png" alt="Alt Text" width="210" >
<img src="./src/assets/mock-ups/edit-list.png" alt="Alt Text" width="210" >

### Data

- One database called 'notebooks'
- Three tables:
  - notebooks
  - list_titles
  - list_items

<img src="./src/assets/mock-ups/data.png" alt="Alt Text" width="610" >

### Endpoints

#### http://localhost:8080/api/notebooks

- to get a list of all notebook titles, add a new notebook title, edit a notebook title or delete a notebook title
- GET / POST / PUT / DELETE

```
[
  {
    "id": 1,
    "date": "11/13/2023, 3:30:00 PM",
    "title": "Gift Ideas",
    "notebook_id": "1"
  }
]
```

#### http://localhost:8080/api/list-titles

- to get a list of all list titles, add a new list title, edit a list title or delete a list title
- GET / POST / PUT / DELETE

```
      {
        "id": 1,
        "date": "11/13/2023, 3:30:00 PM",
        "title": "Dad",
        "notebook_id": 1
      };
```

#### http://localhost:8080/api/list-items

- to get a list of all list items, add a new list items, edit a list items or delete a list items
- GET / POST / PUT / DELETE

```
      {
        "id": 1,
        "text": "Scarf",
        "done": false,
        "list_id": 1
      };
```

## Developer installation guide

- Download both client and server side of the notebooks code from GitHub:
  - Front-end: https://github.com/leta-krahenbuhl/notebooks
  - Back-end: https://github.com/leta-krahenbuhl/notebooks-server
- Set up a local MySQL database called 'notebooks'
- Server side:
  - npm install (to install any dependencies including knex and mysql2)
  - set up a local .env file with your environment variables (see env.sample file for reference)
  - npx knex migrate:latest (create the three database tables)
  - npx knex seed:run (to populate the database tables)
  - npm start (to start server, should be as a custom script in package.json)
- Client side:
  - npm install (to install any dependencies)
  - set up a local .env file with your environment variables (see env.sample file for reference)
  - npm start (to view react app in browser)

## Nice-to-haves / next steps

- This project is set up to be extended to incorporate mood trackers, habit trackers and journals as well
- Each notebook will eventually represent a year and contain all lists, trackers and journal entries from that year, sorted by date
- Responsive design
- Log-in functionality

## Key take-aways

- Coding takes time
- Error messages are my friends
- The same problem looks very different at 11:30pm and 11:30am
- If anything seems to complicated, break it down into smaller pieces
