import React, { useContext } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivtyStore from '../../../app/stores/activityStore';
import { Link } from 'react-router-dom';

const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivtyStore);
    const {activitiesByDate, deleteActivity, submiting, target} = activityStore;
    return (
        <Segment clearing>
            <Item.Group divided>
                {activitiesByDate.map(actvity => (
                    <Item key={actvity.id}>
                    <Item.Content>
                        <Item.Header as='a'>{actvity.title}</Item.Header>
                        <Item.Meta>{actvity.date}</Item.Meta>
                        <Item.Description>
                            <div>{actvity.description}</div>
                            <div>{actvity.city}, {actvity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button as={Link} to={`/activities/${actvity.id}`} floated='right' content='View' color='blue'/>
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