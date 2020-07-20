import React, { useContext, Fragment } from 'react';
import { Item, Segment, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivtyStore from '../../../app/stores/activityStore';
import ActivityListItem from './ActivityListItem';

const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivtyStore);
    const {activitiesByDate} = activityStore;
    return (
        <Fragment>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label size='large' color='blue'>
                        {group}
                    </Label>
                    
                    <Item.Group divided>
                        {activities.map(actvity => (
                            <ActivityListItem key={actvity.id} activity={actvity} />
                        ))}
                    </Item.Group>
                    
                </Fragment>
            ))}
        </Fragment>
        
    );
}

export default observer(ActivityList);