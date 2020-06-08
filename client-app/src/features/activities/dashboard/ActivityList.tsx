import React, { SyntheticEvent } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void; 
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, activityId: string) => void;
    submiting: boolean;
    target: string;
}

const ActivityList: React.FC<IProps> = ({activities, selectActivity, deleteActivity, submiting, target}) => {
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
                            <Button name={actvity.id} loading={target === actvity.id && submiting}
                             onClick={(e) => deleteActivity(e, actvity.id)} floated='right' content='Delete' color='red'/>
                            <Label basic content={actvity.category}/>
                        </Item.Extra>
                    </Item.Content>
                    </Item>
                ))}
                
            </Item.Group>
        </Segment>
    )
}

export default observer(ActivityList);