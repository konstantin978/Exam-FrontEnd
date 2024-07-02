import { useContext } from "react"
import { EventContext } from "../lib/Context"
import { EditEvent } from './EditEvent'

export const EventList: React.FC = () => {
    const context = useContext(EventContext)
    if (!context) {
        throw new Error('')
    }

    const { state } = context

    return <>
        <div className="list">
            {
                state.events.map(event => <div key={event.id}>
                    <img src={event.cover} />
                    <p>{event.title}</p>
                    <small>{event.type} By <strong>{event.composer}</strong></small>
                    <p>{event.date} At {event.time}</p>
                    <EditEvent eventProps={event}/>
                </div>)
            }
        </div>
    </>
}