import S3Repo from '../repos/S3Repo';
import S3ModelRepo from '../repos/S3ModelRepo';
import { parseDate } from '../utils';

const repo = new S3Repo();
const modelRepo = new S3ModelRepo();

export default class HomeController {
  static configure(app) {
    app.get("/", showAll);
    app.post("/", store);
    app.get("/:from/:to", showRange);
  }
}

async function showRange(req, res) {
  if (!req.params.from || !req.params.to) return res.status(404).send({ error: "Arguments cannot be empty" });

  const from = parseDate(req.params.from);
  const to = parseDate(req.params.to);
  
  if (!from || !to) return res.status(404).send({ error: "Arguments are not a valid date" });

  const items = await modelRepo.getRange(from, to);

  res.status(200).send(items);
}

async function showAll(_req, res) {
  const items = await modelRepo.getAll();

  res.status(200).send(items);
}

async function store(req, res) {
  if (typeof req.body !== 'string' && typeof req.body !== 'object') {
    return res.status(404).send({ error: "Invalid body" });
  }

  if (typeof req.body === 'object' && !Object.keys(req.body).length) {
    return res.status(404).send({ error: "Body cannot be empty" });
  }
  
  if (!req.body) {
    return res.status(404).send({ error: "Body cannot be empty" });
  }

  let entity = await repo.insert(req.body);
  entity = await modelRepo.insert(entity);
  
  res.status(200).send(entity);
}