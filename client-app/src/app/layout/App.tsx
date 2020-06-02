import React, {useState, useEffect, Fragment} from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectActivity, setSelectActivity] = useState<IActivity | null>();
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id != activity.id), activity]);
    setSelectActivity(activity);
    setEditMode(false);
  }

  const handleDelete = (activityId: string) => {
    setActivities([...activities.filter(a => a.id != activityId)]);
  }

  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then((response) => {
      let activities: IActivity[] = [];
        response.data.forEach(activiy => {
          activiy.date = activiy.date.split('.')[0];
          activities.push(activiy);
        })
       setActivities(activities);
     });
  }, []);

    return (
      <Fragment>
        <NavBar openCreateForm={handleOpenCreateForm} />
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard activities={activities} 
          selectActivity={handleSelectActivity} 
          selectedActivity={selectActivity!}
          setSelectedActivity={setSelectActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDelete}/>
        </Container>
      </Fragment>
    );
}

export default App;
