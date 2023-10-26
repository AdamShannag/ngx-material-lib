/*
 * Public API Surface of prime-x
 */

// Modules
export * from './lib/prime-x.module';

// Components
export * from './lib/components/column-filter/column-filter.component';
export * from './lib/components/dialog/dialog.component';
export * from './lib/components/crud-page/crud.page';
export * from './lib/components/crud-page/abstract.crud.page';
export * from './lib/components/crud-page/crud.page.impl';

// Services
export * from './lib/services/crud-service/crud.service.impl';
export * from './lib/services/crud-service/crud.service';
export * from './lib/services/crud-service/crud.provider';

// Resolvers
export * from './lib/resolvers/crud-resolver/crud.resolver';
export * from './lib/resolvers/edit-resolver/edit.resolver';

// Models
export * from './lib/models/CrudTableParams';
export * from './lib/models/TableHeader';
export * from './lib/models/CrudListResource';
export * from './lib/models/CrudResource';
export * from './lib/models/CrudResponse';
