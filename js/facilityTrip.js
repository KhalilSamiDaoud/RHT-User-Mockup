class FacilityTrip {
    constructor(tripObj, isArival) {
        this.isArival = isArival;
        this.driverNumber = (tripObj['Driver Number']) ? tripObj['Driver Number'] : 'N/A';
        this.vehicleNumber = (tripObj['Vehicle Number']) ? tripObj['Vehicle Number'] : 'N/A';
        this.confirmation = tripObj['Trip Number'];
        this.status = tripObj['Trip Status'];
        this.name = tripObj['Patients Name'];
        this.rowID = tripObj['Rowid'];
        this.eta = tripObj['ETA'];

        this.scheduledTime = new Date('01/01/1970 ' + tripObj['schedule Time']);

        let tempData = this.#getStatusTypeData();
        this.statusMsg = tempData.msg;
        this.statusIcon = tempData.icon;

        //placeholder data
        this.phoneNumber = '999-999-9999'
    }

    #getStatusTypeData() {
        switch (this.status) {
            case ("IRTPU"):
                return { msg: 'RIDER AWAITING VEHICLE', icon: 'directions_car' };
            case ("ACCEPTED"):
                return { msg: 'RIDER AWAITING VEHICLE', icon: 'directions_car' };
            case ("ATLOCATION"):
                return { msg: 'RIDER IS ABOUT TO ONBOARD', icon: 'directions_car' };
            case ("PICKEDUP"):
                return { msg: 'RIDER IS PICKED UP', icon: 'directions_car' };
            case ("NOSHOW"):
                return { msg: 'RIDER MARKED AS NO-SHOW', icon: 'wrong_location' };
            case ("DROPPED"):
                if (this.isArival)
                    return { msg: 'RIDER DROPPED AT FACILITY', icon: 'follow_the_signs' };
                else
                    return { msg: 'RIDER DROPPED AT DESTINATION', icon: 'follow_the_signs' };
            case ("CANCELLED"):
                return { msg: 'RIDE HAS BEEN CANCELLED', icon: 'wrong_location' };
            default:
                return { msg: 'NO RIDE HAS BEEN SCHEDULED', icon: 'pending_actions' };
        }
    }
}

export { FacilityTrip };