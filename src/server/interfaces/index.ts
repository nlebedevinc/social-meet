import { ApplicationState, Server } from 'hapi';

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

// declare low service functionality here
export interface LowService {}

export interface PluginOptions {}
export interface PluginInfo {
    name: string;
    version: string;
}

export interface Plugin {
    register(server: Server): Promise<any>;
    info(): PluginInfo;
}
