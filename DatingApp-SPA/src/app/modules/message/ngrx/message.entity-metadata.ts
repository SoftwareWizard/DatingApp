import { DefaultDataServiceConfig, EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';
import { environment } from 'src/environments/environment';

export const messageEntityMetadata: EntityMetadataMap = {
   Message: {},
};

export const entityConfig: EntityDataModuleConfig = {
};

const baseUrl = environment.apiUrl;

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
   root: baseUrl,
   timeout: 3000,
};
