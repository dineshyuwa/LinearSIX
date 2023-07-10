Date.prototype.daysTo = function (otherDate) {
    const date1 = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    const date2 = new Date(otherDate.getFullYear(), otherDate.getMonth(), otherDate.getDate());

    // time difference in milliseconds between the two dates
    const timeDiff = date2.getTime() - date1.getTime();

    // Convert the time difference to days by dividing by the number of milliseconds in a day
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    return daysDiff;
};

const d1 = new Date('2023-07-01');
const d2 = new Date('2023-07-10');
console.log(d1.daysTo(d2));
