import { Router, Request, Response, json } from 'express';
import { Repo } from '../models/Repo';

export const repos = Router();

repos.get('/', json(), async (_: Request, res: Response) => {
  const repositories: Repo[] = await (
    await import('../../data/repos.json')
  ).default;

  const filteredRepos = repositories.filter(({ fork }) => fork === false);

  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json(filteredRepos);
});
