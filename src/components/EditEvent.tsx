import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material"
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EventContext } from "../lib/Context";
import { ActionTypes, IEvent } from "../lib/types";
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Inputs {
    title: string
    date: string
    time: string
    cover: string
    type: string
    composer: string
}

interface EditEventProps {
    eventProps: IEvent;
}

export const EditEvent = ({ eventProps }: EditEventProps) => {

    const context = useContext(EventContext)
    if (!context) {
        throw new Error('')
    }

    const { state, dispatch } = context

    const [open, setOpen] = useState<boolean>(false)
    const { register, handleSubmit } = useForm<Inputs>()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleEdit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        setError(null);

        const updatedEvent = { ...eventProps, ...data };

        try {
            const response = await axios.put(`http://localhost:3004/events/${eventProps.id}`, updatedEvent);
            dispatch({ type: ActionTypes.updateEvent, payload: response.data });
            setOpen(false);
        } catch (err) {
            setError('Error updating event. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return <Box my={2}>
        <Button onClick={() => setOpen(true)}
            variant="contained">Edit</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style}>
                <form onSubmit={handleSubmit(handleEdit)}>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="title"
                            {...register('title')}
                            defaultValue={eventProps.title}
                        />
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="date"
                            {...register("date")}
                            defaultValue={eventProps.date}
                        />
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="time"
                            {...register("time")}
                            defaultValue={eventProps.time}
                        />
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            label="composer"
                            {...register("composer")}
                            defaultValue={eventProps.composer}
                        />
                    </Box>
                    <Box my={2}>
                        <Select sx={{ width: 200 }} {...register("type")} defaultValue={eventProps.type}>
                            <MenuItem value="opera">opera</MenuItem>
                            <MenuItem value="ballet">ballet</MenuItem>
                        </Select>
                    </Box>
                    <Box my={2}>
                        <TextField
                            variant="outlined"
                            {...register("cover")}
                            label="cover"
                            defaultValue={eventProps.cover}
                        />
                    </Box>
                    <Button type="submit" variant="outlined"> {loading ? 'Saving' : 'Submit'}
                        {error && <p>{error}</p>}
                    </Button>
                </form>
            </Box>
        </Modal>
    </Box>
}