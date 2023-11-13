# Overview: Notebooks

- An app leaning loosely on the concept of bullet journalling and notebooks
- It combines journals, lists and trackers
- Data is sorted in to notebooks which are displayed as an endless scroll, a bit like a blog
- It helps to evaluate where you are in your life, makes you think about your goals and helps building healthy habits that will help you achieve these
- An archive of your life you can look back on to simply reminisce or to see how far you have come
- Easy and intuitive to use
- App helps you get started with suggestions where to start
  - Start with one notebook per year. In that:
  - Create a gratitude journal. Create a new page every day and write down three things you’re grateful for or proud of. Link to article of mental health benefits of doing this.
  - Create a list page and write down goals you would like to achieve. Think of habits you’d like to build and where you want to be in a year / 5 years. Link to article of how setting goals improves success rate.
  - Create a weekly habit tracker page for habits that will help you achieve your goals. Link to study of how long you need to do a habit so it becomes something that is done without having to think about it.
  - Create a to do list page
  - Start a mood tracker page every month to be able to see patterns in your moods
  - Suggest other things you can do
    - eg create a recipe collection (as a new notebook, use a journal for each theme such as mains, deserts, etc)
    - Create lists such as movies I'd like to watch, books to read, etc

### Problem

I have been looking for an app to replace a physical notebook and can't find anything that combines journals, habit trackers, mood trackers, and lists, is easy to use and visually attractive / customisable.

Physical journals take up space and are time consuming to maintain. A journal on your phone can be udpated quickly, on the go, and doesn't use any extra space in your bag or bookshelf.

I would like the personal journey to be easily visualised by being able to scroll through notebooks and see old habits trackers, list, journal entries, etc.

### User Profile

Anyone who

- would like to organise their life in a simple app
- would like to figure out their goals and work towards them
- would like to use a journal or habit tracker to improve mental health
- finds ticking off to do lists motivating
- needs an app to be visually inviting and simple to use to be able to stick with it

### Features

#### Home

- Logo
- List navigation to all notebooks available
- Option to create new notebook

#### Notebooks

- Entries are displayed as endless scroll, like a blog posts
- As default sorted by date, newest on top
- Each blog posts is referred to as a page
- Each page has a creation date
- Have four page categories:
  - Journals
  - Lists
  - Mood trackers
  - Habit trackers
- You can collapse all pages and only see the titles
- Pages can be sorted

  - by creation date (default)
  - by month
  - by section
  - by type of page (journals/lists/mood or habit trackers)

  #### Journals

- Consist of entries
- Can contain text, images, or links

#### Lists

- Individual list items who either
  - Get crossed out when done
  - Or have a tickbox next to them
- list items can be sorted under sub-titles

#### Habits

- Weekly
- For each habit
  - Chose how many times per week you want to do that habit
  - Eg 4 x week will get you 4 circles next to that habit
  - Each time you do the habit that week you fill out one circle
  - Each habit has a start next to it as well which can be filled out when all circles have been completed that week

#### Mood Tracker

- Monthly
- Header with month name at top
- Vertical list of days in month with date, weekends in different background colour
- You can add smilies in each day to track mood and other things

## Implementation

### Tech Stack

- Use HTML, CSS, SASS/BEM, JavaScript, React, Node, Express, Knex.js, Databases, GitHub

### APIs

The data will come from the user and I will build the database structure to save the data with knex.js.

### Sitemap

#### /

- Home page with list of all notebooks as links

#### /create-notebook

- Create notebook page

#### /notebooks/:notebook-id

- Page of all entries from one notebook in blog post format, sorted by date, newest at top. All entries can be collapsed so only header is visible

#### /notebooks/:notebook-id/create/section

#### /notebooks/:notebook-id/create/journal

#### /notebooks/:notebook-id/create/journal-entry

#### /notebooks/:notebook-id/create/mood-tracker

#### /notebooks/:notebook-id/create/habit-tracker

#### /notebooks/:notebook-id/create/list

- Page to create a section/journal/journal entry/mood tracker/habit tracker/list in one notebook

#### /notebooks/:notebook-id/lists/:list-id

#### /notebooks/:notebook-id/mood-trackers/:mood-tracker-id

#### /notebooks/:notebook-id/habit-trackers/:habit-tracker-id

- Page of one specific list/mood tracker/habit tracker in a notebook

#### /notebooks/:notebook-id/journals/:journal-id/:journal-entry-id

- Page of one specific journal entry in a notebook

#### /notebooks/:notebook-id/habit-trackers

#### /notebooks/:notebook-id/mood-trackers

#### /notebooks/:notebook-id/lists

- Page of all mood trackers/habit trackers/lists from one notebook, as a collapsed navigation

#### /notebooks/:notebook-id/sections/:section-id

- Page of all journal entries/mood trackers/habit trackers/lists from one section in one notebook

#### /notebooks/:notebook-id/journals/:journal-id

- Page of all entries from one journal in one notebook in blog format

### Mockups

<img src="./src/assets/mock-ups/home.png" alt="Alt Text" width="110" >
<img src="./src/assets/mock-ups/add-notebook.png" alt="Alt Text" width="110" >

<img src="./src/assets/mock-ups/notebook.png" alt="Alt Text" width="110" >
<img src="./src/assets/mock-ups/notebook-entries-collapsed.png" alt="Alt Text" width="110" >
<img src="./src/assets/mock-ups/notebook-add-stuff.png" alt="Alt Text" width="110" >
<img src="./src/assets/mock-ups/add-mood-tracker.png" alt="Alt Text" width="110" >

<img src="./src/assets/mock-ups/journal-entry.png" alt="Alt Text" width="110" >

<img src="./src/assets/mock-ups/journal-sort.png" alt="Alt Text" width="110" >
<img src="./src/assets/mock-ups/journal-sort-exp.png" alt="Alt Text" width="110" >

<img src="./src/assets/mock-ups/habit-tracker.png" alt="Alt Text" width="110" >
<img src="./src/assets/mock-ups/mood-tracker.png" alt="Alt Text" width="110" >
<img src="./src/assets/mock-ups/to-do.png" alt="Alt Text" width="110" >

### Data

The data will be what the user inputs.

<img src="./src/assets/mock-ups/data-visualisation.png" alt="Alt Text" width="8000px" >

Link to diagram: https://drawsql.app/teams/lk-13/diagrams/notebooks

The 'user' is a nice to have for this sprint, but I am planning to implement it later.

For the mood tracker I would like to use a date utility API to generate the days of the month and add a background colour for the weekends. I have had a quick look at Date-fns Library and Nager.at API so far for that.

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

#### http://localhost:8080/api/notebooks

- To get a list of all notebooks, post notebooks, edit notebooks or delete notebooks
- GET / POST / PUT / DELETE

```
{
    "id": 1,
    "date": "11/13/2023, 3:30:00 PM",
    "name": "Gratitude"
}
```

#### http://localhost:8080/api/journals/entries

- To get a list of all journal entries, post a new journal entry, edit a journal entry or delete a journal entry
- GET / POST / PUT / DELETE

```
[
  {
     "id": 1,
     "date": "11/13/2023, 3:30:00 PM",
     "title": "17 Nov",
     "text": "This is a journal entry. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
     "image": "path-to-my-image",
     "image_description": "Description to my image",
     "journal_id": 3
   }
]
```

#### http://localhost:8080/api/sections

- to get a list of all sections, add a section, edit a section or delete a section
- GET / POST / PUT / DELETE

```
[
  {
     "id": 1,
     "date": "11/13/2023, 3:30:00 PM",
     "title": "17 Nov",
     "notebook_id": "3"
   }
]
```

#### http://localhost:8080/api/journals

- to get a list of all journals, add a new journal, edit a journal or delete a journal
- GET / POST / PUT / DELETE

```
[
  {
     "id": 1,
     "date": "11/13/2023, 3:30:00 PM",
     "title": "Gratitude",
     "section_id": "3",
     "notbooke_id": "1"
   }
]
```

#### http://localhost:8080/api/mood-trackers

- to get a list of all mood-trackers, get one mood-tracker, add a new mood-tracker, edit a mood-tracker or delete a mood-tracker
- GET / POST / PUT / DELETE

```
[
  {
     "id": 1,
     "date": "11/13/2023, 3:30:00 PM",
     "title": "April",
     "notbooke_id": "5",
     "mood_month": "November",
     "days_of_month": [
                {
                  "day_nr": 1,
                  "day_weekend": true,
                  "day_content": "U+1F600"
                  "day_notes": "Some more info about day1."
                },
                {
                  "day_nr": 2,
                  "day_weekend": false,
                  "day_content": "U+1F600"
                  "day_notes": "Some more info about day2."
                },
                // etc, for each day of the "mood_month"...
     ]
   }
]
```

#### http://localhost:8080/api/habit-trackers

- To get a list of all habit-trackers, add a new habit-tracker, edit a habit-tracker or delete a habit-tracker
- GET / POST / PUT / DELETE

```
[
  {
    id: 1,
    date: "11/13/2023, 3:30:00 PM",
    title: "WC 5 November",
    notebook_id: "5",
    section_id: "4",
    habits: [
      {
        id: 1,
        order: 1,
        title: "U+1F600",
        amount_per_week: 4,
        circles: [
          {
            id: 1,
            done: true,
          },
          {
            id: 2,
            done: true,
          },
        ],
      },
    ],
  },
];
```

#### http://localhost:8080/api/lists

- To get a list of all lists, get one list, add a new list edit a list or delete a list
- GET / POST / PUT / DELETE

```
[
  {
    id: 1,
    date: "11/13/2023, 3:30:00 PM",
    title: "To Do Today",
    notebook_id: "5",
    section_id: "4",
    list_groups: [
      {
        id: 1,
        title: "work",
        notes: "Some notes about the work list group.",
        list_items: [
          {
            id: 1,
            tick_or_strike: true,
            status: true,
            text: "phone dad",
          },
          {
            id: 2,
            done: true,
          },
        ],
      },
    ],
  },
];
```

#### http://localhost:8080/notebooks/:notebook-id/journals/:journal-id/:journal-entry-id

- Page of one specific journal entry in a notebook

#### http://localhost:8080/notebooks/:notebook-id/habit-trackers

#### http://localhost:8080/notebooks/:notebook-id/mood-trackers

#### http://localhost:8080/notebooks/:notebook-id/lists

- Page of all mood trackers/habit trackers/lists from one notebook, as a collapsed navigation

#### http://localhost:8080/notebooks/:notebook-id/sections/:section-id

- Page of all journal entries/mood trackers/habit trackers/lists from one section in one notebook

#### http://localhost:8080/notebooks/:notebook-id/journals/:journal-id

- Page of all entries from one journal in one notebook in blog format

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

- Log-in with password

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

## Nice-to-haves

### Overview

- Can easily add pictures, screenshots, URLs to a page when browsing the internet or from pictures on phone
- Make it social so you can share aspects of it with friends who are using the app too
- Have option so you can export a notebook to PDF
- Priority: Search functions globally, per notebook, per journal, etc

### Functions

#### General

- title images for each page / section / notebook / month, dipslay optional

#### Home

- Ability to build your own colour scheme / chose own fonts
- Option in for certain items to be displayed in menu as quick link?
- Choose which libraries, notebooks, collections, or pages you want to display on homepage (tick option: show on homepage)

#### Notebooks

- Notebooks can be sorted into libraries
- Can have sections in it in which to sort the entries. Each section can have a header page
- Options of how to display several image on one page in endless scroll view

#### Lists

- Option to display on calendar or not
- If list/item has a date, option to send reminder to phone as alert
- A list item can have sub list items
- Optional due date per list or item
- In progress option for when do to is started (colour of tickbox?)

#### Habits

- Chose when you want to archive habit, eg after completing 4 weeks in a row. Once that’s done you get a message that you achieved it and it gets archived. You can see all archived habits that year.
- Can see habits in a calendar
- Nth: habits can be tracked weekly, monthly or yearly

#### Add to Calendar Button (OR Nth: Calendar)

- Have a 'add to calendar' button where you can add to do lists to your device calendar
- Use npm library for this?

#### Calendar (OR Add to Calendar Button)

- Displayed like apple calendar
- Events on calendars are marked with an indicator (text? dots?)
- Clicking on a day shows you what’s on that day below the calendar
- Can insert item on a certain day
- Daily, weekly, monthly and yearly view
- Have calendars work as pages, so can build as many as you want to show different items, but have one main calendar with all the items in it
- Can have filter what’s showing up so can have an item with a calendar that shows all habits and a different item with a calendar that shows all to dos and a main calendar that has everything in it (can toggle on and off filters)
- Can repeat event daily/weekly/monthly/yearly
- Can set reminders for events
- Habits show up on calendar. Appear differently based on if you completed the habit or not, and if it’s in the future or past
- Can display when you wrote a journal entry and link to them (toggle on and off on main calendar)
- To dos appear on calendar. Different appearance for active to dos that are done and not

#### Nth: Libraries

- Are a collection of notebooks
- Can have a title image, or display collection of notebook title images/previews
- Show up in navigation or on homepage

#### Archive

- Same structure as usual page, but with all libraries/notebooks/ that are archived
- Have a date as to when they were originally created, and when they were archived
- Option to view notebooks with their pages as very small previews, sorted chronologically by date with month/year headers
- Lists can be archived so they don't show up in notebook scroll anymore
