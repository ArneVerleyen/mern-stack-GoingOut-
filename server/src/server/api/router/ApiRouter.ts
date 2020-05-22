import {
  default as express,
  Application,
  Request,
  Response,
  Router,
} from 'express';
import { IConfig, AuthService, Role } from '../../services';
import {
  HelloController,
	UserController,
	EventController,
	VenueController,
	CategoryController,
} from '../controllers';

class ApiRouter {
  public router: Router;
  private helloController: HelloController;
	private userController: UserController;
	
	// eigen controllers

	private eventController: EventController;
	private venueController: VenueController;
	private categoryController: CategoryController;

	// config / Authentication service

  private config: IConfig;
  private authService: AuthService;

  constructor(config: IConfig, authService: AuthService) {
    this.config = config;
    this.authService = authService;

    this.router = express.Router();

    this.registerControllers();
    this.registerRoutes();
  }

  private registerControllers(): void {
    this.helloController = new HelloController();
		this.userController = new UserController(this.config, this.authService);
		
		this.venueController = new VenueController();
		this.eventController = new EventController();
		this.categoryController = new CategoryController();
  }

  private registerRoutes(): void {
    /*
     * Hello routes
     */
    this.router.get('/hello', this.helloController.index);
    /*
     * Users routes
     */
    this.router.get('/users', this.userController.index);
    this.router.get('/users/:id', this.userController.show);
    this.router.delete('/users/:id', this.userController.destroy);
    this.router.post('/auth/signin/', this.userController.signInLocal);
		this.router.post('/auth/signup/', this.userController.signupLocal);
		/*
		 *	Event routes
		 */
		this.router.get('/events', this.eventController.index);
		this.router.get('/events/create', this.eventController.create);
		this.router.get('/events/:id', this.eventController.show);
		this.router.post('/events', this.eventController.store);
		this.router.get('/events/:id/edit', this.eventController.edit);
		this.router.put('/events/:id/update', this.eventController.update);
		this.router.delete('/events/:id/destroy', this.eventController.destroy);

		/*
		 *	Venue routes
		 */
		this.router.get('/venues', this.venueController.index);
		this.router.get('/venues/create', this.venueController.create);
		this.router.get('/venues/:id', this.venueController.show);
		this.router.post('/venues', this.venueController.store);
    this.router.get('/venues/:id/edit', this.venueController.edit);
    this.router.put('/venues/:id/update', this.venueController.update);
		this.router.delete('/venues/:id/destroy', this.venueController.destroy);
		
		/*
		 * Category Routes
		 */

		this.router.get('/categories', this.categoryController.index);
		this.router.get('/categories/create', this.categoryController.create);
		this.router.get('/categories/:id', this.categoryController.show);
		this.router.post('/categories', this.categoryController.store);
    this.router.get('/categories/:id/edit', this.categoryController.edit);
    this.router.put('/categories/:id/update', this.categoryController.update);
		this.router.delete('/categories/:id/destroy', this.categoryController.destroy);


  }
}

export default ApiRouter;