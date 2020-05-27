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
  }

  const handleOpenCreateForm = () => {
    setSelectActivity(null);
    setEditMode(true);
  }

  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then((response) => {
       setActivities(response.data)
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
          setEditMode={setEditMode}/>
        </Container>
      </Fragment>
    );
}

export default App;