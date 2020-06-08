import React, { Fragment, SyntheticEvent } from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { observer } from 'mobx-react-lite';

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void; 
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, activityId: string) => void;
    submiting: boolean;
    target: string;
}

const ActivityDashboard: React.FC<IProps> = ({activities, selectActivity, 
    selectedActivity, editMode, setEditMode, setSelectedActivity, createActivity, editActivity, deleteActivity, submiting, target}) => {
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={10}>
                    <ActivityList 
                    submiting={submiting} 
                    activities={activities} 
                    deleteActivity={deleteActivity} 
                    selectActivity={selectActivity}
                    target={target}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    {selectedActivity && !editMode && 
                    <ActivityDetails 
                    activity={selectedActivity} 
                    setEditMode={setEditMode} 
                    setSelectedActivity={setSelectedActivity}/>}
                    
                    {editMode && 
                    <ActivityForm key={selectedActivity && selectedActivity?.id || 0}
                    setEditMode={setEditMode} 
                    activity={selectedActivity}
                    createActivity={createActivity}
                    editActivity={editActivity}
                    submiting={submiting}/>}
                </Grid.Column>
            </Grid>
        </Fragment>
    )

}

export default observer(ActivityDashboard);