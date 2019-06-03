import { Action } from '@ngrx/store';

export enum MoviesActionType {
  GET_ENTITIES = 'GET_ENTITIES',
  GET_ENTITIES_SUCCESS = 'GET_ENTITIES_SUCCESS',
  GET_ENTITIES_FAILED = 'GET_ENTITIES_FAILED',
  GET_AUTOCOMPLETE_ENTITY = 'GET_AUTOCOMPLETE_ENTITY',
  GET_AUTOCOMPLETE_ENTITY_SUCCESS = 'GET_AUTOCOMPLETE_ENTITY_SUCCESS',
  GET_AUTOCOMPLETE_ENTITY_FAILED = 'GET_AUTOCOMPLETE_ENTITY_FAILED',
  UPDATE_ENTITY_BY_ID = 'UPDATE_ENTITY_BY_ID',
  UPDATE_ENTITY_BY_ID_SUCCESS = 'UPDATE_ENTITY_BY_ID_SUCCESS',
  UPDATE_ENTITY_BY_ID_FAILED = 'UPDATE_ENTITY_BY_ID_FAILED',
  PATCH_ENTITY_BY_ID = 'PATCH_ENTITY_BY_ID',
  CREATE_NEW_ENTITY = 'CREATE_NEW_ENTITY',
  CREATE_NEW_ENTITY_SUCCESS = 'CREATE_NEW_ENTITY_SUCCESS',
  CREATE_NEW_ENTITY_FAILED = 'CREATE_NEW_ENTITY_FAILED',
  DELETE_ENTITY_BY_ID = 'DELETE_ENTITY_BY_ID',
  DELETE_ENTITY_BY_ID_SUCCESS = 'DELETE_ENTITY_BY_ID_SUCCESS',
  DELETE_ENTITY_BY_ID_FAILED = 'DELETE_ENTITY_BY_ID_FAILED',
}

export class GetEntities implements Action {
  readonly type = MoviesActionType.GET_ENTITIES;

  constructor(public title: string) {
  }
}

export class GetEntitiesSuccess implements Action {
  readonly type = MoviesActionType.GET_ENTITIES_SUCCESS;

  constructor(public payload: any) {
  }
}

export class GetEntitiesFailed implements Action {
  readonly type = MoviesActionType.GET_ENTITIES_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdateEntityById implements Action {
  readonly type = MoviesActionType.UPDATE_ENTITY_BY_ID;

  constructor(public id: string) {
  }
}

export class PatchEntityById implements Action {
  readonly type = MoviesActionType.PATCH_ENTITY_BY_ID;

  constructor(public id: string, public payload: any) {
  }
}

export class UpdateEntityByIdSuccess implements Action {
  readonly type = MoviesActionType.UPDATE_ENTITY_BY_ID_SUCCESS;

  constructor(public payload: any) {
  }
}

export class UpdateEntityByIdFailed implements Action {
  readonly type = MoviesActionType.UPDATE_ENTITY_BY_ID_FAILED;

  constructor(public payload: string) {
  }
}

export class CreateNewEntity implements Action {
  readonly type = MoviesActionType.CREATE_NEW_ENTITY;

  constructor(public payload: any) {
  }
}

export class CreateNewEntitySuccess implements Action {
  readonly type = MoviesActionType.CREATE_NEW_ENTITY_SUCCESS;

  constructor(public payload: any) {
  }
}

export class CreateNewEntityFailed implements Action {
  readonly type = MoviesActionType.CREATE_NEW_ENTITY_FAILED;

  constructor(public payload: any) {
  }
}

export class DeleteEntityById implements Action {
  readonly type = MoviesActionType.DELETE_ENTITY_BY_ID;

  constructor(public id: string) {
  }
}

export class DeleteEntityByIdSuccess implements Action {
  readonly type = MoviesActionType.DELETE_ENTITY_BY_ID_SUCCESS;

  constructor(public id: any) {
  }
}

export class DeleteEntityByIdFailed implements Action {
  readonly type = MoviesActionType.DELETE_ENTITY_BY_ID_FAILED;

  constructor(public payload: string) {
  }
}

export class GetAutocompleteEntity implements Action {
  readonly type = MoviesActionType.GET_AUTOCOMPLETE_ENTITY;

  constructor(public id: string) {
  }
}

export class GetAutocompleteEntitySuccess implements Action {
  readonly type = MoviesActionType.GET_AUTOCOMPLETE_ENTITY_SUCCESS;

  constructor(public payload: any) {
  }
}

export class GetAutocompleteEntityFailed implements Action {
  readonly type = MoviesActionType.GET_AUTOCOMPLETE_ENTITY_FAILED;

  constructor(public payload: string) {
  }
}

export type Action =
  GetEntities |
  GetEntitiesSuccess |
  GetEntitiesFailed |
  UpdateEntityById |
  PatchEntityById |
  UpdateEntityByIdSuccess |
  UpdateEntityByIdFailed |
  CreateNewEntity |
  CreateNewEntitySuccess |
  CreateNewEntityFailed |
  DeleteEntityById |
  DeleteEntityByIdSuccess |
  DeleteEntityByIdFailed |
  GetAutocompleteEntity |
  GetAutocompleteEntitySuccess |
  GetAutocompleteEntityFailed;
