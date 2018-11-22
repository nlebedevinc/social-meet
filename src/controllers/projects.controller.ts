import { Server, Request, ResponseToolkit, ResponseObject } from 'hapi';
import { AppState, LowService } from '../interfaces';
import { badImplementation } from 'boom';

export default class ProjectsController {
  protected _lowService: LowService;

  constructor(server: Server) {
    const app = server.app as AppState;
    this._lowService = app.services.low;
  }

  public async getProjects(request: Request, toolkit: ResponseToolkit): Promise<ResponseObject | Error> {
    try {
      console.log(request);
      const projects = await this._lowService.getProjects();
      return toolkit.response(projects);
    } catch (error) {
      return badImplementation(error.message, { error });
    }
  }

  public async getProject(request: Request, toolkit: ResponseToolkit): Promise<ResponseObject | Error> {
    try {
      const { id } = request.params;
      const project = await this._lowService.getProject(id);
      return toolkit.response(project);
    } catch (error) {
      return badImplementation(error.message, { error });
    }
  }
}
