import React, { Fragment, SyntheticEvent, useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, activityId: string) => void;
    submiting: boolean;
    target: string;
}

const ActivityDashboard: React.FC<IProps> = ({activities, selectActivity, setEditMode, setSelectedActivity, createActivity, editActivity, deleteActivity, submiting, target}) => {
    const activityStore = useContext(ActivityStore);
    const {editMode, selectedActivity} = activityStore;
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={10}>
                    <ActivityList 
                    submiting={submiting} 
                    activities={activities} 
                    deleteActivity={deleteActivity}
                    target={target}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    {selectedActivity && !editMode && 
                    <ActivityDetails  
                    setEditMode={setEditMode} 
                    setSelectedActivity={setSelectedActivity}/>}
                    
                    {editMode && 
                    <ActivityForm key={selectedActivity && selectedActivity?.id || 0}
                    setEditMode={setEditMode} 
                    activity={selectedActivity!}
                    createActivity={createActivity}
                    editActivity={editActivity}
                    submiting={submiting}/>}
                </Grid.Column>
            </Grid>
        </Fragment>
    )

}

export default observer(ActivityDashboard);