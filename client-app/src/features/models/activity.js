export class Activity {
    constructor(init)
    {
        Object.assign(this, init)
    }
}

export class ActivityFormValues {
    id = undefined;
    title = '';
    category = '';
    description = '';
    date = null;
    city = '';
    venue = '';

    constructor(activity)
    {
        if(activity) {
            this.id = activity.id;
            this.title = activity.title;
            this.category = activity.category;
            this.description = activity.description;
            this.date = activity.date;
            this.venue = activity.venue;
            this.city = activity.city;
        }
    }
}