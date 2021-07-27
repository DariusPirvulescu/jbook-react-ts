import { ActionType } from '../action-types';
import { Cell, CellType } from '../cell'

export type MoveDirection = 'up' | 'down'
export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: MoveDirection;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellType;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStart {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string
  }
}

export interface BundleComplete {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string,
    bundle: {
      code: string;
      err: string;
    }
  }
}

export interface FetchCellsAction {
  type: ActionType.FETCH_CELLS
}

export interface FetchCellsCompleteAction {
  type: ActionType.FETCH_CELLS_COMPLETE
  payload: Cell[]
}

export interface FetchCellsErrorAction {
  type: ActionType.FETCH_CELLS_ERROR
  payload: string
}

export interface SaveCellsErrorsActions {
  type: ActionType.SAVE_CELLS_ERROR
  payload: string
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStart
  | BundleComplete
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | SaveCellsErrorsActions;