import React from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface IProps {
    activities: IActivity[]
    selectActivity: (id: string) => void; 
    deleteActivity: (activityId: string) => void;
}

const ActivityList: React.FC<IProps> = ({activities, selectActivity, deleteActivity}) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map(actvity => (
                    <Item key={actvity.id}>
                    <Item.Content>
                        <Item.Header as='a'>{actvity.title}</Item.Header>
                        <Item.Meta>{actvity.date}</Item.Meta>
                        <Item.Description>
                            <div>{actvity.description}</div>
                            <div>{actvity.city}, {actvity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button onClick={() => selectActivity(actvity.id)} floated='right' content='View' color='blue'/>
                            <Button onClick={() => deleteActivity(actvity.id)} floated='right' content='Delete' color='red'/>
                            <Label basic content={actvity.category}/>
                        </Item.Extra>
                    </Item.Content>
                    </Item>
                ))}
                
            </Item.Group>
        </Segment>
    )
}

export default ActivityList;