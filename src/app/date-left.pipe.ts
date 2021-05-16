import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateLeft',
    pure: true
})
export class DateLeftPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            const seconds = Math.floor((+new Date(value) - +new Date()) / 1000);
            // less than 30 seconds ago will show as 'Just now'
            if (seconds < 29) {
                return '刚刚';
            }
            const intervals = {
                年: 31536000,
                个月: 2592000,
                周: 604800,
                天: 86400,
                小时: 3600,
                分钟: 60,
                秒: 1
            };
            let counter;
            for (const i in intervals) {
                if (intervals.hasOwnProperty(i)) {
                    counter = Math.floor(seconds / intervals[i]);
                    if (counter > 0) {
                        return '剩' + counter + ' ' + i; // singular (1 day ago)
                    }
                }
            }
        }
        return value;
    }

}

// https://medium.com/@thunderroid/angular-date-ago-pipe-minutes-hours-days-months-years-ago-c4b5efae5fe5
