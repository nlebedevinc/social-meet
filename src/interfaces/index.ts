import { ApplicationState } from 'hapi';

export interface AppState extends ApplicationState {
  git: {
    url: string;
  };
  version: string;
  name: string;
  services: AppServices;
}

export interface AppServices {
  low: LowService;
}

export interface LowService {
  getProjects: () => any[];
  getProject: (id: string) => any;
}
