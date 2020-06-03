import React, {useState, useEffect, Fragment, SyntheticEvent} from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectActivity, setSelectActivity] = useState<IActivity | null>();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submiting, setSubmiting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) => {
    setSelectActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setSubmiting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectActivity(activity);
      setEditMode(false);
    }).then(() => setSubmiting(false));
    
  }

  const handleEditActivity = (activity: IActivity) => {
    setSubmiting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id != activity.id), activity]);
      setSelectActivity(activity);
      setEditMode(false);
    }).then(() => setSubmiting(false));
    
  }

  const handleDelete = (event: SyntheticEvent<HTMLButtonElement>, activityId: string) => {
    setSubmiting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(activityId).then(() => {
      setActivities([...activities.filter(a => a.id != activityId)]);
    }).then(() => setSubmiting(false));
  }

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: IActivity[] = [];
        response.forEach(activiy => {
          activiy.date = activiy.date.split('.')[0];
          activities.push(activiy);
        })
       setActivities(activities);
     }).then(() => setLoading(false));
  }, []);

  if(loading) return <LoadingComponent content="Loading activities..."/>

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
          deleteActivity={handleDelete}
          submiting={submiting}
          target={target}/>
        </Container>
      </Fragment>
    );
}

export default App;
