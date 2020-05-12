import {
	default as 
	express,
  Application,
  Request,
  Response,
	Router,
} 
from 'express';

// eigen imports
import { 
	HelloController, 
	PostController, 
	MessageController,
	UserController,
} from '../controllers';

class ApiRouter {
  public router: Router;
  private helloController: HelloController;
	private postController: PostController;
	private messageController: MessageController;
	private userController: UserController;

  constructor() {
    this.router = express.Router();

    this.registerControllers();
		this.registerRoutes();
		
  }

  private registerControllers(): void {
    this.helloController = new HelloController();
		this.postController = new PostController();
		this.messageController = new MessageController();
		this.userController = new UserController();
  }

  private registerRoutes(): void {
		// dit staat onder het pad /api/*wat je wil zoeken*
		// voor /api/messages/*hier direct id : moet niet*

		this.router.get('/hello', this.helloController.index);
		this.router.get('/messages', this.messageController.index);
		this.router.get('/messages/:id', this.messageController.show);
    this.router.get('/posts', this.postController.index);
		this.router.get('/posts/:id', this.postController.show);
		this.router.get('/users', this.userController.index);
		this.router.get('/users/:id', this.userController.show);

		
  }
}

export default ApiRouter;