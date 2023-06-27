# Just About User Management

Access a live version of this project [here](https://user-management-sage.vercel.app/).

## Installation and running locally

To run this project locally, execute the following command:
`yarn && yarn dev`

## Overview

I've gone with the simplest approach possible for this project. The user list is a plain HTML table. The user form is a very plain HTML form with a function for handling submission / hitting the API.
This approach demonstrates the approach I would take with a real project: don't make it complicated until we need to. There are so many things that I could have done better (listed below) or leveraged third party libraries for, but I think starting with the basic lets you choose all the places to invest in a better or external solution later, rather than building everything at the start and being stuck with it.

### Pages

There are three pages in this project:

- `/` -> The home page which displays the user list
- `/users/create` which displays a blank form for creating a new user
- `/users/[id]/edit` which displays a pre-filled form with user data that can be edited

### Project Structure

- `/app` contains the main page logic for the app. Here, I've made use of Next's `layout`, and `loading` helpers to take basic layout and loading logic out of the main `page` component.
- `app/api` - contains the server API routes for this project. I've defined a single route file which handles API requests related to `users`.
- `app/users` - contains the pages related to creating and editing users.
- `components/` - contains shared components for the project. In here, I've put things like low level UI components (`alert`, `input`) as well as higher level components that are shared across pages (`user-form` for example).
- `models/` contains the Typescript models for the project. Since the project is small, there's a single file containing models related to Users. The Type Guards I've defined also live here alongside the types.

## Other Features Considered

I considered a few other things to add to this project, but ultimately didn't add them in favor of getting the MVP working in the time given.

### Pagination

The home page user list only shows the first `30` users that come back from the API. I would have liked to add pagination here and build out components to go with the table to allow users to navigate between pages and choose how many users to show at a time.
When I factored in building out the UI components along with building out the logic and API handling I decided not to continue with this feature.

### Sorting and searching

Similar to pagination above, there is no way to filter or sort the user list. The constraints are basically the same as those described for pagination.

## Improvements / Things I would do differently given more time

### Testing

There are no tests of any kind for this project. I'd start by adding some basic unit tests for the components to get some coverage. Ideally, this project should contain a full suite of unit tests, integration tests for the pages, and maybe some visual tests for styling.

### A better network layer

Most of the networking lives under `app/api/users` with some other network handling living at the page level (fetching the main list of users happens in `app/page.tsx`). I would build this out more fully if I were to spend more time on it. It would be nice to have all the networking related to users in one place and also strongly typed.

### Better Type Guards

I've added some type guard under `models/user` in order to give some confidence about the parsed data from the API matching the shape of the types. However, these guards are really primitive and are likely to fail as the API changes. They just check for the presence of properties and not what the actual properties are.
In combination to improving the networking layer described above, I would also invest in building out a good type guard system along side this, so we would have really good confidence that the data we have coming in from outside is as we expect.

### Form handling

The form handling is really basic and just leverages the existing HTML validations and state management. I only use React to gather up the data on submit and send it to the API.
This is fine for a MVP, but ideally I would have used something like [react hook form](https://react-hook-form.com/) which is purposely built to handle validation, etc.

### UI/UX

I've gone for a super simple approach here and would definitely like to spend some more time making the app look and behave better. One thing that would be really beneficial here would be to define the style using low level components. I've added a few but ideally we would have all of the building blocks created (inputs, typography, layouts, containers, etc) that would drive how the whole app looks.

#### UI Status / Alerts

Related to this point is how we convey status to the user. Right now there is one simple component (`StatusMessages`) which displays alerts based on query params in the URL. They only show one at a time and disappear when the URL changes. A more robust system for alerts would be great.

### Component structure

I've purposely left the structure of the components "unsorted" here to avoid premature optimization since the codebase is so small. In reality though, we should set out a guide for where components should live. Low level UI components like `alert` shouldn't be along with components that are much higher-level and have logic e.g `user-form`.
