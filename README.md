# Gitty

### Learning Objectives

- Use OAuth to create & log in users
- Use Express middleware to ensure requests are authenticated
- Use cookies to store user data
- Use JWTs for storing user data in cookies
- Sign & verify JWTs to ensure validitity
- Utilize GitHub OAuth for authentication

### Description

You've volunteered to help build a new project that your dev buddy thinks is going to be the next unicorn startup: you're making a Twitter clone for developers. However, instead of using traditional usernames/passwords for authentication, your users will sign up and log in using their Github accounts. Your job is to build the authentication API, a protected endpoint (i.e. you must be signed in to access it) for creating text posts limited to 255 characters, and another protected endpoint for listing posts from all users.

### Acceptance Criteria

While **no UI is required** for this deliverable, you can choose to add one as a stretch goal. Consider using `express.static()` for serving up a landing page with a 'Login/Sign Up with Github' button, and views for both creating and listing text posts.

- Users can sign up using their Github account
  - i.e. if no `GithubUser` exists in your database for the user, create a new one
- Users can sign in using their Github account
  - i.e. if an existing `GithubUser` exists for a given email address, don't create a new user, but use the existing one for generating the JWT to save into the cookie
- Authenticated users can view a list of text posts (via API)
  - i.e. the `/api/v1/posts` route uses Express middleware for authentication
- Authenticated users can make short text posts (via API)
  - limit text posts to 255 characters
- Authenticated users can make subsequent requests to the API without having to log in before each one
  - i.e. your authentication process uses cookies to store server-side state 

### Rubric

| Task | Points |
| --   | --     |
| GET `/api/v1/github/login` route (for redirecting to Github's OAuth) | 4   |
| GET `/api/v1/github/login/callback` callback URI for Github to redirect to after log in | 4 |
| DELETE `/api/v1/github` signs a user out (i.e. deletes the session cookie) | 1 |
| GET `/api/v1/posts` lists all posts for all users | 2   |
| POST `{ post }` to `/api/v1/posts` creates a new post for the signed in user | 2 |
| `GithubUser` model | 2|
| `Post` model | 1 |
| Authentication middleware for protecting `/api/v1/posts` | 2 |
| Each route has tests | 2 |
