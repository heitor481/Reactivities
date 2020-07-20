import {observable, action, computed, configure, runInAction} from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class ActivityStore {
    @observable activityRegistry = new Map();
    @observable loadingInitial = false;
    @observable activity: IActivity | null = null;
    @observable activityForm: IActivity | undefined;
    @observable submiting = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
    }

    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );

        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date.split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity]; 
            return activities;   
        }, {} as {[key: string]: IActivity[]})); 
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction('loading activities', () => {  
            activities.forEach(activiy => {
                activiy.date = activiy.date.split('.')[0];
                this.activityRegistry.set(activiy.id, activiy);
              });
              this.loadingInitial = false;  
            });
        } catch(error) {
            runInAction('load activities error',() => {
                this.loadingInitial = false;
            });
            console.log(error);
        }
    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if(activity != null) {
            this.activity = activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction('getting activity', () => {
                    this.activity = activity;
                    this.loadingInitial = false;
                });
            } catch (error) {
                runInAction('getting activity error', () => {
                    this.loadingInitial = false;
                });
                console.log(error);
            }
        }
    }

    @action cleanActivity = () => {
        this.activity = null;
    }

    getActivity = (id: string) => {
       return this.activityRegistry.get(id);
    }

    @action createActivity = async (activity: IActivity) => {
        this.submiting = true;
        try {
            await agent.Activities.create(activity);
            runInAction('create activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.submiting = false;
            });
        } catch (error) {
            runInAction('create activity error', () => {
                this.submiting = false;
            });
            console.log(error);
        }
    }

    @action editActivity = async (activity: IActivity) => {
        this.submiting = true;
        try {
            await agent.Activities.update(activity);
            runInAction('edit activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.submiting = false;
            });
        } catch(error) {
            runInAction('edit activity error', () => {
                this.submiting = false;
            })
            
            console.log(error);
        }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submiting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction('delete activity', () => {
                this.activityRegistry.delete(id);
                this.submiting = false;
                this.target = '';
            });
        } catch(error) {
            runInAction('delete activity error', () => {
                this.submiting = false;
                this.target = '';    
            });
            console.log(error);
        }
    }
}

export default createContext(new ActivityStore());