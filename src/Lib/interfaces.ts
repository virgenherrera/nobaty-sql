import { Router, Request, Response, NextFunction } from 'express';

export interface IHandler {
	readonly name: string;
	readonly path: string;
	router: Router;
}

export interface IRestHandler extends IHandler {
	readonly controller: any;
}

export interface IgetAllHandler extends IHandler {
	getAllHandler(req: Request, res: Response, next: NextFunction): Promise<Response>;
}

export interface IgetOneHandler extends IHandler {
	getOneHandler(req: Request, res: Response, next: NextFunction): Promise<Response>;
}

export interface IpostHandler extends IHandler {
	postHandler(req: Request, res: Response, next: NextFunction): Promise<Response>;
}

export interface IputHandler extends IHandler {
	putHandler(req: Request, res: Response, next: NextFunction): Promise<Response>;
}

export interface IdeleteHandler extends IHandler {
	deleteHandler(req: Request, res: Response, next: NextFunction): Promise<Response>;
}

export interface IRestFull extends
	IRestHandler,
	IgetAllHandler,
	IgetOneHandler,
	IpostHandler,
	IputHandler,
	IdeleteHandler { }


export interface IController {
	readonly repository: any;
}

export interface ICreateAction extends IController {
	createAction(p: any): Promise<any>;
}

export interface IListAction extends IController {
	listAction(p: any): Promise<any>;
}

export interface IShowAction extends IController {
	showAction(p: any): Promise<any>;
}

export interface IEditAction extends IController {
	editAction(p: any): Promise<any>;
}

export interface IDeleteAction extends IController {
	deleteAction(p: any): Promise<any>;
}

export interface ICrudController extends
	IController,
	ICreateAction,
	IListAction,
	IShowAction,
	IEditAction,
	IDeleteAction { }

export interface IGetById {
	GetById(p: any): Promise<any>;
}
export interface IFindOne {
	FindOne(p: any): Promise<any>;
}
export interface IFindBy {
	FindBy(p: any): Promise<any>;
}
export interface IGetAll {
	GetAll(p: any): Promise<any>;
}
export interface ICreate {
	Create(p: any): Promise<any>;
}
export interface IUpdate {
	Update(p: any): Promise<any>;
}
export interface IDelete {
	Delete(p: any): Promise<any>;
}


export interface IFullRepository extends
	IGetById,
	IFindOne,
	IFindBy,
	IGetAll,
	ICreate,
	IUpdate,
	IDelete { }

export interface IResDto {
	status: number;
	success: boolean;
	message: string;
	data?: any | any[];
	limit?: number;
	offset?: number;
	count?: number;
}
