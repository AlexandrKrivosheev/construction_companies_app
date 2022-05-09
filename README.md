Hello, my fellow reviewer, how's your day going? :)

### How to start

It requires node v18. Why? Because [the future is now, old man](https://knowyourmeme.com/memes/the-future-is-now-old-man).

```bash
# do you have nvm? https://github.com/nvm-sh/nvm
nvm install 18
nvm use 18
# run backend
cd backend && npm i && npm run start
# run frontend
cd frontend && npm i && npm run start
```

### What to improve

- move host, port to .env
- maybe fetch specialties from api instead of hardcoding
- add sentry
- improve logging
- move filtering to server
- improve filtering algo on client
