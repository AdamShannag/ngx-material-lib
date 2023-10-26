import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { CrudServiceImpl } from '../../services/crud-service/crud.service.impl';
import { CrudListResource } from '../../models/CrudListResource';

export const CrudResolver: ResolveFn<
  CrudListResource
> = (): Observable<any> => {
  const router = inject(Router);
  const crud = inject(CrudServiceImpl);

  return crud
    .list({ first: 0, sortOrder: 1, rows: 10 })
    .pipe(catchError(() => router.navigateByUrl('/error')));
};
