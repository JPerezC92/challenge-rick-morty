import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { CharactersPreviewPagesLoadEvent } from 'src/modules/characters/events/CharactersTotalPagesLoad.event';
import { CharactersQueryKeys } from 'src/modules/characters/models/CharactersQueryKeys';
import { CharactersLSKeys } from 'src/modules/characters/service/CharactersLSKeys';
import { LoadingState } from 'src/modules/shared/models/LoadingState';
import { Pagination } from 'src/modules/shared/models/Pagination';
import { LocalStorageService } from 'src/modules/shared/service/LocalStorageSservice';
import { isClient } from 'src/modules/shared/utils/applicationSide';
import { ReturnTypesOfFunctionProps } from 'src/modules/shared/utils/ReturnTypesOfFunctionProps';

export interface PaginationStore {
  nextPage(): void;
  previousPage(): void;
}

enum PaginationActionType {
  NEXT = 'NEXT',
  PREVIOUS = 'PREVIOUS',
  CHANGE_PAGE = 'CHANGE_PAGE',
  LOAD_PAGE_LOCAL_STORAGE = 'LOAD_PAGE_LOCAL_STORAGE',
  PAGE_STORAGED_NOT_FOUND = 'PAGE_STORAGED_NOT_FOUND',
  LOAD_TOTAL_PAGES = 'LOAD_TOTAL_PAGES',
}

const paginationActions = {
  nextPage: () => ({ type: PaginationActionType.NEXT } as const),
  changePage: (page: number) =>
    ({ type: PaginationActionType.CHANGE_PAGE, payload: page } as const),
  previousPage: () => ({ type: PaginationActionType.PREVIOUS } as const),
  pageStoragedNotFound: () =>
    ({ type: PaginationActionType.PAGE_STORAGED_NOT_FOUND } as const),
  loadPageStoraged: (page: number) =>
    ({
      type: PaginationActionType.LOAD_PAGE_LOCAL_STORAGE,
      payload: page,
    } as const),
  loadPages: (pages: number) =>
    ({ type: PaginationActionType.LOAD_TOTAL_PAGES, payload: pages } as const),
};

export interface PaginationState {
  currentPage: Pagination;
  nextPage?: Pagination;
  previousPage?: Pagination;
  loading: LoadingState;
}

export type PaginationAction = ReturnTypesOfFunctionProps<
  typeof paginationActions
>;

const initialState: PaginationState = {
  currentPage: Pagination.init(),
  loading: LoadingState.IDLE,
};

const paginationReducer = (
  state: PaginationState,
  action: PaginationAction
): PaginationState => {
  if (action.type === PaginationActionType.LOAD_PAGE_LOCAL_STORAGE) {
    const currentPage = new Pagination(action.payload, action.payload);

    return {
      ...state,
      currentPage: currentPage,
      previousPage: currentPage.previous(),
      loading: LoadingState.SUCCESS,
    };
  }

  if (action.type === PaginationActionType.PAGE_STORAGED_NOT_FOUND) {
    const currentPage = Pagination.init();

    return {
      ...state,
      currentPage: currentPage,
      previousPage: currentPage.previous(),
      loading: LoadingState.SUCCESS,
    };
  }

  if (action.type === PaginationActionType.LOAD_TOTAL_PAGES) {
    const currentPage = new Pagination(state.currentPage.value, action.payload);

    return {
      ...state,
      currentPage,
      nextPage: currentPage.next(),
      previousPage: currentPage.previous(),
    };
  }

  if (action.type === PaginationActionType.CHANGE_PAGE) {
    const currentPage = new Pagination(action.payload, state.currentPage.total);

    return {
      ...state,
      currentPage,
      nextPage: currentPage.next(),
      previousPage: currentPage.previous(),
    };
  }

  if (action.type === PaginationActionType.NEXT) {
    const currentPage = state.nextPage
      ? new Pagination(state.nextPage.value, state.currentPage.total)
      : new Pagination(state.currentPage.value, state.currentPage.total);
    const nextPage = currentPage.next();
    const previousPage = currentPage.previous();

    return { ...state, currentPage, nextPage, previousPage };
  }

  if (action.type === PaginationActionType.PREVIOUS) {
    const currentPage = state.previousPage
      ? new Pagination(state.previousPage.value, state.currentPage.total)
      : new Pagination(state.currentPage.value, state.currentPage.total);
    const nextPage = currentPage.next();
    const previousPage = currentPage.previous();

    return { ...state, currentPage, previousPage, nextPage };
  }

  return { ...state };
};

export function useCharactersPreviewPagination() {
  const [paginationState, paginationDispatch] = React.useReducer(
    paginationReducer,
    initialState
  );

  useQuery(
    CharactersQueryKeys.charactersPreviewPagination(),
    () => {
      const pageString = LocalStorageService.getItem(
        CharactersLSKeys.PREVIEW_PAGINATION
      );

      const currentPage = Number(pageString);

      if (!currentPage || isNaN(currentPage))
        return paginationDispatch(paginationActions.pageStoragedNotFound());

      paginationDispatch(paginationActions.loadPageStoraged(currentPage));
    },
    {
      enabled: isClient(),
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const paginationStore = {
    changePage: (page: number | string) => {
      const currentPage = Number(page);
      if (!currentPage || isNaN(currentPage)) return;
      paginationDispatch(paginationActions.changePage(currentPage));
      LocalStorageService.setItem(
        CharactersLSKeys.PREVIEW_PAGINATION,
        page.toString()
      );
    },
    previousPage: () => {
      paginationDispatch(paginationActions.previousPage());
      LocalStorageService.setItem(
        CharactersLSKeys.PREVIEW_PAGINATION,
        paginationState.previousPage?.value.toString() || ''
      );
    },
    nextPage: () => {
      paginationDispatch(paginationActions.nextPage());
      LocalStorageService.setItem(
        CharactersLSKeys.PREVIEW_PAGINATION,
        paginationState.nextPage?.value.toString() || ''
      );
    },
  };

  React.useEffect(() => {
    const cleanup = CharactersPreviewPagesLoadEvent.listener((pages) => {
      paginationDispatch(paginationActions.loadPages(pages));
    });

    return () => {
      cleanup();
    };
  }, []);

  return {
    isLoading: paginationState.loading !== LoadingState.SUCCESS,
    pages: paginationState.currentPage.total,
    currentPage: paginationState.currentPage.value,
    previousPage: paginationState.previousPage?.value,
    nextPage: paginationState.nextPage?.value,
    paginationStore: paginationStore,
  };
}
