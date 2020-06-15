import {observable, action} from 'mobx';
import { createContext } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';


class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;
    @observable selectedActivity: IActivity | undefined;
    @observable editMode = false;
    @observable activityForm: IActivity | undefined;

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activiy => {
            activiy.date = activiy.date.split('.')[0];
            this.activities.push(activiy);
          });
          this.loadingInitial = false;
        } catch(error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }


    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
        this.editMode = false;
    }
}

export default createContext(new ActivityStore());