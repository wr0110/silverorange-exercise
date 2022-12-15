import Axios from 'axios';
import { Router, Request, Response, json } from 'express';
import { Repo } from '../models/Repo';

export const repos = Router();

repos.get('/', json(), async (_: Request, res: Response) => {
  const repositoriesfromFile: Repo[] = await (
    await import('../../data/repos.json')
  ).default;

  const repositoriesfromAxios: Repo[] = await (
    await Axios('https://api.github.com/users/silverorange/repos')
  ).data;

  const filteredRepos = [
    ...repositoriesfromFile,
    ...repositoriesfromAxios,
  ].filter(({ fork }) => fork === false);

  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json(filteredRepos);
});
