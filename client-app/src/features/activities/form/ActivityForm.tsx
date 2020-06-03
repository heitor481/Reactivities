import React, {useState, FormEvent} from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import {v4 as uuid} from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity | null;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    submiting: boolean;
}

const ActivityForm: React.FC<IProps> = ({setEditMode, activity: initializeFormActivity, createActivity, editActivity, submiting}) => {

    const initializeForm = () => {
        if(initializeFormActivity) {
            return initializeFormActivity
        } else {
            return {
                id: '',
                title: '',
                category: '',
                date: '',
                city: '',
                venue: '',
                description: ''
            }
        }
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm!);

    const handleSubmit = () => {

        if(activity.id.length == 0) {
            let newActtivity = {
                ...activity,
                id: uuid()
            } 
            createActivity(newActtivity);
        } else {
            editActivity(activity);
        }
    }

    const handleInput = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget
        setActivity({...activity, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInput} name='title' placeholder='Title' value={activity.title}></Form.Input>
                <Form.TextArea onChange={handleInput} name='description' rows={2} placeholder='Description' value={activity.description}/>
                <Form.Input onChange={handleInput} name='category' placeholder='Category' value={activity.category}></Form.Input>
                <Form.Input onChange={handleInput} name='date' type='datetime-local' placeholder='Date' value={activity.date}></Form.Input>
                <Form.Input onChange={handleInput} name='city' placeholder='City' value={activity.city}></Form.Input>
                <Form.Input onChange={handleInput} name='venue' placeholder='Venue' value={activity.venue}></Form.Input>
                <Button floated='right' loading={submiting} positive type='submit' content='Submit' />
                <Button onClick={() => setEditMode(false)} floated='right' negative type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}

export default ActivityForm;