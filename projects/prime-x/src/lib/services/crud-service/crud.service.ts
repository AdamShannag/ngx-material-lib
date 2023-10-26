import { Observable } from 'rxjs';
import { CrudListResource } from '../../models/CrudListResource';
import { CrudResource } from '../../models/CrudResource';
import { CrudTableParams } from '../../models/CrudTableParams';
import { CrudResponse } from '../../models/CrudResponse';

export interface CrudService {
  get(id: string): Observable<CrudResource>;
  list(params: Partial<CrudTableParams>): Observable<CrudListResource>;
  create(resource: Partial<CrudResource>): Observable<CrudResponse>;
  save(id: string, changes: Partial<CrudResource>): Observable<CrudResponse>;
  delete(ids: string[]): Observable<CrudResponse>;
}
