import { HttpClient } from '@angular/common/http';
import { CrudServiceImpl } from './crud.service.impl';
import { MessageService } from 'primeng/api';

export class CrudServiceProvider {
  getProvider(routeDir: string) {
    return {
      provide: CrudServiceImpl,
      deps: [HttpClient, MessageService],
      useFactory: (http: HttpClient, messageService: MessageService) =>
        new CrudServiceImpl(http, messageService, routeDir),
    };
  }
}
