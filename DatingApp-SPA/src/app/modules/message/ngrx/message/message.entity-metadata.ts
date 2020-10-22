import { ContainerType } from '../../models/container.type';
import { DefaultDataServiceConfig, EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { Message } from '../../models/message';

function containerFilter(
   entities: Message[],
   pattern: {
      userId: number;
      containerType: ContainerType;
   }
): Message[] {
   switch (pattern.containerType) {
      case ContainerType.inbox:
         return entities.filter(item => item.recipientId === pattern.userId);
      case ContainerType.outbox:
         return entities.filter(item => item.senderId === pattern.userId);
      case ContainerType.unread:
         return entities.filter(item => item.readAt == null);
      default:
         return [];
   }
}

export const messageEntityMetadata: EntityMetadataMap = {
   Message: {
      filterFn: containerFilter,
   },
};

export const entityConfig: EntityDataModuleConfig = {};

const baseUrl = environment.apiUrl;

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
   root: baseUrl,
   //  timeout: 3000,
};
