import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { CrudServiceImpl } from '../../services/crud-service/crud.service.impl';

export const EditResolver: ResolveFn<any> = (route): Observable<any> => {
  const router = inject(Router);
  const crud = inject(CrudServiceImpl);

  const id = route.params['id'];

  return crud.get(id).pipe(catchError(() => router.navigateByUrl('../')));
};
