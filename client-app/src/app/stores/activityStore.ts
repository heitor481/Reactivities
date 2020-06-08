import {observable, action} from 'mobx';
import { createContext } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';


class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable loadingInitial = false;

    @action loadActivities = () => {
        this.loadingInitial = true;
        agent.Activities.list().then((activities) => {
            activities.forEach(activiy => {
                activiy.date = activiy.date.split('.')[0];
                this.activities.push(activiy);
              })
           }).finally(() => this.loadingInitial = false);
        };
}

export default createContext(new ActivityStore());