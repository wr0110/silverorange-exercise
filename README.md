silverorange Intermediate Developer Assessment
==============================================

This exercise is designed to assess how you approach tasks required in your
position as an intermediate developer at silverorange. We are interested to see
how you work as well, as what your final results are; include useful Git commit
messages and comments where you think your code may be unclear.

Please do not include your name or any other self-identifying information in
code or commit messages as silverorange will anonymize your work before
reviewing.

Tasks
-----
### (A) Node/Express

With the provided Express framework in `/api`:

 1. Implement the `/repos` API endpoint
 2. The endpoint should aggregate GitHub repository data from the
following sources:
    - https://api.github.com/users/silverorange/repos
    - The provided JSON file (in `api/data/repos.json`). Assume this file can
      change while the service is running.
 3. Only return repositories where `repository.fork` is `false`.
 4. Return results as JSON-encoded data with a content-type of
    `application/json`.

**Note**: Middleware in `api/src/app.ts` intentionally adds latency and
occasionally returns an error instead of a proper response. You are encouraged
to leave this middleware in place to improve your implementation in (B).

### (B) React

Using the provided React application in `/web`:

 1. Fetch repository data from the Express API created in (A).
 2. Display a list of repositories. Include the repository name, description,
    language, and forks count in the list.
 3. The list of repositories should be displayed in reverse chronological order
    by creation date.
 4. Add buttons for each language type. Make clicking on a language button
    filter the list by language type.
 5. Make each repository in the list clickable.
 6. When you click a repository, display the most recent commit date, author,
    and message.
 6. If the repository has a `README.md` file, it will be located at
    https://raw.githubusercontent.com/${repo.full_name}/master/README.md. In
    this case, also render the Markdown content when clicking on the repository.
 7. Include a way to return to the main list of repositories after you click on
    a repository.

Environment
-----------
You can use any stable version of Node JS. The base project is written using
TypeScript but you may use vanilla JavaScript to complete the tasks.

Coding Standard
---------------
Please use [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
for your code. The project is set up to lint your code using:
```sh
yarn lint
```

If your editor is not already configured to use Prettier, you can format code
in the project using:
```sh
yarn prettier-write
```

Dependencies
------------
Please use the [Yarn](https://yarnpkg.com/) or
[NPM](https://docs.npmjs.com/cli/npm) tools for dependency
management. You can use any 3rd-party libraries as necessary or as desired in
order to achieve the tasks. The project is currently set up to use Yarn but
you may update it to use NPM if that is your preference.

Commits
-------
Your commit history is important to us! Try to make meaningful commit messages
that show your progress. Remember to not include your name or any other
self-identifying information in your commit messages.

Getting Started With the Express Backend (/api)
-----------------------------------------------
For this exercise a pre-built Express application is provided. The application
runs by default on `localhost:4000` and has the following endpoints:

 - `http://localhost:4000/repos` - returns a JSON-encoded array of repos. By
   default, an empty array is returned. You will need to add an implementation
   in (A).

### Running the Express Application

```sh
cd api/
yarn install
yarn start
```

You can verify the API is working by visiting http://localhost:4000/repos in
your browser or another HTTP client. **Please note that about 25% of the time,
the API returns an error message.**

Getting Started with the React Client (/web)
------------------------------------------------
The React client is a bare Create React App application.

### Running the Expo Application

```sh
cd web/
yarn install
yarn start
```

This will open your browser at http://localhost:3000, allowing you to test the
React client.
