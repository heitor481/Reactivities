import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ActivtyStore from '../../../app/stores/activityStore';
import { IActivity } from '../../../app/models/activity';

const ActivityListItem:React.FC<{activity: IActivity}> = ({activity}) => {
  
    const activityStore = useContext(ActivtyStore);
    const {} = activityStore;
    
    return (        
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='../../../../public/assests/user.png'/>
                            <Item.Content>
                                <Item.Header as='a'>{activity.title}</Item.Header>
                                <Item.Description>
                                    Hosted By Heitor
                                </Item.Description>
                            </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock'/> {activity.date}
                <Icon name='marker'/> {activity.city}
            </Segment>
            <Segment secondary>
                Attedees will go here
            </Segment>
            <Segment clearing>
                <span>
                    {activity.description}
                    <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='blue'/>
                </span>
            </Segment>
        </Segment.Group>
    )

}

export default observer(ActivityListItem);