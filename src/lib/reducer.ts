import { ActionTypes, FilterTypes, IAction, IEvent, IState } from "./types";

export const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case ActionTypes.setEvents:
            return {
                ...state,
                events: action.payload as IEvent[]
            };
        case ActionTypes.setFilter:
            return {
                ...state,
                currentFilter: action.payload as FilterTypes
            }
        case ActionTypes.updateEvent:
            return {
                ...state,
                events: state.events.map(event => event.id === (action.payload as IEvent).id ? action.payload : event ) as IEvent[]
            }
        default:
            return state
    }
}