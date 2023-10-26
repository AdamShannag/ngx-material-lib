import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Observable, catchError, shareReplay, throwError } from 'rxjs';
import { CrudTableParams } from '../../models/CrudTableParams';
import { CrudService } from './crud.service';
import { CrudListResource } from '../../models/CrudListResource';
import { CrudResponse } from '../../models/CrudResponse';
import { CrudResource } from '../../models/CrudResource';

export class CrudServiceImpl implements CrudService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private url: string
  ) {}

  get(id: string): Observable<CrudResource> {
    return this.http.get<CrudResource>(`${this.url}/${id}`).pipe(
      catchError((err) =>
        this.throwError(err, 'error', 'Error', 'Failed to load resources')
      ),
      shareReplay()
    );
  }

  list(params: Partial<CrudTableParams>): Observable<CrudListResource> {
    return this.http.get<CrudListResource>(this.url, { params }).pipe(
      catchError((err) =>
        this.throwError(err, 'error', 'Error', 'Failed to load resources')
      ),
      shareReplay()
    );
  }

  create(resource: Partial<CrudListResource>): Observable<CrudResponse> {
    return this.http.post<CrudResponse>(this.url, resource).pipe(
      catchError((err) =>
        this.throwError(err, 'error', 'Error', 'Failed to create resource')
      ),
      shareReplay()
    );
  }

  save(
    id: string,
    changes: Partial<CrudListResource>
  ): Observable<CrudResponse> {
    return this.http.put<CrudResponse>(`${this.url}/${id}`, changes).pipe(
      catchError((err) =>
        this.throwError(err, 'error', 'Error', 'Failed to save changes')
      ),
      shareReplay()
    );
  }

  delete(ids: string[]): Observable<any> {
    return this.http.delete<Response>(this.url, { body: ids }).pipe(
      catchError((err) =>
        this.throwError(err, 'error', 'Error', 'Failed to delete item/s')
      ),
      shareReplay()
    );
  }

  private throwError(
    err: any,
    severity: string,
    summary: string,
    detail: string
  ) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 2000,
    });
    return throwError(() => err);
  }
}
