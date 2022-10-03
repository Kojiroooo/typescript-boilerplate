import { postCreate, getPostList } from '@/services/post_service';
import { Router, Express, Request, Response } from 'express';
import { authenticate } from './middlewares/authenticate';
const router = Router();

export const posts = (app: Express): void => {
  app.use('/api/posts', router);
  router.use(authenticate);

  router.post('/', async (req: Request, res: Response) => {
    const { user } = res.locals;
    console.log(req.body);
    const { title } = req.body;

    const fruits = {
      "apple": "2",
      "banana": "4",
      "mango": "1"
    }

    const { apple } = fruits;
    console.log(apple);

    // const { name, email, password } = req.body;
    // TODO: create post

    console.log(title);
    console.log(user);
    if(user === undefined) {
      console.log("error");
      res.send('error');
      return;
    }
    const post = await postCreate(title, user);
    res.send({
      title: post.title
    });
  });

  router.get('/', async(req: Request, res: Response) => {
    const { user } = res.locals;

    console.log(user);
    if(user === undefined) {
      console.log("error");
      res.send('error');
      return;
    }

    const posts = await getPostList();
    res.send({
      posts: posts,
    });
  });

  // router.post('/', async (req, res) => {
  //   const { name, email, password } = req.body;
  //   const user = await userCreate(name, email, password);

  //   res.send({ sessionToken: user.sessionToken });
  // });
};
